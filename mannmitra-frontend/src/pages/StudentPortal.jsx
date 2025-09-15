import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import DashboardModal from '../components/DashboardModal'; // We will create this new component

function StudentPortal() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const openDashboard = () => {
    setIsDashboardOpen(true);
  };

  const closeDashboard = () => {
    setIsDashboardOpen(false);
  };

  return (
    <div className="app-container">
      {/* Pass the state-setting function to the Header */}
      <Header onViewDashboardClick={openDashboard} /> 
      <main className="main-content">
        <div className="content-grid">
          <Sidebar />
          <ChatInterface />
        </div>
      </main>
      
      {/* Conditionally render the DashboardModal based on state */}
      <DashboardModal isOpen={isDashboardOpen} onClose={closeDashboard} />
    </div>
  );
}

export default StudentPortal;