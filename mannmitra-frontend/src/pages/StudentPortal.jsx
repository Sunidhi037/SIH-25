import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface'; // Re-import the component

function StudentPortal() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="content-grid">
          <Sidebar />
          <ChatInterface /> {/* Use the real component again */}
        </div>
      </main>
    </div>
  );
}

export default StudentPortal;