import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Subscriber.css'; 
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function SubscriberList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchsubscribers = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/subscribers', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });
        const data = await response.json();

        console.log('Fetchedsubscribers:', data);
        
        if (Array.isArray(data)) {
          setUsers(data); 
        } else {
          console.error('Fetched data is not an array:', data);
          setUsers([]); 
        }
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        swal('Error fetching subscribers. Please try again.');
      }
    };

    fetchsubscribers();
  }, []);


  return (
    <div className="container" style={{ fontSize: "15px" }}>
      <main className="main-content">
        <div className="header">
          {/* <button className="btn-primary"> */}
            {/* <Link to='/adduser' style={{ color: 'white' }}>Add User</Link> */}
          {/* </button> */}
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
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
                    <td>
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

export default SubscriberList;
