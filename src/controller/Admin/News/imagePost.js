import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Logout from '../../Auth/logout';
import swal from 'sweetalert';

function ImagePost() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('content', content);
  
    try {
      const response = await axios.post('http://localhost:8080/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      
      // Update the list with the response data
      setList(prevList => [...prevList, response.data]);

      swal("Successfully uploaded");
      navigate("/contentdashbord")
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Submission failed. Please try again.');
      } else {
        setErrorMessage('Submission failed. Please try again.');
      }
      swal('Submission failed. Please try again.');
    }
  };

  return (
    <div className="container-fluid p-3" style={{fontSize:"10px"}}>
      {/* Header section */}
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded mb-4" style={{margin:" -28px", padding:"-50px"}}>
        <h1 className="mb-0"  style={{fontSize:"30px" }}>Stock Market</h1>
        <div style={{marginRight:"50px"}}>
          <Logout /> {/* Use the Logout component */}
        </div>
      </header>

      {/* Registration form */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="form-group mb-3" style={{fontSize:"25px"}}>
            <label htmlFor="file">Upload file</label>
            <input
              type="file"
              className="form-control"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="form-group mb-3" style={{fontSize:"25px"}}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group mb-3" style={{fontSize:"25px"}}>
            <label htmlFor="content">Content</label>
            <input
              type="text"
              className="form-control"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ImagePost;
