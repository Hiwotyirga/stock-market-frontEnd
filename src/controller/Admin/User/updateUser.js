import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';

function UserEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/register/${id}`);
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        // Password is typically not pre-filled for security reasons
      } catch (error) {
        console.error('Error fetching user data:', error);
        swal('Failed to fetch user data. Please try again later.');
      }
    };

    fetchUserData();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !email || !role) {
      setErrorMessage('Name, email, and role are required.');
      return;
    }

    const data = { name, email, password, role };

    try {
      const response = await axios.put(`http://localhost:8080/register/${id}`, data);
      swal("Successfully updated");
      navigate('/contentdashbord');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        swal('Email already exists. Please use a different email.');
      } else {
        swal('Update failed. Please try again.');
      }
    }
  };

  return (
    <div className="container-fluid p-3">
      {/* Header section */}
      <header className="d-flex justify-content-between align-items-center bg-secondary text-white p-2 rounded mb-3">
        {/* Optionally, add a header title or navigation buttons */}
      </header>

      {/* Registration form */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <form onSubmit={handleEdit} className="border p-4 bg-light rounded shadow" style={{ width: '300px', height: 'auto' }}>
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
            <label htmlFor="password">Password (leave blank if unchanged)</label>
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
              <option value="admin">Admin</option>
              <option value="user">Content</option>
              {/* Add more roles as needed */}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UserEdit;
