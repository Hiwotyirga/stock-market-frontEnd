// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import swal from 'sweetalert';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function MostActivelyTradedPut() {
//   const [gainers, setGainers] = useState({
//     ticker: '',
//     price: '',
//     changeAmount: '',
//     changePercentage: '',
//     volume: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get the stock ID from the URL parameters

//   // Fetch the stock data for editing when the component mounts
//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/local-market/stocks/${id}`);
//         setGainers(response.data.most_actively_traded[0]); // Assuming data is structured as expected
//       } catch (error) {
//         console.error('Error fetching stock data:', error);
//         swal('Failed to fetch stock data. Please try again.');
//       }
//     };

//     fetchStockData();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation (you can customize it as needed)
//     if (!gainers.ticker || !gainers.price || !gainers.changeAmount || !gainers.changePercentage || !gainers.volume) {
//       swal('Please fill in all fields.');
//       return;
//     }

//     const stockData = {
//       lastUpdated: new Date().toISOString(),
//       top_gainers: [
//         {
//           ticker: gainers.ticker,
//           price: gainers.price,
//           change_amount: gainers.changeAmount,
//           change_percentage: gainers.changePercentage,
//           volume: gainers.volume,
//         },
//       ],
//       top_losers: [],
//     };

//     try {
//       setIsLoading(true); // Start loading
//       const response = await axios.put(`http://localhost:8080/local-market/stocks/${id}`, stockData);
//       console.log('Response data:', response.data); // Log response for debugging
//       swal('Stock Data Updated Successfully!');
//       navigate('/contentdashbord'); // Navigate to the dashboard after successful submission
//     } catch (error) {
//       console.error('Error updating stock data:', error);
//       swal('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="container-fluid p-3">
//       <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded" style={{ margin: '-17px' }}></header>
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//         <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
//           <h3>Most Actively Traded</h3>

//           <div className="form-group mb-3">
//             <label htmlFor="gainersTicker">Ticker</label>
//             <input
//               type="text"
//               className="form-control"
//               id="gainersTicker"
//               placeholder="Enter Ticker"
//               value={gainers.ticker}
//               onChange={(e) => setGainers({ ...gainers, ticker: e.target.value })}
//             />
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="gainersPrice">Price</label>
//             <input
//               type="text"
//               className="form-control"
//               id="gainersPrice"
//               placeholder="Enter Price"
//               value={gainers.price}
//               onChange={(e) => setGainers({ ...gainers, price: e.target.value })}
//             />
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="gainersChangeAmount">Change Amount</label>
//             <input
//               type="text"
//               className="form-control"
//               id="gainersChangeAmount"
//               placeholder="Enter Change Amount"
//               value={gainers.changeAmount}
//               onChange={(e) => setGainers({ ...gainers, changeAmount: e.target.value })}
//             />
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="gainersChangePercentage">Change Percentage</label>
//             <input
//               type="text"
//               className="form-control"
//               id="gainersChangePercentage"
//               placeholder="Enter Change Percentage"
//               value={gainers.changePercentage}
//               onChange={(e) => setGainers({ ...gainers, changePercentage: e.target.value })}
//             />
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="gainersVolume">Volume</label>
//             <input
//               type="text"
//               className="form-control"
//               id="gainersVolume"
//               placeholder="Enter Volume"
//               value={gainers.volume}
//               onChange={(e) => setGainers({ ...gainers, volume: e.target.value })}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
//             {isLoading ? 'Updating...' : 'Update'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default MostActivelyTradedPut;







import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function MostActivelyTradedPut() {
  const [gainer, setGainer] = useState({ ticker: '', price: '', changeAmount: '', changePercentage: '', volume: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/local-market/stocks/${id}`);
        if (response.data.most_actively_traded && response.data.most_actively_traded.length > 0) {
          const stock = response.data.most_actively_traded[0];
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
      most_actively_traded: [
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
       <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded " style={{ margin: "-45px",  width:"1400", height:"70px"}}></header>
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

export default MostActivelyTradedPut;
