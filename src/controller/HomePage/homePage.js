import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='back'>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className='wellcome'>Welcome</h1>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft:"500px"}}>
          {/* Register Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="register-dropdown">
              Register
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/userregister">User</Dropdown.Item>
              {/* Admin Nested Dropdown */}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="register-admin-dropdown">
                  Admin
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/adminuserregister">User Admin</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admincontentregister">Content Admin</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>

          {/* Login Dropdown */}
          <Dropdown style={{ marginLeft: '10px' }}>
            <Dropdown.Toggle variant="secondary" id="login-dropdown">
              Login
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/userlogin">User</Dropdown.Item>
              {/* Admin Nested Dropdown */}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="login-admin-dropdown">
                  Admin
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/adminuserlogin">User Admin</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admincontentlogin">Content Admin</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="photo-circle">
          <span>Photo</span>
        </div>
      </div>

      <div>
        {/* <img src={('../../assets/istockphoto-1496154102-1024x1024.jpg')} alt='Homepage visual' /> */}
      </div>

      <div>
        {/* <button><Link to="/adminregister">Admin Page</Link></button>
        <button><Link to="/register">User Page</Link></button> */}
      </div>
    </div>
  );
}

export default HomePage;
