import React from 'react';
import Register from './controller/Client/User/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './controller/Admin/user/userList';
import UserLogin from './controller/Client/User/UserLogin';
import HomePage from './controller/HomePage/homePage';
import UserDashBord from './controller/Client/User/UserDashBord';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/userList' element={<UserList />}/>
          <Route path='/userlogin' element={<UserLogin />}/>
          <Route path='/userdashbord' element={<UserDashBord />}/>
          
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
