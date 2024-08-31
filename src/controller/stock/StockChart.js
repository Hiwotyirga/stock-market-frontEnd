import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const socket = io('http://localhost:8080'); // Backend WebSocket URL

const StockChart = ({ symbol }) => {
  const [stockData, setStockData] = useState([]);
  const [realTimePrice, setRealTimePrice] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/stock/real-time?symbol=${symbol}`);

    socket.on('stockPriceUpdate', (data) => {
      const price = parseFloat(data['05. price']);
      setRealTimePrice(price);
      setStockData((prevData) => [...prevData, { time: new Date().toLocaleTimeString(), price }]);
    });

    return () => socket.off('stockPriceUpdate');
  }, [symbol]);

  const chartData = {
    labels: stockData.map((data) => data.time),
    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: stockData.map((data) => data.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `${symbol} Stock Price Chart`,
      },
    },
  };

  return (
    <div>
      <h2>Real-Time Price: ${realTimePrice}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
