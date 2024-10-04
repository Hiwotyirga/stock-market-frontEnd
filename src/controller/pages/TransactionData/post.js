import React, { useState } from 'react';
import axios from 'axios';
import './post.css';
import swal from 'sweetalert';

const TransactionForm = () => {
  const [quantity, setQuantity] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);

  const data = {
    quantity,
    fullName,
    email,
    transactionType,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwtToken = localStorage.getItem('jwt');
    if (!jwtToken) {
      setMessage('You need to log in to create a transaction.');
      return; // Stop if no token is available
    }

    console.log('JWT Token:', jwtToken); // Log JWT token for debugging
    console.log('Form Data:', data); // Log form data for debugging

    try {
      const response = await axios.post('http://localhost:8080/transactions', data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include JWT token in the request headers
        },
      });

      // Notify the user of successful creation
      swal("Transaction created successfully!");
      setList((prevList) => [...prevList, response.data]); // Append the new transaction to the list

      // Clear the form fields
      setQuantity('');
      setFullName('');
      setEmail('');
      setTransactionType('');
      setMessage(''); 
    } catch (error) {
      // Log the error details for debugging
      console.error('Error response:', error.response?.data || error.message);
      setMessage('Error creating transaction. Please try again.'); // Display a user-friendly error message
    }
  };

  return (
    <div className="form-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2>Create a Transaction</h2>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Transaction Type:
          <select
            name="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <option value="CBE">CBE</option>
            <option value="DASH">DASH</option>
            <option value="AWASH">AWASH</option>
          </select>
        </label>
        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>} {/* Display error/success messages */}
      </form>
      <div className="welcome-message">
        <h1>Welcome to our website!</h1>
        <p>We are happy for you to buy stock. Please fill out the form above.</p>
      </div>
    </div>
  );
};

export default TransactionForm;
