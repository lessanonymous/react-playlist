import React from "react";

const AddSongForm = (props) => {
  const { title, artist, genre, rating } = props.newSong;
  return (
    <form name="addSong" onSubmit={props.handleNewSongSubmit}>
      <input
        onChange={props.handleNewSongChange}
        name="title"
        value={title}
        placeholder="Title"
      />
      <input
        onChange={props.handleNewSongChange}
        name="artist"
        value={artist}
        placeholder="Artist"
      />
      <select onChange={props.handleNewSongChange} name="genre" value={genre}>
        <option value="">Choose a Genre</option>
        <option value="Pop">Pop</option>
        <option value="Jazz">Jazz</option>
        <option value="Soul">Soul</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Rock">Rock</option>
      </select>
      <select onChange={props.handleNewSongChange} name="rating" value={rating}>
        <option value="">Choose a Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button>Add</button>
    </form>
  );
};

export default AddSongForm;
