import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockNews = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the media files from the backend
  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/upload/files', {
          params: { page: 1, limit: 10 }, // Fetch the first 10 files
        });
        setMediaFiles(response.data.files); // Set the fetched files
        setLoading(false);  // Stop loading
      } catch (error) {
        console.error('Error fetching media files:', error);
        setLoading(false);  // Stop loading on error
      }
    };

    fetchMediaFiles();
  }, []);

  if (loading) {
    return <p>Loading media files...</p>;
  }

  return (
    <div>
      {mediaFiles.length > 0 ? (
        <div>
          {mediaFiles.map((file) => (
            <div key={file.filename}>
              {/* If the file is an image, render an <img> tag */}
              {file.type === 'image' ? (
                <div>
                  <img
                    src={`http://localhost:8080/uploads/${file.filename}`} // Use the mediaUrl
                    alt={file.description}
                    style={{ width: '300px', height: 'auto' }}
                  />
                  <p>{file.description}</p>
                  <p>{file.content}</p>
                  <p>{file.postTime}</p>
                </div>
              ) : (
                // If the file is a video, render a <video> tag
                <div>
                  <video controls style={{ width: '400px', height: 'auto' }}>
                    <source
                      src={`http://localhost:8080/uploads/${file.filename}`} // Use the mediaUrl
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <p>{file.description}</p>
                  <p>{file.content}</p>
                  <p>{file.postTime}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No media files found</p>
      )}
    </div>
  );
};

export default StockNews;
