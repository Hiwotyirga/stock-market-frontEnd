// StockDetail.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StockDetail = () => {
  const { ticker } = useParams(); // Get the ticker from the URL parameters
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/local-market/stocks/${ticker}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        setPriceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock price data:', error);
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [ticker]);

  const chartData = {
    labels: priceData.map((data) => new Date(data.timestamp).toLocaleDateString()), // Assuming your data has a timestamp
    datasets: [
      {
        label: 'Price',
        data: priceData.map((data) => data.price), // Assuming your price data is in a "price" field
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h2>{ticker} Price Chart</h2>
      <Line data={chartData} />
      {/* Add buttons to buy/sell */}
      <button onClick={() => alert(`Buying ${ticker}`)}>Buy</button>
      <button onClick={() => alert(`Selling ${ticker}`)}>Sell</button>
    </div>
  );
};

export default StockDetail;
