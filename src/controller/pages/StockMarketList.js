import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockMarket.css'; // Import CSS file for styling

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
        // const response = await axios.get('http://localhost:8080/stock-market/stock/list');
        const response = await axios.get('http://localhost:8080/market/stocks');
        setStockData(response.data);
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

  const handleBuyClick = (ticker) => {
    alert(`You clicked buy for ${ticker}. Implement the buying functionality as needed.`);
  };

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
                <button
                  onClick={() => handleBuyClick(item.ticker)}
                  className={`buy-button ${isLoser ? 'loser-button' : 'gainer-button'}`}
                >
                  Buy
                </button>
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
      {renderColumn('Top Gainers', stockData.top_gainers)} {/* Green button */}
      {renderColumn('Top Losers', stockData.top_losers, true)} {/* Red button */}
      {renderColumn('Most Actively Traded Stocks', stockData.most_actively_traded)}
    </div>
  );
};

export default StockMarketList;
