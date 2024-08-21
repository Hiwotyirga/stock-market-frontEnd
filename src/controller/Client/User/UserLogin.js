import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserLogin() {
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
      localStorage.setItem('token', token); // Save the token in localStorage

      // Navigate to the user dashboard
      navigate('/userdashboard');
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
    <div className='body'>
      <div className='App'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              className='form-control'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='form-control'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className='form-group'>
            <button type='submit'>Login</button>
          </div>
          <button><Link to='/register' style={{ color: 'black' }}>Register</Link></button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
