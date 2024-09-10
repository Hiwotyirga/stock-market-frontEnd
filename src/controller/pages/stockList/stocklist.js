import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stock.css'; // Custom styles if you need
import { Button } from 'bootstrap';

const StocksList = () => {
  const [stocks, setStocks] = useState({ local: [], global: [] });

  useEffect(() => {
    // Fetching stock data from the backend API
    axios
      .get('http://localhost:8080/market/overview') // Make sure the API URL is correct
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  // Render a single stock card
  const renderStockCard = (stock, index) => (
    <div key={index} className="col-md-3 mb-4">
      <div className="card" style={{ width: '170px', height: '170px' }}>
        <div className="card-header text-start"><button style={{backgroundColor:"blueviolet", color:"white", borderRadius:"10px"}}>{stock.symbol}</button></div>
        <div className="card-body">
          <h5 className="card-title text-center">{stock.description}</h5>
        </div>
        <div className="card-footer text-center">
          Weight: ${stock.weight}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        {stocks.local.map((stock, index) => renderStockCard(stock, index))}
        {stocks.global.slice(0, 7).map((stock, index) => renderStockCard(stock, index))}
      </div>
    </div>
  );
};

export default StocksList;
