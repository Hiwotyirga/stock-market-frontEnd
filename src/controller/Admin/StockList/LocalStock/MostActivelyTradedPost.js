import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function MostActivelyTradedPost() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const [change_amount, setChangeAmount] = useState('');
  const [change_percentage, setChangePercentage] = useState('');
  const [volume, setVolume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        ticker,
        price: parseFloat(price), // Convert to number
        change_amount: parseFloat(change_amount), // Convert to number
        change_percentage: parseFloat(change_percentage), // Convert to number
        volume: parseInt(volume, 10), // Convert to integer
    };

    setIsLoading(true);

    try {
        const response = await axios.post('http://localhost:8080/most-actively-traded/most-active-trades', data);
        console.log('Response data:', response.data); // Log response for debugging
        swal('Stock Data Submitted Successfully!');
        navigate('/client'); // Navigate after successful submission
    } catch (error) {
        console.error('Error during submission:', error.response ? error.response.data : error.message);
        swal('Error submitting stock data.');
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
            <label htmlFor="ticker">Ticker</label>
            <input
              type="text"
              className="form-control"
              id="ticker"
              placeholder="Enter Ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="changeAmount">Change Amount</label>
            <input
              type="text"
              className="form-control"
              id="changeAmount"
              placeholder="Enter Change Amount"
              value={change_amount}
              onChange={(e) => setChangeAmount(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="changePercentage">Change Percentage</label>
            <input
              type="text"
              className="form-control"
              id="changePercentage"
              placeholder="Enter Change Percentage"
              value={change_percentage}
              onChange={(e) => setChangePercentage(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="volume">Volume</label>
            <input
              type="text"
              className="form-control"
              id="volume"
              placeholder="Enter Volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
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
