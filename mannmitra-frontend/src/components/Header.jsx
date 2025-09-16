import React from 'react';

function Header({ onViewDashboardClick, userType = 'student' }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <svg xmlns="http://www.w3.org/2000/svg" className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 0-9.67 11.23A4 4 0 0 0 2.5 18a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2 4 4 0 0 0 .17-4.77A10 10 0 0 0 12 2z"/>
            <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0z"/>
            <path d="M12 16v-4"/>
          </svg>
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