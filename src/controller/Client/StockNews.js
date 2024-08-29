import React, { useEffect, useState } from 'react';
import './ImageList.css'; // Import your CSS file

function StockNews() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/image/upload/file');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Latest News</h1>
      </div>
      <div className="card-container">
        {images.map((image) => (
          <div className="card" key={image.id}>
            <img 
              src={`http://localhost:8080/image/upload/file/${image.filename}`} 
              alt={image.describe} 
              className="card-image" 
            />
            <div className="card-content">
              <h3>{image.filename}</h3>
              <p>{image.describe}</p>
              <p>{new Date(image.postTime).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockNews;
