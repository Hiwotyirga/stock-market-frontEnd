import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockMarket.css'; 
import { Link } from 'react-router-dom';

const StockMarketList = () => {
  const [stockData, setStockData] = useState({
    top_gainers: [],
    top_losers: [],
    most_actively_traded: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const [gainersResponse, losersResponse, activeTradesResponse] = await Promise.all([
          axios.get('http://localhost:8080/stocks/top-gainers', {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
          }),
          axios.get('http://localhost:8080/stocks/top-losers', {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
          }),
          axios.get('http://localhost:8080/stocks/most-active-trades', {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
          })
        ]);

        setStockData({
          top_gainers: gainersResponse.data,
          top_losers: losersResponse.data,
          most_actively_traded: activeTradesResponse.data,
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error fetching data: {error.message}</div>;
  }

  const renderColumn = (title, items, isLoser = false) => (
    <div className={`column ${isLoser ? 'loser' : 'gainer'}`}>
      <h3 className="column-title">{title}</h3>
      {items.length > 0 ? (
        <div className="table-container">
          <div className="headers">
            <span className="header ticker">Ticker</span>
            <span className="header price">Price</span>
            <span className="header change-amount">Change</span>
            <span className="header change-percentage">Change %</span>
            <span className="header volume">Volume</span>
            <span className="header action">Action</span>
          </div>
          {items.map((item) => (
            <div className="item" key={item.id || item.ticker}>
              <span className="ticker">{item.ticker}</span>
              <span className="price">${parseFloat(item.price).toFixed(2) || 'N/A'}</span>
              <span className="change-amount">${item.change_amount || item.changeAmount}</span>
              <span className="change-percentage">{item.change_percentage || item.changePercentage}%</span>
              <span className="volume">{item.volume}</span>
              <Link to={`/stocks/${item.ticker}?type=${title.toLowerCase().replace(' ', '-')}`}>
                <button className={`buy-button ${isLoser ? 'loser-button' : 'gainer-button'}`}>
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );

  return (
    <div className="container">
      {renderColumn('Top Gainers', stockData.top_gainers)}
      {renderColumn('Top Losers', stockData.top_losers, true)}
      {renderColumn('Most Actively Traded Stocks', stockData.most_actively_traded)}
    </div>
  );
};

export default StockMarketList;
