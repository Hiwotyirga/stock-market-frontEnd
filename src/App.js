import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './controller/Admin/userList';
import Login from './controller/Auth/Login';
import HomePage from './controller/HomePage/homePage';
import ContentDashBoard from './controller/HomePage/ContentDashBoard';
import UserDashBoard from './controller/HomePage/UserDashBord';
// import FileList from './controller/Admin/content/News/fileLIst';
import StockNews from './controller/Client/StockNews';
import Register from './controller/Auth/register';
import NewsPost from './controller/News/newsPost';
import Logout from './controller/Auth/logout';

function App() {
  const stockTicker = 'IBM';
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/userdashboard' element={<UserDashBoard />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/newspost' element={<NewsPost />}/>
          <Route path='/userList' element={<UserList />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/userlogin' element={<Login />}/>
          <Route path='/contentdashbord' element={<ContentDashBoard />}/>
          <Route path='/' element={<HomePage />}/>
          <Route path='/stocknews' element={<StockNews />} />
          {/* <Route path='/filelist' element={<FileList />}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
