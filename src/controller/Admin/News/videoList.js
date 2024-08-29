import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ImageList.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function VideoList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/video/upload/video');
        const data = await response.json();
        setImages(data.items.map(image => ({ ...image, showFullDescription: false }))); // Initialize showFullDescription to false
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit image with id:', id);
    // Redirect or open edit form here
  };

  const handleDelete = async(id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please log in.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/video/upload/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`File with ID ${id} deleted successfully.`);
      setImages(images.filter(image => image.id !== id)); // Remove the deleted image from the state
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    
  };

  const toggleDescription = (index) => {
    setImages(images.map((image, i) =>
      i === index ? { ...image, showFullDescription: !image.showFullDescription } : image
    ));
  };

  return (
    <div className="container" style={{ fontSize: "15px" }}>
      <main className="main-content">
        <div className="header">
          <button className="btn-primary">
            <Link to='/uploadVideo' style={{ color: 'white' }}>Add video</Link>
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Filename</th>
                <th>Description</th>
                <th>Content</th>
                <th>Post Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image, index) => (
                <tr key={image.id}>
                  <td>{image.id}</td>
                  <td>{image.filename}</td>
                  <td>
                      {image.showFullDescription
                        ? image.description
                        : image.description.length > 100
                          ? `${image.description.substring(0, 100)}...`
                          : image.description}
                      {image.description.length > 100 && (
                        <span
                          onClick={() => toggleDescription(index)}  // Pass the index here
                          style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }}
                        >
                          {image.showFullDescription ? 'Read less' : 'Read more'}
                        </span>
                      )}
                    </td>
                    <td>{image.content}</td>
                  <td>{new Date(image.postTime).toLocaleString()}</td>
                  <td>
                    <span
                      className="action-icon"
                      onClick={() => handleEdit(image.id)}
                      title="Edit"
                      style={{marginRight:"20px", cursor:"pointer"}}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                    <span
                      className="action-icon"
                      onClick={() => handleDelete(image.id)}
                      title="Delete"
                      style={{ cursor:"pointer"}}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default VideoList;
