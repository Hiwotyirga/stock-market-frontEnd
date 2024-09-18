import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function MostActivelyTradedPost() {
  const [gainers, setGainers] = useState({ ticker: '', price: '', changeAmount: '', changePercentage: '', volume: '' });
  const [losers, setLosers] = useState({ ticker: '', price: '', changeAmount: '', changePercentage: '', volume: '' });
  const [actives, setActives] = useState({ ticker: '', price: '', changeAmount: '', changePercentage: '', volume: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stockData = {
      top_gainers: [gainers],
      top_losers: [losers],
      most_actively_traded: [actives],
    };

    try {
      const response = await axios.post('http://localhost:8080/local-stock/post', stockData);
      swal('Stock Data Submitted Successfully!');
      navigate('/contentdashbord');
    } catch (error) {
      console.error('There was an error submitting the stock data!', error);
      swal('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container-fluid p-3">
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded" style={{ margin: "-28px" }}></header>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
          {/* Top Gainers Section */}
          
          <h3>Most Actively Traded</h3>
          <div className="form-group mb-3">
            <label htmlFor="activesTicker">Ticker</label>
            <input type="text" className="form-control" id="activesTicker" placeholder="Enter Ticker" value={actives.ticker} onChange={(e) => setActives({ ...actives, ticker: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="activesPrice">Price</label>
            <input type="text" className="form-control" id="activesPrice" placeholder="Enter Price" value={actives.price} onChange={(e) => setActives({ ...actives, price: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="activesChangeAmount">Change Amount</label>
            <input type="text" className="form-control" id="activesChangeAmount" placeholder="Enter Change Amount" value={actives.changeAmount} onChange={(e) => setActives({ ...actives, changeAmount: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="activesChangePercentage">Change Percentage</label>
            <input type="text" className="form-control" id="activesChangePercentage" placeholder="Enter Change Percentage" value={actives.changePercentage} onChange={(e) => setActives({ ...actives, changePercentage: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="activesVolume">Volume</label>
            <input type="text" className="form-control" id="activesVolume" placeholder="Enter Volume" value={actives.volume} onChange={(e) => setActives({ ...actives, volume: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default MostActivelyTradedPost;
