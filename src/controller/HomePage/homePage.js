import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='back'>
      <div style={{ display: "flex", flexDirection: "row"}}>
        <h1 className='wellcome' style={{textAlign:"center", justifyContent:"center", margin:"150px 0px 0px 150px" }}><h1 style={{fontSize:"100px"}}>Welcome</h1></h1>

        <div style={{ display: "flex", flexDirection: "row", margin:"5",
          padding:"0px"
        }}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="register-dropdown">
              Login
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/userlogin">User</Dropdown.Item>
              <Dropdown>
                 <Dropdown.Item as={Link} to="/contentlogin">Admin</Dropdown.Item>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>

          {/* Login Dropdown */}
          
          {/* <Dropdown style={{ marginLeft: '10px' }}>
            <Dropdown.Toggle variant="secondary" id="admin-options-dropdown">
              Admin Options
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/adminregister">Register Admin</Dropdown.Item>
              <Dropdown.Item as={Link} to="/adminlogin">Login Admin</Dropdown.Item>
              <Dropdown.Divider /> */}
              {/* Nested Dropdown */}


              {/* <Dropdown>
                <Dropdown.Toggle variant="secondary" id="more-options-dropdown">
                  More Options
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/adminsettings">Settings</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/adminreports">Reports</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown> */}
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
