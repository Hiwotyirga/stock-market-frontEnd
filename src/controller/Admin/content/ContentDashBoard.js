import React, { useState } from 'react';
import '../../../App.css';

function ContentDashBoard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          backgroundColor: '#90A4AE', // Previous background color
          width: isOpen ? '200px' : '70px',
          transition: 'width 0.3s',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isOpen ? 'flex-start' : 'center',
        }}
      >
        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: '#fff', padding: '10px' }}>
          ☰
        </button>
        <nav style={{ width: '100%' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#home"></use>
              </svg>
              {isOpen && <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('Home')}>Home</a>}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#useradmin"></use>
              </svg>
              {isOpen && <a href="#" style={{ marginLeft: '10px', color: '#fff' } } onClick={() => handleTabClick('Search')}>User Admin</a>}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#contentadmin"></use>
              </svg>
              {isOpen && <a href="#" style={{ marginLeft: '10px', color: '#fff' }}>Content Admin</a>}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#search"></use>
              </svg>
              {isOpen && <a href="#" style={{ marginLeft: '10px', color: '#fff' }}>Search</a>}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#map"></use>
              </svg>
              {isOpen && <a href="#" style={{ marginLeft: '10px', color: '#fff' }}>Map</a>}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#planner"></use>
              </svg>
              {isOpen && <a href="#" style={{ marginLeft: '10px', color: '#fff' }}>Planner</a>}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#settings"></use>
              </svg>
              {isOpen && <a href="#" style={{ marginLeft: '10px', color: '#fff' }}>Settings</a>}
            </li>
          </ul>
        </nav>
      </div>
      {/* <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Welcome to the Dashboard</h1>
      </div> */}
      <div style={{ marginLeft: '20px', padding: '20px', flex: 1 }}>
        {activeTab === 'Home' && <h1>Hello Home</h1>}
        {activeTab === 'Search' && <h1>Hello Search</h1>}
        {activeTab === 'Map' && <h1>Hello Map</h1>}
        {activeTab === 'Planner' && <h1>Hello Planner</h1>}
      </div>
    </div>
  );
}

export default ContentDashBoard;
