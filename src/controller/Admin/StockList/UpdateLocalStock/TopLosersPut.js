import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditLooser() {
  const [gainer, setGainer] = useState({ ticker: '', price: '', changeAmount: '', changePercentage: '', volume: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the stock id from the URL parameters

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/local-market/stocks/${id}`);
        // Set the data directly to gainer, assuming your API returns the correct structure
        if (response.data.top_losers && response.data.top_losers.length > 0) {
          const stock = response.data.top_losers[0];
          setGainer({
            ticker: stock.ticker,
            price: stock.price,
            changeAmount: stock.change_amount,
            changePercentage: stock.change_percentage,
            volume: stock.volume,
          });
        } else {
          swal('No stock data found for this ID.');
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        swal('An error occurred while fetching stock data.');
      }
    };

    fetchStock();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStockData = {
      top_losers: [
        {
          ticker: gainer.ticker,
          price: gainer.price,
          change_amount: gainer.changeAmount,
          change_percentage: gainer.changePercentage,
          volume: gainer.volume,
        },
      ],
    };

    try {
      await axios.put(`http://localhost:8080/local-market/stocks/${id}`, updatedStockData);
      swal('Stock Updated Successfully!');
      navigate('/contentdashbord');
    } catch (error) {
      swal('An error occurred while updating the stock. Please try again.');
    }
  };

  return (
    <div className="container-fluid p-3">
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded" style={{ margin: "-45px",  width:"1400", height:"70px"}}></header>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
          <h3>Edit Stock</h3>
          <div className="form-group mb-3">
            <label htmlFor="gainersTicker">Ticker</label>
            <input
              type="text"
              className="form-control"
              id="gainersTicker"
              placeholder="Enter Ticker"
              value={gainer.ticker}
              onChange={(e) => setGainer({ ...gainer, ticker: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="gainersPrice">Price</label>
            <input
              type="text"
              className="form-control"
              id="gainersPrice"
              placeholder="Enter Price"
              value={gainer.price}
              onChange={(e) => setGainer({ ...gainer, price: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="gainersChangeAmount">Change Amount</label>
            <input
              type="text"
              className="form-control"
              id="gainersChangeAmount"
              placeholder="Enter Change Amount"
              value={gainer.changeAmount}
              onChange={(e) => setGainer({ ...gainer, changeAmount: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="gainersChangePercentage">Change Percentage</label>
            <input
              type="text"
              className="form-control"
              id="gainersChangePercentage"
              placeholder="Enter Change Percentage"
              value={gainer.changePercentage}
              onChange={(e) => setGainer({ ...gainer, changePercentage: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="gainersVolume">Volume</label>
            <input
              type="text"
              className="form-control"
              id="gainersVolume"
              placeholder="Enter Volume"
              value={gainer.volume}
              onChange={(e) => setGainer({ ...gainer, volume: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Update Stock</button>
        </form>
      </div>
    </div>
  );
}

export default EditLooser;
