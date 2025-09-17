import React from 'react';
import '../App.css'; // Ensure you have the styles defined in App.css
import logo from '../assets/MannMitra.png';
function Header({ onViewDashboardClick, userType = 'student' }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          {/* Logo directly from public/ */}
          <img src={logo} alt="MannMitra Logo" className="logo-img" />
          <h1 className="logo-text">MannMitra</h1>
        </div>

        {userType === 'student' && (
          <button className="header-button" onClick={onViewDashboardClick}>
            View My Dashboard
          </button>
  
        )}
      </div>
    </header>
  );
}

export default Header;
