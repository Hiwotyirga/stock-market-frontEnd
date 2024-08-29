import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For getting route parameters

const FileDetail = () => {
  const { id } = useParams(); // Get the file ID from the URL
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFileDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/image/upload/file/${id}`);
        setFile(response.data);
      } catch (error) {
        console.error('Error fetching file details:', error);
      }
    };

    fetchFileDetail();
  }, [id]);

  if (!file) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{file.describe}</h2>
      <p>{file.content}</p>
      <img 
        src={file.filename} 
        alt={file.filename} 
        style={{ maxWidth: '600px', maxHeight: '400px', objectFit: 'contain' }} 
      />
    </div>
  );
};

export default FileDetail;
