import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';

function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // Updated to be mutable
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      name,
      email,
      password,
      role,
    };
   
    try {
      const response = await axios.post("http://localhost:8080/auth/register", data);
      swal("SUCCESSFULLY REGISTERED"); // Update success message
      navigate('/contentdashbord');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        swal('Email already exists. Please use a different email.');
      } else {
        swal('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container-fluid p-3">
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-2 rounded mb-3" style={{ marginTop: "10px", height: "60px", margin:" -28px" }}>
      </header>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow" style={{ width: '300px', height: 'auto' }}>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="role">Role</label>
            <select
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              {/* Add more roles as needed */}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default AddAdmin;
