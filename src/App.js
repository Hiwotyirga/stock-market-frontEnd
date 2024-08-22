import React from 'react';
import Register from './controller/Client/User/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './controller/Admin/user/userList';
import UserLogin from './controller/Client/User/UserLogin';
import HomePage from './controller/HomePage/homePage';
// import UserDashBord from './controller/Client/User/UserDashBord';
// import AdminDashBord from './controller/Admin/user/AdminDashBord';
// import AdminLogin from './controller/Admin/user/AdminLogin';
// import AdminRegister from './controller/Admin/user/AdminRegister';
import ContentLogin from './controller/Admin/content/contentLogin';
import ContentRegister from './controller/Admin/content/ContentRegister';
// import ContentRegister from './controller/Admin/content/contentRegister';
import Role from './controller/Admin/content/Role';
import ContentDashBoard from './controller/Admin/content/ContentDashBoard';
import StockNews from './controller/Client/User/StockNews';
import UserDashBoard from './controller/Client/User/UserDashBord';
import FileList from './controller/Admin/content/News/fileLIst';

function App() {
  const stockTicker = 'IBM';
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/userdashboard' element={<UserDashBoard />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/userList' element={<UserList />}/>
          <Route path='/userlogin' element={<UserLogin />}/>
          <Route path='/contentdashbord' element={<ContentDashBoard />}/>
          <Route path='/' element={<HomePage />}/>
          <Route path='/adminlogin' element={ <ContentLogin />}/>
          <Route path='/admiregister' element={<ContentRegister />}/>
          <Route path='/role' element={<Role />}/>
          <Route path='/contentlogin' element={<ContentLogin />}/>
          {/* <Route path='/stocknews' element={<StockNews ticker={stockTicker} />} /> */}
          <Route path='/stocknews' element={<StockNews />} />
          <Route path='/filelist' element={<FileList />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
