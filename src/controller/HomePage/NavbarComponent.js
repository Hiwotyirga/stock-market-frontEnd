import React from 'react';
import { Link,  useLocation  } from 'react-router-dom';
import './NavbarComponent.css'; 
import StockNews from '../Client/StockNews';
import MediaPage from '../pages/News/News';
import StockMarketList from '../pages/Stock/StockMarketList';
import { SubscribeRegister } from '../Subscribe/SubscribeRegister';

const NavbarComponent = () => {
  const location = useLocation();
  return (
   <div>
     <nav className="navbar">
      <div className="navbar-container">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-button">🔍</button>
        </div>
        <ul className="navbar-nav">
            <li className={`nav-item ${location.pathname === '/latestnews' ? 'active' : ''}`}>
              <Link to='/latestnews'>Latest News</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/stocks/overview' ? 'active' : ''}`}>
              <Link to="/stocks/overview">Stocks</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/payment' ? 'active' : ''}`}>
              <Link to="/payment">Subscribe</Link>
            </li>
            {/* <li className={`nav-item ${location.pathname === '/analysis' ? 'active' : ''}`}>
              <Link to="/analysis">Analysis</Link>
            </li> */}
            <li className={`nav-item ${location.pathname === '/trading' ? 'active' : ''}`}>
              <Link to="/trading">Trading</Link>
            </li>
          </ul>
      </div>
    </nav>
    {/* <StockMarketList/> */}
    <MediaPage />
   </div>
  );
};

export default NavbarComponent;
