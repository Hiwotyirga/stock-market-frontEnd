// src/Auth/Logout.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No token found in localStorage.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/auth/logout', // Adjust the URL if needed
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is correctly formatted
          },
        }
      );
      localStorage.removeItem('jwt'); // Clear JWT from localStorage
      navigate('/stock-admin'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Button variant="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
