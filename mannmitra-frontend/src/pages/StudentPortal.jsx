import React, { useState } from 'react'; // 1. Import useState
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import DashboardModal from '../components/DashboardModal'; // 2. Import the modal component

function StudentPortal() {
  const [messages, setMessages] = useState([
    {
      text: "Namaste! Welcome to MannMitra. I'm here to listen. How are you feeling today?",
      sender: 'bot'
    }
  ]);

  // 3. Add state to manage the modal's visibility
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleSendMessage = (userMessage) => {
    setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "Thanks for sharing. Can you tell me more?", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="app-container">
      {/* 4. Pass the function to open the modal as a prop to the Header */}
      <Header onViewDashboardClick={() => setIsDashboardOpen(true)} />
      
      <main className="main-content">
        <div className="content-grid">
          <Sidebar />
          <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
        </div>
      </main>

      {/* 5. Render the modal and connect it to the state */}
      <DashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
      />
    </div>
  );
}

export default StudentPortal;