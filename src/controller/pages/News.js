import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [files, setFiles] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/media/files');
        const sortedFiles = response.data.items.sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
        setFiles(sortedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleMediaClick = (filename, mimetype) => {
    setSelectedMedia({ filename, mimetype });
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    setSelectedMedia(null);
  };

  const toggleDescription = (index) => {
    setFiles(files.map((file, i) =>
      i === index ? { ...file, showFullDescription: !file.showFullDescription } : file
    ));
  };

  const truncateText = (text = '', length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f4f4f4', 
      minHeight: '100vh', 
      overflowY: 'auto', // Enable vertical scrolling
      maxHeight: 'calc(100vh - 40px)' // Adjust based on header/footer height
    }}>
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Latest News</h2>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        justifyContent: 'center' // Center the cards horizontally
      }}>
        {files.map((file, index) => (
          <div key={file.id} style={{ 
            width: '400px', 
            height: '400px', 
            margin: '15px', 
            color: '#666', 
            backgroundColor:"#666",
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative' // Ensure post time can be positioned absolutely
          }}>
            <div style={{ 
              backgroundColor: 'yellow', 
              padding: '10px', 
              fontSize: '18px', 
              color: '#333', 
              textAlign: 'center' 
            }}>
              {file.content || 'No title'}
            </div>
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              overflow: 'hidden' 
            }}>
              {file.mimetype.startsWith('image/') && (
                <img
                  src={`http://localhost:8080/media/${file.filename}`}
                  alt={file.filename || 'Placeholder'}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'cover' 
                  }}
                  onClick={() => handleMediaClick(file.filename, file.mimetype)}
                />
              )}
              {file.mimetype.startsWith('video/') && (
                <video
                  src={`http://localhost:8080/media/${file.filename}`}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'cover' 
                  }}
                  onClick={() => handleMediaClick(file.filename, file.mimetype)}
                  controls
                />
              )}
            </div>
            <div style={{ 
              padding: '10px', 
              fontSize: '14px', 
             
              color:"white",
              textAlign: 'center' 
            }}>
              <p>
                {file.description
                  ? (file.showFullDescription
                      ? file.description
                      : file.description.length > 100
                        ? truncateText(file.description, 100)
                        : file.description)
                  : 'No description available'}
                {file.description && file.description.length > 100 && (
                  <span
                    onClick={() => toggleDescription(index)}
                    style={{ 
                      color: 'blue', 
                      cursor: 'pointer', 
                     
                      marginLeft: '5px', 
                      textDecoration: 'underline' 
                    }}
                  >
                    {file.showFullDescription ? ' Show less' : ' Read more'}
                  </span>
                )}
              </p>
            </div>
            <div style={{ 
              position: 'absolute', 
              bottom: '10px', 
              left: '10px', 
              fontSize: '12px', 
              color: 'blue' 
              
            }}>
              {new Date(file.postTime).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Media View */}
      {isFullScreen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
          onClick={handleCloseFullScreen}
        >
          {selectedMedia.mimetype.startsWith('image/') ? (
            <img
              src={`http://localhost:8080/media/${selectedMedia.filename}`}
              alt="Full Screen"
              style={{ 
                maxWidth: '160%', 
                maxHeight: '100%', 
                objectFit: 'contain', 
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' 
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
          ) : selectedMedia.mimetype.startsWith('video/') ? (
            <video
              src={`http://localhost:8080/media/${selectedMedia.filename}`}
              style={{ 
                maxWidth: '160%', 
                maxHeight: '100%', 
                objectFit: 'contain', 
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' 
              }}
              controls
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the video
            />
          ) : (
            <div>Unsupported media type</div>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
