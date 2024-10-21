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

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/local-market/stocks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

        const topGainers = [];
        const topLosers = [];
        const mostActivelyTraded = [];

        response.data.forEach(item => {
          if (item.top_gainers) {
            topGainers.push(...item.top_gainers);
          }
          if (item.top_losers) {
            topLosers.push(...item.top_losers);
          }
          if (item.most_actively_traded) {
            mostActivelyTraded.push(...item.most_actively_traded);
          }
        });

        setStockData({
          top_gainers: topGainers,
          top_losers: topLosers,
          most_actively_traded: mostActivelyTraded,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!stockData || !Array.isArray(stockData.top_gainers) || !Array.isArray(stockData.top_losers) || !Array.isArray(stockData.most_actively_traded)) {
    return <div className="no-data">No data available</div>;
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
          {items.map((item) => {
            const price = parseFloat(item.price);
            return (
              <div className="item" key={item.ticker}>
                <span className="ticker">{item.ticker}</span>
                <span className="price">${isNaN(price) ? 'N/A' : price.toFixed(2)}</span>
                <span className="change-amount">${item.change_amount || item.changeAmount}</span>
                <span className="change-percentage">{item.change_percentage || item.changePercentage}%</span>
                <span className="volume">{item.volume}</span>
                <Link to={`/stocks/${item.ticker}`}>
                  <button className={`buy-button ${isLoser ? 'loser-button' : 'gainer-button'}`}>
                    View Details
                  </button>
                </Link>
              </div>
            );
          })}
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
