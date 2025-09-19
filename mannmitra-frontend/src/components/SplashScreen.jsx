import React from 'react';
import './SplashScreen.css'; // You'll create this CSS file next
import logo from '../assets/MannMitra.png'; // Make sure the path to your logo is correct

function SplashScreen() {
  return (
    <div className="splash-screen-container">
      <img src={logo} alt="MannMitra Logo" className="splash-logo" />
    </div>
  );
}

export default SplashScreen;