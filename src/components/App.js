import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddSongForm from "./AddSongForm";
import SongList from "./SongList";

function App() {
  const [songs, setSongs] = useState([]);
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

    setSongs((prevSongsState) => {
      let lastId;
      if (prevSongsState.length) {
        const lastIndex = prevSongsState.length - 1;
        lastId = prevSongsState[lastIndex].id;
      }
      return [
        ...prevSongsState,
        {
          id: lastId + 1 || 1,
          title: newSong.title,
          artist: newSong.artist,
          genre: newSong.genre,
          rating: newSong.rating,
        },
      ];
    });
    setNewSong({
      title: "",
      artist: "",
      genre: "",
      rating: "",
    });
  };
  const handleDeleteButtonClick = (event) => {
    const id = Number(event.target.name);

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
