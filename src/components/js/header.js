import React from 'react';
import '../css/header.css';


function Header() {
  return (
    <div className="header">
            <a href='/'>Image Viewer</a>
            <a className='Home' href='/'>Home</a>
    </div>
  );
}

export default Header;