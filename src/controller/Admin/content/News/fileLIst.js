// src/components/FileList.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function FileList() {
  const [files, setFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:8080/upload/files', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        setFiles(res.data.files);
        setTotalFiles(res.data.total); // Assuming your API returns total file count
      } catch (err) {
        setError('Error fetching file list');
        console.error(err);
      }
    };

    fetchFiles();
  }, [currentPage]);

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:8080/upload/files/${filename}`);
      setFiles(files.filter(file => file.filename !== filename));
    } catch (err) {
      setError('Error deleting file');
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalFiles / itemsPerPage);

  return (
    <div className="container " >
      <h2 style={{marginLeft:"200px" ,fontSize:"30px"}}>Uploaded Files</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Filename</th>
            {/* <th>Size (Bytes)</th> */}
            {/* <th>Last Modified</th> */}
            <th>Description</th>
            <th>Content</th>
            <th>Post Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody >
          {files.map((file, index) => (
            <tr key={index}>
              <td ><a href={`http://localhost:8080/uploads/${file.filename}`} target="_blank" rel="noopener noreferrer">{file.filename}</a></td>
              
              {/* <td>{new Date(file.modifiedTime).toLocaleString()}</td> */}
              <td>{file.description || 'N/A'}</td>
              <td>{file.content || 'N/A'}</td>
              <td>{file.postTime || 'N/A'}</td>
              <td>
                <div className="delete" onClick={() => handleDelete(file.filename)} style={{ cursor: 'pointer' }} > <i className="bi bi-trash"></i></div>
                <Link to={`/edit/${file.filename}`} className=" ms-2"><i class="bi bi-pen"></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default FileList;
