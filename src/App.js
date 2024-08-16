import React from 'react';
import Register from './controller/Client/User/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './controller/Admin/user/userList';
import UserLogin from './controller/Client/User/UserLogin';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/userList' element={<UserList />}/>
          <Route path='/userLogin' element={<UserLogin />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
