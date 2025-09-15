import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import DashboardModal from '../components/DashboardModal';
import ResourcesModal from '../components/ResourcesModal'; // Import the ResourcesModal component

function StudentPortal() {
  const [messages, setMessages] = useState([
    {
      text: "Namaste! Welcome to MannMitra. I'm here to listen. How are you feeling today?",
      sender: 'bot'
    }
  ]);

  // State to manage the Dashboard modal's visibility
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // New state to manage the Resources modal's visibility
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const handleSendMessage = (userMessage) => {
    setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "Thanks for sharing. Can you tell me more?", sender: 'bot' }]);
    }, 1000);
  };
  
  // Function to open the Resources modal
  const handleShowResources = () => {
    setIsResourcesOpen(true);
  };
  
  // Function to close the Resources modal
  const handleCloseResources = () => {
    setIsResourcesOpen(false);
  };

  return (
    <div className="app-container">
      <Header onViewDashboardClick={() => setIsDashboardOpen(true)} />
      
      <main className="main-content">
        <div className="content-grid">
          <Sidebar />
          {/* Pass the new handleShowResources function as a prop */}
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onShowResources={handleShowResources} 
          />
        </div>
      </main>

      <DashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
      />

      {/* Render the ResourcesModal and connect it to its state */}
      <ResourcesModal
        isOpen={isResourcesOpen}
        onClose={handleCloseResources}
      />
    </div>
  );
}

export default StudentPortal;