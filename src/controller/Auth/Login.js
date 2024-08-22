import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/auth/login', data);
      setErrorMessage('');
      const token = response.data.access_token;
      localStorage.setItem('token', token);

      if (data.rolename === 'admin') {
        navigate('/contentdashbord');
      } else {
        navigate('/userdashboard');
      }

    } catch (error) {
      console.error('There was an error submitting the form!', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Login failed: Incorrect username or password.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container-fluid p-3">
      {/* Header section */}
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded">
        <h1 className="mb-0">Welcome</h1>
        <div>
          <Button variant="primary" className="me-2">
            <Link to="/userlogin" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          </Button>
          <Button variant="primary">
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </Button>
        </div>
      </header>

      {/* Form section */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow">
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
