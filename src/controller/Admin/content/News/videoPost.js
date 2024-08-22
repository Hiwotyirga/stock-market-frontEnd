import axios from 'axios';
import React, { useState } from 'react';
import './file.css'; // Ensure this path is correct
import { Link } from 'react-router-dom';

function VideoPost() {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [list, setList] = useState(null);

  // Handler for file input change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handler for description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler for content input change
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image); // Ensure this matches your server-side form field
    formData.append('description', description);
    formData.append('content', content);

    try {
      const res = await axios.post('http://localhost:8080/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setList(res.data);
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    }
  };

  return (
   <div style={{display:"flex", flexDirection:"row"}} >
   
     <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Upload File</label>
        <input type="file" id="file" onChange={handleFileChange} />

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />

        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={handleContentChange}
        />

        <button type="submit">Submit</button>
      </form>

      {list && (
        <div className="results">
          <p>Image URL: {list.imageUrl}</p>
          <p>Description: {list.description}</p>
          <p>Content: {list.content}</p>
          <p>Post Time: {list.postTime}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
    <div>
      <button><Link to='/filelist'>File list</Link></button>
    </div>
   </div>
  );
}

export default VideoPost;
