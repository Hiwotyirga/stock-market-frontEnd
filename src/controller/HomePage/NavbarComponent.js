import React from 'react';
import { Link,  useLocation  } from 'react-router-dom';
import './NavbarComponent.css'; // Import custom CSS
// import LatestNews from './LatestNews';
import StockNews from '../Client/StockNews';
import News from '../pages/News';

const NavbarComponent = () => {
  const location = useLocation();
  return (
   <div>
     <nav className="navbar">
      <div className="navbar-container">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-button">🔍</button>
        </div>

        {/* Menu */}
        <ul className="navbar-nav">
            <li className={`nav-item ${location.pathname === '/latestnews' ? 'active' : ''}`}>
              <Link to='/latestnews'>Latest News</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/stocks/overview' ? 'active' : ''}`}>
              <Link to="/stocks/overview">Stocks</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/watchlist' ? 'active' : ''}`}>
              <Link to="/watchlist">Watchlist</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/analysis' ? 'active' : ''}`}>
              <Link to="/analysis">Analysis</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/trading' ? 'active' : ''}`}>
              <Link to="/trading">Trading</Link>
            </li>
          </ul>
      </div>
    </nav>

    {/* <LatestNews /> */}
    <News/>
   </div>
  );
};

export default NavbarComponent;
