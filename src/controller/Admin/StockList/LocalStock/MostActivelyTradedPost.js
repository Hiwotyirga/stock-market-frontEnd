import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function MostActivelyTradedPost() {
  const [gainers, setGainers] = useState({
    ticker: '',
    price: '',
    changeAmount: '',
    changePercentage: '',
    volume: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (you can customize it as needed)
    if (!gainers.ticker || !gainers.price || !gainers.changeAmount || !gainers.changePercentage || !gainers.volume) {
      swal('Please fill in all fields.');
      return;
    }

    const stockData = {
      lastUpdated: new Date().toISOString(),
      top_gainers: [],
      top_losers: [],
      most_actively_traded: [
        {
          ticker: gainers.ticker,
          price: gainers.price,
          change_amount: gainers.changeAmount,
          change_percentage: gainers.changePercentage,
          volume: gainers.volume,
        }
      ]
    };

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post('http://localhost:8080/local-market/stocks', stockData);
      console.log('Response data:', response.data); // Log response for debugging
      swal('Stock Data Submitted Successfully!');
      navigate('/contentdashbord'); // Navigate to the dashboard after successful submission
    } catch (error) {
      console.error('Error submitting stock data:', error);
      swal('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="container-fluid p-3">
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded" style={{ margin: "-17px" }}></header>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
          <h3>Most Actively Traded</h3>
          
          <div className="form-group mb-3">
            <label htmlFor="gainersTicker">Ticker</label>
            <input
              type="text"
              className="form-control"
              id="gainersTicker"
              placeholder="Enter Ticker"
              value={gainers.ticker}
              onChange={(e) => setGainers({ ...gainers, ticker: e.target.value })}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="gainersPrice">Price</label>
            <input
              type="text"
              className="form-control"
              id="gainersPrice"
              placeholder="Enter Price"
              value={gainers.price}
              onChange={(e) => setGainers({ ...gainers, price: e.target.value })}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="gainersChangeAmount">Change Amount</label>
            <input
              type="text"
              className="form-control"
              id="gainersChangeAmount"
              placeholder="Enter Change Amount"
              value={gainers.changeAmount}
              onChange={(e) => setGainers({ ...gainers, changeAmount: e.target.value })}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="gainersChangePercentage">Change Percentage</label>
            <input
              type="text"
              className="form-control"
              id="gainersChangePercentage"
              placeholder="Enter Change Percentage"
              value={gainers.changePercentage}
              onChange={(e) => setGainers({ ...gainers, changePercentage: e.target.value })}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="gainersVolume">Volume</label>
            <input
              type="text"
              className="form-control"
              id="gainersVolume"
              placeholder="Enter Volume"
              value={gainers.volume}
              onChange={(e) => setGainers({ ...gainers, volume: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MostActivelyTradedPost;
