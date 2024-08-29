import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigation } from 'react-router-dom'; // For navigation
// import './styles.css'; 

const News = () => {
  const [files, setFiles] = useState([]);
  const history = useNavigation(); // Hook for navigation

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/image/upload/file');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleNavigation = (id) => {
    history.push(`/file/${id}`); // Navigate to detailed page
  };

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {files.map((file) => (
          <div key={file.id} style={{ margin: '10px', cursor: 'pointer' }}>
            <strong>{truncateText(file.describe, 100)}</strong>
            <p>{truncateText(file.content, 150)}</p>
            <a 
              href="#" 
              className="read-more-link" 
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                handleNavigation(file.id); // Navigate to detailed page
              }}
            >
              Read More
            </a>
            <img 
              src={file.filename} 
              alt={file.filename} 
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
              onClick={() => handleNavigation(file.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
