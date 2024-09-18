import React from 'react'
import { Link } from 'react-router-dom'

import StockMarketList from './StockMarketList'

function Stocks
() {
  return (
    <div> <nav className="navbar">
    <div className="navbar-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-button">🔍</button>
      </div>

      {/* Menu */}
      <ul className="navbar-nav">
        <li className="nav-item active">
        <Link to='/latestnews'>Latest News</Link>
        </li>
        <li className="nav-item">
          <Link to="/stocks/overview">Stocks</Link>
        </li>
        <li className="nav-item">
          <Link to="/watchlist">Watchlist</Link>
        </li>
       
        <li className="nav-item">
          <Link to="/trading">Trading</Link>
        </li>
      </ul>
    </div>
  </nav>

   {/* <StockMarketList /> */}
 
 </div>
  )
}

export default Stocks
