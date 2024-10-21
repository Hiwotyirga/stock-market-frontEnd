import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';   
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = { name, password };
  
    try {
        const response = await axios.post('http://localhost:8080/auth/login', data);
        const token = response.data.access_token;
        const role = response.data.role;
  
        localStorage.setItem('jwt', token);
  
        console.log("Role:", role); 

        if(role === 'User'){
          navigate('/user');
        } else {
          navigate('/contentdashbord');
        }

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
      className="container-fluid p-0" 
      style={{ 
        backgroundImage: `url('/6c741c60bf84723ea1184eaf5bb19c59.jpg')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh' 
        
      }}
    >  
      <div className="d-flex justify-content-start align-items-center" style={{ height: '100%' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow" style={{ width: '450px', height:"90%" }}>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="form-group mb-3" >
            <label htmlFor="name" style={{color:"green", fontSize:"25px"}}>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{height:"70px", color:"black", fontSize:"25px"}}
            />
          </div>
          <div className="form-group " style={{marginBottom:"50px"}}>
            <label htmlFor="exampleInputPassword1" style={{color:"green", fontSize:"25px"}}>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{height:"70px", color:"black", fontSize:"25px"}}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ marginBottom: "50px",height:"70px", color:"black", fontSize:"25px" }}>Login</button>
          <p style={{fontSize:"20px"}}>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
