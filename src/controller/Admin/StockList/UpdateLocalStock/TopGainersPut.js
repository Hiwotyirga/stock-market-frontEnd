import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditGainer() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const [change_amount, setChangeAmount] = useState('');
  const [change_percentage, setChangePercentage] = useState('');
  const [volume, setVolume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStock = async () => {
      try {
        console.log("Fetching data for id:", id);
        const response = await axios.get(`http://localhost:8080/top-gainer/most-active-trades/${id}`);
        const stockData = response.data;

        setTicker(stockData.ticker);
        setPrice(stockData.price);
        setChangeAmount(stockData.change_amount);
        setChangePercentage(stockData.change_percentage);
        setVolume(stockData.volume);
      } catch (error) {
        console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        swal(`An error occurred while fetching stock data: ${error.message}`);
      }
    };

    fetchStock();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ticker,
      price: parseFloat(price),
      change_amount: parseFloat(change_amount),
      change_percentage: parseFloat(change_percentage),
      volume: parseInt(volume, 10),
    };

    try {
      setIsLoading(true);
      await axios.put(`http://localhost:8080/top-gainer/top-gainers/${id}`, data);
      swal('Stock Updated Successfully!');
      navigate('/client');
    } catch (error) {
      console.error('Error updating stock:', error.response ? error.response.data : error.message);
      swal(`An error occurred while updating the stock: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-3">
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded" style={{ margin: "-45px", width: "1400px", height: "70px" }}></header>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
          <h3>Most Gainer</h3>

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

export default EditGainer;
