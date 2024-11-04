import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PaymentMethode() {
  const [Method, setSelectedMethod] = useState('');
  const navigate = useNavigate(); // To navigate after submission

  const handleSelection = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Method) {
        alert('Please select a payment method.');
        return;
    }

    try {
        // Sending the selected payment method as a JSON object
        const response = await axios.post("http://localhost:8080/payment-methods", { Method });

        console.log('Response:', response.data); // Log the entire response for debugging

        // Ensure that you have a valid id here
        const paymentMethodId = response.data.id; // Assuming your API returns an id for the created payment method

        if (paymentMethodId) {
            alert('Payment method saved successfully.');
            navigate(`/subscribe/${paymentMethodId}`); // Use the returned id
        } else {
            alert('Failed to retrieve payment method ID.');
        }

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); // Log detailed error information
        alert('There was an error processing your payment method. Please try again.');
    }
};

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '30px',
        marginBottom: '30px',
        textAlign: 'center',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '600px',
      }}>
        <p style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: 0,
        }}>
          Welcome! We are glad to have you with us. We believe you'll be satisfied with our service.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '80%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Select Payment Method</h2>
        
        <select 
          value={Method} 
          onChange={handleSelection} 
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            fontSize: '18px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        >
          <option value="" disabled>Select your payment method</option>
          <option value="CBE">CBE</option>
          <option value="Dashen Bank">Dashen Bank</option>
          <option value="Berhan Bank">Berhan Bank</option>
        </select>

        <button 
          type="submit" 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px',
            width: '100%',
            fontSize: '20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default PaymentMethode;