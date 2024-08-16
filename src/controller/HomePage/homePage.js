import React from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='back'><h1 className='wellcome'>Wellcome</h1>
    <div><img src='assert\istockphoto-1496154102-1024x1024.jpg' alt=''/></div>
        <div>
          <button><Link to="/adminregister">Admin Page</Link></button><button><Link to="/register"> User Page</Link></button>
        </div>
    </div>
  )
}

export default HomePage