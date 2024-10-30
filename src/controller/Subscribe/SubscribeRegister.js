import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const SubscribeRegister = () => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "Subscriber"; // Set role as a fixed value

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      role 
    };

    try {
      const response = await axios.post("http://localhost:8080/auth/register", data);
      swal("SUCCESSFULLY REGISTERED");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        swal('Email already exists. Please use a different email.');
      } else {
        swal('Registration failed. Please try again.');
      }
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
        <h2 style={{ textAlign: "center", color: "green", marginBottom: "20px" }}></h2>
        
        <div className="form-group" style={{ marginBottom: "30px" }}>
          <label htmlFor="name" style={{ color: "green", fontSize: "20px" }}>Campany Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ height: "50px", fontSize: "18px" }}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: "30px" }}>
          <label htmlFor="email" style={{ color: "green", fontSize: "20px" }}>Campany Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            style={{ height: "50px", fontSize: "18px" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "30px" }}>
          <label htmlFor="role" style={{ color: "green", fontSize: "20px" }}>Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={role}
            readOnly
            style={{ height: "50px", fontSize: "18px", backgroundColor: "#e9ecef", color: "#6c757d" }}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100" 
          style={{ height: "50px", fontSize: "20px" }}
        >
          Next
        </button>
      </form>
    </div>
  );
}
