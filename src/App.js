import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import UserList from "./controller/Admin/User/userList";
import Login from "./controller/Auth/Login";
import ContentDashBoard from "./controller/HomePage/ContentDashBoard";
import StockNews from "./controller/Client/StockNews";
import Register from "./controller/Auth/register";
import Logout from "./controller/Auth/logout";
import NavbarComponent from "./controller/HomePage/NavbarComponent";
import ImagePost from "./controller/Admin/News/imagePost";
import ImageList from "./controller/Admin/News/imageList";
import Stocks from "./controller/pages/stocks";
import Analysis from "./controller/pages/analysis";
import WatchList from "./controller/pages/watchlist";
import LatestNews from "./controller/pages/latestnews";
import FileDetail from "./controller/Admin/News/FileDetail";
import MediaDetail from "./controller/pages/MediaDetail";
import UserEdit from "./controller/Admin/User/updateUser";
import LocalStockList from "./controller/Admin/StockList/LocalStock/Get";
import LocalStock from "./controller/Admin/StockList/LocalStock/TopGainersPost";
import TopLosersPOst from "./controller/Admin/StockList/LocalStock/TopLosersPOst";
import MostActivelyTradedPost from "./controller/Admin/StockList/LocalStock/MostActivelyTradedPost";
import TopGainersGet from "./controller/Admin/StockList/LocalStock/TopGainersGet";
import MostActivelyTradedGet from "./controller/Admin/StockList/LocalStock/MostActivelyTradedGet";
import TopGainersPost from "./controller/Admin/StockList/LocalStock/TopGainersPost";
import TopLosersGet from "./controller/Admin/StockList/LocalStock/TopLosersGet";
import EditUser from "./controller/Admin/User/updateUser";
import EditGainer from "./controller/Admin/StockList/UpdateLocalStock/TopGainersPut";
import Trading from "./controller/pages/Trade/trading";
import TransactionForm from "./controller/pages/TransactionData/post";
import MostActivelyTradedPut from "./controller/Admin/StockList/UpdateLocalStock/MostActiveTradePut";
import EditLooser from "./controller/Admin/StockList/UpdateLocalStock/TopLosersPut";
import MostActivelyTradedUpdate from "./controller/Admin/StockList/UpdateLocalStock/MostActiveTradePut";
import AddAdmin from "./controller/Admin/User/addUser";
function App() {
  const stockTicker = "IBM";
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/adduser" element={<AddAdmin />}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="" element={<Login />} />
          <Route path="/contentdashbord" element={<ContentDashBoard />} />
          <Route path="/stocknews" element={<StockNews />} />
          <Route path="/file/:id" component={FileDetail} />
          <Route path="/user" element={<NavbarComponent />} />
          <Route path="/latestnews" element={<LatestNews />} />
          <Route path="/uploadFile" element={<ImagePost />} />
          <Route path="/imageList" element={<ImageList />} />
          <Route path="/stocks/overview" element={<Stocks />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/media/:id" element={<MediaDetail />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/toploser" element={< TopLosersPOst/>}/>
          <Route path="/watchlist" element={<WatchList />} />

          <Route path="/trading" element={<Trading/>} />
          <Route path="/topGainer" element={< TopGainersPost/>}/>
          <Route path="/activetrade" element={<MostActivelyTradedPost/>}/>
          <Route path="/edituser" element={<UserEdit />} />
          <Route path="/editgain/:id" element={<EditGainer />} />
          <Route path="/editloser/:id" element={<EditLooser />} />
          <Route path="/most-actively-traded/:id" element={<MostActivelyTradedPut />} /> 
          <Route path="/localstocklist" element={<LocalStockList />} />
          <Route path="/looser/get" element={<TopLosersGet/>}/>
          <Route path="/gain/get" element={<TopGainersGet/>}/>
          <Route path="/active/get" element={<MostActivelyTradedGet/>}/>
          <Route path="/transaction" element={<TransactionForm />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
