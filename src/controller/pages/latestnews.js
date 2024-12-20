import React from 'react'
import { Link } from 'react-router-dom'
// import News from './News'
import MediaPage  from './News/News'


function LatestNews() {
  
    return (
        <div> <nav className="navbar">
        <div className="navbar-container">
          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-button">🔍</button>
          </div>
    
          <ul className="navbar-nav">
            <li className="nav-item active">
            <Link to='/latestnews'>Latest News</Link>
            </li>
            <li className="nav-item">
              <Link to="/stocks/overview">Stocks</Link>
            </li>
            <li className="nav-item">
            <Link to="/subscribe">Subscribe</Link>
            </li>
            <li className="nav-item">
              <Link to="/analysis">Analysis</Link>
            </li>
            <li className="nav-item">
              <Link to="/trading">Trading</Link>
            </li>
          </ul>
        </div>
      </nav>
    
      {/* <News />
       */}

       <MediaPage />
     </div>
        // </div>
  )
}

export default LatestNews