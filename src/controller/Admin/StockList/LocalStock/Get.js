
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './get.css'; // Ensure to import the CSS file

const LocalStockList = () => {
  const [stockData, setStockData] = useState({
    topGainers: [],
    topLosers: [],
    mostActivelyTraded: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/local-market/stocks');
        console.log('API Response:', response.data);

        const latestData = response.data[response.data.length - 1];

        setStockData({
          topGainers: latestData.topGainers || [],
          topLosers: latestData.topLosers || [],
          mostActivelyTraded: latestData.mostActivelyTraded || []
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const handleDelete = async (ticker) => {
    try {
      const response = await axios.delete(`http://localhost:8080/local-stock/delete/${ticker}`);
      if (response.status === 200) {
        alert('Stock deleted successfully.');
        setStockData((prevData) => ({
          ...prevData,
          topGainers: prevData.topGainers.filter(stock => stock.ticker !== ticker),
          topLosers: prevData.topLosers.filter(stock => stock.ticker !== ticker),
          mostActivelyTraded: prevData.mostActivelyTraded.filter(stock => stock.ticker !== ticker)
        }));
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
      alert('Error deleting stock.');
    }
  };

  const handleEdit = (ticker) => {
    alert(`Edit functionality for ${ticker} is yet to be implemented.`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const renderColumn = (title, items, isLoser = false) => (
    <div className={`column ${isLoser ? 'loser' : 'gainer'}`}>
      <h3 className="column-title">{title}</h3>
      {items.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Change</th>
                <th>Change %</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const price = parseFloat(item.price);
                return (
                  <tr key={item.ticker}>
                    <td>{item.ticker}</td>
                    <td>${isNaN(price) ? 'N/A' : price.toFixed(2)}</td>
                    <td>{item.changeAmount}</td>
                    <td>{item.changePercentage}%</td>
                    <td>{item.volume}</td>
                    <td>
                      <span style={{ marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item.ticker)}>
                        <FontAwesomeIcon icon={faEdit} title="Edit" />
                      </span>
                      <span style={{ cursor: "pointer" }} onClick={() => handleDelete(item.ticker)}>
                        <FontAwesomeIcon icon={faTrash} title="Delete" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );

  return (
    <div>
      <div className="header">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Add Stock
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/topGainer'>Top Gainers</Dropdown.Item>
            <Dropdown.Item as={Link} to='/toploser'>Top Losers</Dropdown.Item>
            <Dropdown.Item as={Link} to='/activetrade'>Most Actively Traded</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="container">
        {renderColumn('Top Gainers', stockData.topGainers)}
        {renderColumn('Top Losers', stockData.topLosers, true)}
        {renderColumn('Most Actively Traded Stocks', stockData.mostActivelyTraded)}
      </div>
    </div>
  );
};

export default LocalStockList;
