import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockMarket.css'; // Import the CSS file for styling

const StockMarketList = () => {
  const [data, setData] = useState({ topGainers: [], topLosers: [], mostActivelyTraded: [] });
  const apiUrl = 'http://localhost:8080/stock-market/stock/list';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the local API
        const response = await axios.get(apiUrl);
        const result = response.data;

        // Set state with the correct data structure
        setData({
          topGainers: result.top_gainers || [],
          topLosers: result.top_losers || [],
          mostActivelyTraded: result.most_actively_traded || []
        });
      } catch (error) {
        console.error('Error fetching stock market data:', error);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleBuyClick = (ticker) => {
    alert(`Buying ${ticker}`);
  };

  const renderColumn = (title, items, isLoser = false) => (
    <div className="column">
      <h3>{title}</h3>
      {items.length > 0 ? (
        <>
          {/* Add headers for each value */}
          <div className="headers"style={{gap:"5px"}}>
            <span className="header ticker"style={{gap:"5px"}}>Ticker</span>
            <span className="header price">Price</span>
            <span className="header change-amount">Change</span>
            <span className="header change-percentage">Change %</span>
            <span className="header volume">Volume</span>
            <span className="header action">Action</span>
          </div>

          {/* Render each item with its corresponding labels */}
          {items.map((item) => (
            <div className="item" key={item.ticker}>
              <span className="ticker">{item.ticker}</span>
              <span className="price">${item.price}</span>
              <span className="change-amount">${item.change_amount}</span>
              <span className="change-percentage">{item.change_percentage}</span>
              <span className="volume">{item.volume}</span>
              <button
                onClick={() => handleBuyClick(item.ticker)}
                className={`buy-button ${isLoser ? 'loser-button' : 'gainer-button'}`} // Conditionally apply classes
              >
                Buy
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );

  return (
    <div className="container">
      {renderColumn('Top Gainers', data.topGainers)} {/* Green button */}
      {renderColumn('Top Losers', data.topLosers, true)} {/* Red button */}
      {renderColumn('Most Actively Traded Stocks', data.mostActivelyTraded)}
    </div>
  );
};

export default StockMarketList;
