import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import DashboardModal from '../components/DashboardModal';
import BookingModal from '../components/BookingModal';
import ResourcesModal from '../components/ResourcesModal'; // Import all necessary modals

function StudentPortal() {
  // --- State Management for all features ---
  const [messages, setMessages] = useState([
    { text: "Namaste! Welcome to MannMitra...", sender: 'bot' }
  ]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false); // State for the new Resources modal

  const [activityData, setActivityData] = useState({
    labels: ['Chat Sessions', 'Resources Viewed', 'Peer Forum', 'Meetings Booked'],
    datasets: [{ data: [60, 25, 15, 0], backgroundColor: ['#2563eb', '#ec4899', '#8b5cf6', '#16a34a'], hoverOffset: 4 }]
  });
  const [recentActivities, setRecentActivities] = useState([
    { type: 'Chat with MannMitra:', details: 'Discussed exam anxiety.' },
    { type: 'Resource Viewed:', details: '"10-Minute Guided Meditation" audio.' },
    { type: 'Peer Forum Post:', details: '"Best tips to stay motivated."' }
  ]);

  // --- Event Handlers for all features ---
  const handleSendMessage = (userMessage) => {
    setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "Thanks for sharing. Can you tell me more?", sender: 'bot' }]);
    }, 1000);
  };
  
  const handleMeetingBooked = (bookingDetails) => {
    const newActivity = {
      type: 'Meeting Booked:',
      details: `Session on ${bookingDetails.date} at ${bookingDetails.time}`
    };
    setRecentActivities(prevActivities => [newActivity, ...prevActivities]);
    setActivityData(prevData => {
      const newData = [...prevData.datasets[0].data];
      newData[3] += 1; // Increment the 'Meetings Booked' slice
      return {
        ...prevData,
        datasets: [{ ...prevData.datasets[0], data: newData }]
      };
    });
  };

  return (
    <div className="app-container">
      <Header onViewDashboardClick={() => setIsDashboardOpen(true)} />
      <main className="main-content">
        <div className="content-grid">
          <Sidebar onBookCounselorClick={() => setIsBookingOpen(true)} />
          {/* Pass the onShowResources function to the ChatInterface */}
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onShowResources={() => setIsResourcesOpen(true)} 
          />
        </div>
      </main>
      
      {/* Render all three modals */}
      <DashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)}
        activityData={activityData}
        recentActivities={recentActivities}
      />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        onMeetingBooked={handleMeetingBooked}
      />

      <ResourcesModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />
    </div>
  );
}

export default StudentPortal;