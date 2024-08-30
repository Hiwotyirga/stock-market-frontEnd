import React from 'react';
import { BrowserRouter as Router, Route, Routes,  Redirect  } from 'react-router-dom';
import UserList from './controller/Admin/userList';
import Login from './controller/Auth/Login';
import ContentDashBoard from './controller/HomePage/ContentDashBoard';
import StockNews from './controller/Client/StockNews';
import Register from './controller/Auth/register';
import NewsPost from './controller/News/newsPost';
import Logout from './controller/Auth/logout';
import NavbarComponent from './controller/HomePage/NavbarComponent';
import ImagePost from './controller/Admin/News/imagePost';
import ImageList from './controller/Admin/News/imageList';
import Stocks from './controller/pages/stocks';
import Analysis from './controller/pages/analysis';
import WatchList from './controller/pages/watchlist';
import Trading from './controller/pages/trading';
import LatestNews from './controller/pages/latestnews';
import FileDetail from './controller/Admin/News/FileDetail';

function App() {
  const stockTicker = 'IBM';
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/register' element={<Register />} />
          {/* <Route path='/newspost' element={<NewsPost />}/> */}
          <Route path='/userList' element={<UserList />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/stock-admin' element={<Login />}/>
          <Route path='/contentdashbord' element={<ContentDashBoard />}/>
          <Route path='/stocknews' element={<StockNews />} />
          <Route path="/file/:id" component={FileDetail} />
          <Route path='' element={<NavbarComponent/>}/>
          <Route path='/latestnews' element={<LatestNews />}/>
          <Route path='/uploadFile' element={<ImagePost />}/>
          <Route path='/imageList' element={<ImageList />}/>
          <Route path='/stocks/overview' element={<Stocks />}/>
          <Route path='/analysis' element={<Analysis />}/>
          <Route path='/watchlist' element={<WatchList />}/>
          <Route path='/trading' element={<Trading />}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
