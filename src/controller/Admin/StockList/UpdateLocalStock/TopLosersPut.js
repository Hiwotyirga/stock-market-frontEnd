import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TopLosersPut() {
  const [gainers, setGainers] = useState({ ticker: '', price: '', changeAmount: '', changePercentage: '', volume: '' });
  const [topGainers, setTopGainers] = useState([]);
//   const navigate = useNavigate();
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/local-market/stocks/${id}`);
        const data = await response.json();

        const gainers = data
          .filter(item => item.top_losers && item.top_losers.length > 0) 
          .flatMap(item => item.top_losers); 

        setTopGainers(gainers); 
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const stockData = {
      lastUpdated: new Date().toISOString(), 
      top_gainers: [],
      top_losers: [{
        ticker: gainers.ticker,
        price: gainers.price,
        change_amount: gainers.changeAmount,
        change_percentage: gainers.changePercentage,
        volume: gainers.volume,
      }], 
      most_actively_traded: [] 
    };

    try {
      const response = await axios.put('http://localhost:8080/local-market/stocks', stockData);
      console.log('Response data:', response.data); 
      swal('Stock Data Submitted Successfully!');
      navigate('/contentdashbord'); 
    } catch (error) {
      console.error('There was an error submitting the stock data!', error);
      swal('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container-fluid p-3">
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded" style={{ margin: "-17px" }}></header>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
          {/* Top Gainers Section */}
          <h3>Top Looser</h3>
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

          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default TopLosersPut;
