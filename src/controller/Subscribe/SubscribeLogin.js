import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function SubscribeLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, password };

    try {
      const response = await axios.post('http://localhost:8080/auth/login/Subscriber', data);
      const token = response.data.access_token;
      localStorage.setItem('jwt', token);
      navigate('/subscriber/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        swal("LOGIN FAILED: INCORRECT USERNAME OR PASSWORD.");
      } else {
        swal('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url('/6c741c60bf84723ea1184eaf5bb19c59.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="border p-4 bg-light rounded shadow"
        style={{ width: '400px' }}
      >
        <div className="form-group mb-3">
          <label htmlFor="name" style={{ color: "green", fontSize: "25px" }}>Company Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ height: "70px", color: "black", fontSize: "25px" }}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputPassword1" style={{ color: "green", fontSize: "25px" }}>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ height: "70px", color: "black", fontSize: "25px" }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ height: "70px", color: "black", fontSize: "25px" }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default SubscribeLogin;
