import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';


function TopGainersGet() {
  const [topGainers, setTopGainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/top-gainer/top-gainers');
        setTopGainers(response.data); // Properly update state with response data
      } catch (error) {
        console.error('Error fetching stocks:', error);
        swal('Failed to fetch stocks.');
      }
    };

    fetchStocks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editgain/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/top-gainer/top-gainers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      
      if (response.status === 200) {
        swal('Stock deleted successfully.');
        setTopGainers(topGainers.filter(stock => stock.id !== id));
      } else {
        swal('Failed to delete stock. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
      swal('Error deleting stock. Please try again.');
    }
  };

  return (
    <div className="container" style={{ fontSize: '15px' }}>
      <main className="main-content">
        <div className="header d-flex justify-content-between align-items-center">
          <h1>Top Gainers</h1>
          <Link to='/topGainer' className="btn btn-primary">Add Stock</Link>
        </div>
        <div className="table-container mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Change Amount</th>
                <th>Change Percentage</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topGainers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No stocks available</td>
                </tr>
              ) : (
                topGainers.map((stock) => (
                  <tr key={stock.id}> {/* Use stock.id for unique key */}
                    <td>{stock.ticker}</td>
                    <td>{stock.price}</td>
                    <td>{stock.change_amount}</td>
                    <td>{stock.change_percentage}</td>
                    <td>{stock.volume}</td>
                    <td>
                      <span
                        style={{ marginRight: '20px', cursor: 'pointer' }}
                        onClick={() => handleEdit(stock.id)} // Use stock.id for editing
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span
                        onClick={() => handleDelete(stock.id)} // Use stock.id for deletion
                        title="Delete"
                        style={{ cursor: 'pointer' }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default TopGainersGet;
