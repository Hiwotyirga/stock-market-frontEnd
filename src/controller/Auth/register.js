import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); 
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
      swal("SUCCESSFULLY REGISTER");
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
    <div className="container-fluid p-3 " style={{ 
      backgroundImage: `url('/6c741c60bf84723ea1184eaf5bb19c59.jpg')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      width:"1330px",
      marginRight:"0px"
      
      
    }}>
      <div className="d-flex justify-content-start align-items-center" style={{ height: '100%' }}>
        <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow" style={{ width: '430px', height:"100%" }}>
          <div className="form-group" style={{marginTop:"10px",marginBottom:"40px"}}>
            <label htmlFor="name" style={{color:"green", fontSize:"25px"}}>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{height:"70px", color:"black", fontSize:"20px"}}
            />
          </div>
          <div className="form-group mb-3" style={{color:"green", fontSize:"25px", marginBottom:"40px"}}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{height:"70px", color:"black", fontSize:"20px"}}
            />
          </div>
          <div className="form-group" style={{color:"green", fontSize:"25px", marginBottom:"40px"}}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{height:"70px", color:"black", fontSize:"20px"}}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ marginBottom: "50px",height:"70px", color:"black", fontSize:"25px" }}>Register</button>
          <p style={{fontSize:"20px"}}>If you have an account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
