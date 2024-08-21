import React, { useState } from 'react';
import '../../../App.css';
import StockNews from '../../Client/User/StockNews';
import FilePost from './News/filePost';

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
          backgroundColor: '#90A4AE', // Sidebar background color
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
              {isOpen && (
                <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('Home')}>
                  Home
                </a>
              )}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#useradmin"></use>
              </svg>
              {isOpen && (
                <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('User Admin')}>
                  User Admin
                </a>
              )}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#contentadmin"></use>
              </svg>
              {isOpen && (
                <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('Content Admin')}>
                  Content Admin
                </a>
              )}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#search"></use>
              </svg>
              {isOpen && (
                <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('Search')}>
                  Search
                </a>
              )}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#map"></use>
              </svg>
              {isOpen && (
                <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('File')}>
                  File
                </a>
              )}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#planner"></use>
              </svg>
              {isOpen && (
                <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('Planner')}>
                  Planner
                </a>
              )}
            </li>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
                <use xlinkHref="#settings"></use>
              </svg>
              {isOpen && (
                <a href="#" style={{ marginLeft: '10px', color: '#fff' }} onClick={() => handleTabClick('Settings')}>
                  Settings
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ marginLeft: '20px', padding: '20px', flex: 1 }}>
        {activeTab === 'Home' && <h1>Home</h1>}
        {activeTab === 'User Admin' && <h1>Hello User Admin</h1>}
        {activeTab === 'Content Admin' && <h1>Hello Content Admin</h1>}
        {activeTab === 'Search' && <h1>Hello Search</h1>}
        {activeTab === 'File' && <FilePost />}
        {activeTab === 'Planner' && <h1>Hello Planner</h1>}
        {activeTab === 'Settings' && <h1>Hello Settings</h1>}
      </div>
    </div>
  );
}

export default ContentDashBoard;
