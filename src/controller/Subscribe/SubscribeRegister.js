import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

// Rename the component to start with an uppercase letter
export const SubscribeRegister = () => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const { id } = useParams(); // This is fine as it is
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, password };

    try {
      setLoading(true); // Start loading
      const response = await axios.post(`http://localhost:8080/auth/subscribers/${id}`, data);
      swal("SUCCESSFULLY REGISTERED");
      navigate("/Customer");
    } catch (error) {
      console.error("Error during registration:", error); // Log the error for debugging
      if (error.response && error.response.status === 409) {
        swal('Email already exists. Please use a different email.');
      } else {
        swal('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container-fluid p-0" 
      style={{ 
        backgroundImage: `url('/6c741c60bf84723ea1184eaf5bb19c59.jpg')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="border p-4 bg-light rounded shadow" 
        style={{ width: '430px' }}
      >
        <h2 style={{ textAlign: "center", color: "green", marginBottom: "20px" }}>Register</h2>
        
        <div className="form-group" style={{ marginBottom: "30px" }}>
          <label htmlFor="name" style={{ color: "green", fontSize: "20px" }}>Company Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ height: "50px", fontSize: "18px" }}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: "30px" }}>
          <label htmlFor="email" style={{ color: "green", fontSize: "20px" }}>Company Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ height: "50px", fontSize: "18px" }}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: "30px" }}>
          <label htmlFor="password" style={{ color: "green", fontSize: "20px" }}>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ height: "50px", fontSize: "18px" }}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100" 
          style={{ height: "50px", fontSize: "20px" }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Next'}
        </button>
      </form>
    </div>
  );
}
