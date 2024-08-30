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
        setFiles(response.data.items || []);
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

  const handleNavigation = (id) => {
    navigate(`/file/${id}`);
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
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Latest News</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: "30px" }}>
        {files.map((file, index) => (
          <div key={file.id} style={{ margin: '15px', display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
            <div style={{ width: "670px", height: "370px" }}>
              {file.mimetype.startsWith('image/') && (
                <img
                  src={`http://localhost:8080/media/${file.filename}`}
                  alt={file.filename || 'Placeholder'}
                  style={{ width: '650px', height: '350px', objectFit: 'cover', marginRight: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                  onClick={() => handleMediaClick(file.filename, file.mimetype)}
                />
              )}
              {file.mimetype.startsWith('video/') && (
                <video
                  src={`http://localhost:8080/media/${file.filename}`}
                  style={{ width: '650px', height: '350px', objectFit: 'cover', marginRight: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                  onClick={() => handleMediaClick(file.filename, file.mimetype)}
                  controls
                />
              )}
            </div>
            <div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '30px', color: 'blue' }}>
                {file.content || 'No title'}
              </h3>
              <p style={{ fontSize: '18px', color: '#666', margin: '0 0 10px 0', width: "500px" }}>
                {file.description
                  ? (file.showFullDescription
                      ? file.description
                      : file.description.length > 310
                        ? truncateText(file.description, 310)
                        : file.description)
                  : 'No description available'}
                {file.description && file.description.length > 100 && (
                  <span
                    onClick={() => toggleDescription(index)}
                    style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }}
                  >
                    {file.showFullDescription ? ' Show less' : ' Read more'}
                  </span>
                )}
              </p>
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
              style={{ maxWidth: '160%', maxHeight: '100%', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
          ) : selectedMedia.mimetype.startsWith('video/') ? (
            <video
              src={`http://localhost:8080/media/${selectedMedia.filename}`}
              style={{ maxWidth: '160%', maxHeight: '100%', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
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
