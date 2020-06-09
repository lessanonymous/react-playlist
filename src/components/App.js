import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddSongForm from "./AddSongForm";
import SongList from "./SongList";

function App() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetch("https://playlist-dca21.firebaseio.com/songs.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const songs = Object.entries(data).map((song) => {
            return {
              ...song[1],
              id: song[0],
            };
          });
          setSongs(songs);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    genre: "",
    rating: "",
  });
  const handleNewSongChange = (event) => {
    const { name, value } = event.target;
    setNewSong((prevNewSongState) => {
      return {
        ...prevNewSongState,
        [name]: value,
      };
    });
  };
  const handleNewSongSubmit = (event) => {
    event.preventDefault();
    const emptyValues = Object.values(newSong).some((value) => !value);
    if (emptyValues) return;

    fetch("https://playlist-dca21.firebaseio.com/songs.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then((data) => {
        const newId = data.name;
        setSongs((prevSongsState) => {
          return [
            ...prevSongsState,
            {
              id: newId,
              title: newSong.title,
              artist: newSong.artist,
              genre: newSong.genre,
              rating: newSong.rating,
            },
          ];
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNewSong({
      title: "",
      artist: "",
      genre: "",
      rating: "",
    });
  };
  const handleDeleteButtonClick = (event) => {
    const id = event.target.name;

    fetch(`https://playlist-dca21.firebaseio.com/songs/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });

    setSongs((prevSongsState) => {
      const newSongsState = [...prevSongsState];
      return newSongsState.filter((song) => song.id !== id);
    });
  };
  return (
    <div className="App">
      <Header />
      <AddSongForm
        handleNewSongChange={handleNewSongChange}
        handleNewSongSubmit={handleNewSongSubmit}
        newSong={newSong}
      />
      <SongList
        handleDeleteButtonClick={handleDeleteButtonClick}
        songs={songs}
      />
    </div>
  );
}

export default App;
