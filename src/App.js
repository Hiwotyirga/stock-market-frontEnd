import React from 'react';
import Register from './controller/Client/User/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './controller/Admin/user/userList';
import UserLogin from './controller/Client/User/UserLogin';
import HomePage from './controller/HomePage/homePage';
import UserDashBord from './controller/Client/User/UserDashBord';
import AdminDashBord from './controller/Admin/user/AdminDashBord';
import AdminLogin from './controller/Admin/user/AdminLogin';
import AdminRegister from './controller/Admin/user/AdminRegister';
import ContentLogin from './controller/Admin/content/contentLogin';
// import ContentRegister from './controller/Admin/content/ContentRegister';
import ContentRegister from './controller/Admin/content/contentRegister';
import Role from './controller/Admin/content/Role';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/userList' element={<UserList />}/>
          <Route path='/userlogin' element={<UserLogin />}/>
          <Route path='/userdashbord' element={<UserDashBord />}/>
          <Route path='/admindashbord' element={<AdminDashBord  />}/>
          <Route path='/' element={<HomePage />}/>
          <Route path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/adminuserlogin' element={<AdminRegister />}/>
          <Route path='/admincontentlogin' element={ <ContentLogin />}/>
          {/* <Route path='/adminuserregister' element={<ContentRegister />}/> */}
          <Route path='/adminuserregister' element={<ContentRegister />}/>
          <Route path='/role' element={<Role />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
