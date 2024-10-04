import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// Assuming you have the Role enum defined in a separate file
// import { Role } from './path-to-your-role-enum-file';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState(''); // Store user role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = { name, password };
  
    try {
        const response = await axios.post('http://localhost:8080/auth/login', data);
        const token = response.data.access_token;
        const role = response.data.role;  // Ensure you get the role from the response
  
        localStorage.setItem('jwt', token);
  
        console.log("Role:", role);  // Debugging: Check the role
        // navigate('/contentdashbord');
        navigate('/user');
        // Navigate based on role
        // switch(role) {
        //     case 'Admin':
        //         navigate('/contentdashbord');
        //         break;
        //     case 'User':
        //         navigate('/user');
        //         break;
        //     default:
        //         swal('Unknown role detected.');
        //         break;
        // }
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
    <div className="container-fluid p-3">
      {/* Header section */}
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded" style={{ margin: "-28px" }}>
        <h1 className="mb-0">Welcome</h1>
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
          <button type="submit" className="btn btn-primary w-100" style={{ marginBottom: "15px" }}>Login</button>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
