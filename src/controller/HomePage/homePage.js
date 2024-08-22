import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="container-fluid p-4 bg-secondary text-white">
      {/* Row layout for header with Welcome, Login, and Signup */}
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="m-0">Welcome</h1>
        <div>
          <Button variant="primary" className="me-2">
            <Link to="/userlogin" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          </Button>
          
          <Button variant="primary">
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
