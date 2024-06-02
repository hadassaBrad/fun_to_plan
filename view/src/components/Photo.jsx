import React, { useState } from 'react';

const Photo = ({ photoId, savePhoto }) => {
  const [newPhoto, setNewPhoto] = useState({
    "id": photoId,
    "title": "",
    "url": "",
  });


  return (
    <div  >
 <label>Title:</label><br />
      <input
        id="title"
        type="text"
        placeholder="Title"
        name="title"
        value={newPhoto.title}
        required
      /><br />

      <label>URL:</label><br />
      <input
        id="url"
        type="text"
        placeholder="URL"
        onChange={changeHandler}
        name="url"
        value={newPhoto.url}
        required
      /><br />


    
    </div>
  );
};

export default SinglePhoto;