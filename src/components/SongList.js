import React from "react";
import Song from "./Song";

const SongList = (props) => {
  const songElements = props.songs.map((song) => {
    return (
      <Song
        handleDeleteButtonClick={props.handleDeleteButtonClick}
        key={song.id}
        song={song}
      />
    );
  });
  return (
    <ul>
      <li>
        <span>Title</span>
        <span>Artist</span>
        <span>Genre</span>
        <span>Rating</span>
      </li>
      {songElements}
    </ul>
  );
};

export default SongList;
