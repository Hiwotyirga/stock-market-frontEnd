import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function TopLosersGet() {
  const [topGainers, setTopGainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/top-loser/top-losers');
        console.log("Fetched data:", response.data); // Log data to inspect structure
        setTopGainers(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
        swal('Failed to fetch stocks.');
      }
    };

    fetchStocks();
  }, []);

  // Ensure the correct ID is passed for editing and deleting
  const handleEdit = (id) => {
    if (id) {
      navigate(`/editloser/${id}`);
    } else {
      swal('No valid ID found for editing.');
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      swal('No valid ID found for deletion.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/top-loser/top-losers/${id}`, {
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
        <div className="header">
          <h1>Top Loser Stocks</h1>
          <button className="btn-primary">
            <Link to='/toploser' style={{ color: 'white' }}>Add Stock</Link>
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Change amount</th>
                <th>Change percentage</th>
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
                topGainers.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.ticker}</td>
                    <td>{stock.price}</td>
                    <td>{stock.change_amount}</td>
                    <td>{stock.change_percentage}</td>
                    <td>{stock.volume}</td>
                    <td>
                      <span
                        style={{ marginRight: '20px', cursor: 'pointer' }}
                        className="action-icon"
                        onClick={() => handleEdit(stock.id)} // Use stock.id for editing
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span
                        className="action-icon"
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

export default TopLosersGet;
