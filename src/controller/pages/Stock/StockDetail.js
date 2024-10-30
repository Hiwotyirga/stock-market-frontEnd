import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './StockDetails.css';

const StockDetails = () => {
  const { ticker } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  
  const [stockHistory, setStockHistory] = useState([]);
  const [stockDetails, setStockDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockDetails = async () => {
    try {
      const endpointMap = {
        'top-gainers': `/stocks/top-gainers/${ticker}/price-history`,
        'top-losers': `/stocks/top-losers/${ticker}/price-history`,
        'most-actively-traded': `/stocks/most-active-trades/${ticker}/price-history`
      };

      // const { data } = await axios.get(`http://localhost:8080${endpointMap[type]}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      // });
      const { data } = await axios.get(`/stocks/most-active-trades/${ticker}/price-history`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      console.log("PriceHistory:", data.data);

      setStockDetails(data);
      setStockHistory(data.history);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      setError('Error fetching stock details. Please try again later.');
      setLoading(false);
    }
  };

  const handleBuySell = async (action) => {
    try {
      const response = await axios.post('http://localhost:8080/local-market/transaction', {
        stockId: ticker,
        action,
      });
      alert(`${action} transaction successful! Response: ${response.data.message}`);
    } catch (error) {
      console.error(`Error during ${action} transaction:`, error);
      alert(`Failed to ${action} the stock. Please try again.`);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, [ticker]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const data = {
    labels: stockHistory.map((entry) => entry.date),
    datasets: [
      {
        label: 'Stock Price',
        data: stockHistory.map((entry) => entry.price),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  return (
    <div className="stock-details">
      <h2>{stockDetails.ticker} - {stockDetails.name}</h2>
      <div className="chart-container">
        <Line data={data} />
      </div>
      <div className="buy-sell-buttons">
        <button onClick={() => handleBuySell('buy')} className="buy-button">Buy</button>
        <button onClick={() => handleBuySell('sell')} className="sell-button">Sell</button>
      </div>
    </div>
  );
};

export default StockDetails;
