import React from "react";

const Song = (props) => {
  const { title, artist, genre, rating, id } = props.song;
  return (
    <li>
      <span>{title}</span>
      <span>{artist}</span>
      <span>{genre}</span>
      <span>{rating}</span>
      <button name={id} onClick={props.handleDeleteButtonClick}>
        Delete
      </button>
    </li>
  );
};

export default Song;
