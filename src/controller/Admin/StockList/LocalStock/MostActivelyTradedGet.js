// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import swal from 'sweetalert';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function MostActivelyTradedGet() {
//   const [topGainers, setTopGainers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStocks = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/local-market/stocks');
//         const active = response.data
//           .filter((item) => item.most_actively_traded && item.most_actively_traded.length > 0)
//           .flatMap((item) => item.most_actively_traded);

//         setTopGainers(active);
//       } catch (error) {
//         console.error('Error fetching stocks:', error);
//         swal('Failed to fetch stocks.');
//       }
//     };

//     fetchStocks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:8080/local-market/stocks/${id}`);
//       if (response.status === 200) {
//         swal('Stock deleted successfully.');
//         setTopGainers(topGainers.filter((stock) => stock.id !== id));
//       } else {
//         swal('Failed to delete stock. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error deleting stock:', error);
//       swal('Error deleting stock. Please try again.');
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/most-actively-traded/${id}`); // Navigate to edit route
//   };

//   return (
//     <div className="container" style={{ fontSize: '15px' }}>
//       <main className="main-content">
//         <div className="header">
//           <h1>Most Actively Traded</h1>
//           <button className="btn btn-primary">
//             <Link to="/activetrade" style={{ color: 'white' }}>
//               Add Stock
//             </Link>
//           </button>
//         </div>
//         <div className="table-container">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Ticker</th>
//                 <th>Price</th>
//                 <th>Change Amount</th>
//                 <th>Change Percentage</th>
//                 <th>Volume</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topGainers.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: 'center' }}>
//                     No stocks available
//                   </td>
//                 </tr>
//               ) : (
//                 topGainers.map((stock, index) => (
//                   <tr key={index}>
//                     <td>{stock.ticker}</td>
//                     <td>{stock.price}</td>
//                     <td>{stock.change_amount}</td>
//                     <td>{stock.change_percentage}</td>
//                     <td>{stock.volume}</td>
//                     <td>
//                       <span style={{ marginRight: '20px', cursor: 'pointer' }} onClick={() => handleEdit(stock.id)}>
//                         <FontAwesomeIcon icon={faEdit} title="Edit" />
//                       </span>
//                       <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(stock.id)}>
//                         <FontAwesomeIcon icon={faTrash} title="Delete" />
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default MostActivelyTradedGet;





import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function MostActivelyTradedGet() {
  const [topGainers, setTopGainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:8080/local-market/stocks');
        const data = await response.json();

        // Extract and include the parent stock ID with each top_gainer object
        const gainers = data
          .filter(item => item.most_actively_traded && item.most_actively_traded.length > 0)
          .flatMap(item => item.most_actively_traded.map(gainer => ({ ...gainer, parentId: item.id })));

        setTopGainers(gainers); // Set the filtered and flattened top_gainers data with parentId
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  const handleEdit = (parentId) => {
    navigate(`/most-actively-traded/${parentId}`); // Pass the stock id to the edit page
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/local-market/stocks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (response.status === 200) {
        swal('Stock deleted successfully.');
        setTopGainers(topGainers.filter(stock => stock.parentId !== id)); // Update filter to use parentId
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
          <h1>Most Actively Traded</h1>
          <button className="btn-primary">
            <Link to='/activetrade' style={{ color: 'white' }}>Add Stock</Link>
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
                        onClick={() => handleEdit(stock.parentId)} // Use parentId for editing
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span
                        className="action-icon"
                        onClick={() => handleDelete(stock.parentId)} 
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

export default MostActivelyTradedGet;
