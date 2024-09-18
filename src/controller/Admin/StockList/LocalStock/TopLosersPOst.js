import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function TopLosersPOst() {
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
          
          <h3>Top Losers</h3>
          <div className="form-group mb-3">
            <label htmlFor="losersTicker">Ticker</label>
            <input type="text" className="form-control" id="losersTicker" placeholder="Enter Ticker" value={losers.ticker} onChange={(e) => setLosers({ ...losers, ticker: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="losersPrice">Price</label>
            <input type="text" className="form-control" id="losersPrice" placeholder="Enter Price" value={losers.price} onChange={(e) => setLosers({ ...losers, price: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="losersChangeAmount">Change Amount</label>
            <input type="text" className="form-control" id="losersChangeAmount" placeholder="Enter Change Amount" value={losers.changeAmount} onChange={(e) => setLosers({ ...losers, changeAmount: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="losersChangePercentage">Change Percentage</label>
            <input type="text" className="form-control" id="losersChangePercentage" placeholder="Enter Change Percentage" value={losers.changePercentage} onChange={(e) => setLosers({ ...losers, changePercentage: e.target.value })} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="losersVolume">Volume</label>
            <input type="text" className="form-control" id="losersVolume" placeholder="Enter Volume" value={losers.volume} onChange={(e) => setLosers({ ...losers, volume: e.target.value })} />
          </div>

          {/* Most Actively Traded Section */}
          
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default TopLosersPOst;
