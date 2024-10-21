import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './userlist.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/users');
        const data = await response.json();
        
        // Log the data to verify its structure
        console.log('Fetched users:', data);
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setUsers(data); // Set users as the array
        } else {
          console.error('Fetched data is not an array:', data);
          setUsers([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        swal('Error fetching users. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`); 
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (response.status === 200) {
        swal('User deleted successfully.');
        setUsers(users.filter(user => user.id !== id));
      } else {
        swal('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      swal('Error deleting user. Please try again.');
    }
  };

  return (
    <div className="container" style={{ fontSize: "15px" }}>
      <main className="main-content">
        <div className="header">
          <button className="btn-primary">
            <Link to='/adduser' style={{ color: 'white' }}>Add User</Link>
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No users available</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span
                        style={{ marginRight: "20px", cursor: "pointer" }}
                        onClick={() => handleEdit(user.id)} 
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span
                        className="action-icon"
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UserList;
