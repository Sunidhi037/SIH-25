import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import DashboardModal from '../components/DashboardModal';
import BookingModal from '../components/BookingModal';
import PeerForumModal from '../components/PeerForumModal';
import ResourcesModal from '../components/ResourcesModal';

// It now receives 'onBookMeeting' from App.jsx
function StudentPortal({ meetings, onBookMeeting }) {
  const [messages, setMessages] = useState([ { text: "Namaste! Welcome...", sender: 'bot' } ]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPeerForumOpen, setIsPeerForumOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // The dashboard state now correctly counts the meetings from props
  const [activityData, setActivityData] = useState({
    labels: ['Chat Sessions', 'Resources Viewed', 'Peer Forum', 'Meetings Booked'],
    datasets: [{ data: [60, 25, 15, meetings.length], backgroundColor: ['#2563eb', '#ec4899', '#8b5cf6', '#16a34a'], hoverOffset: 4 }]
  });
  const [recentActivities, setRecentActivities] = useState([ { type: 'Chat with MannMitra:', details: 'Discussed exam anxiety.' } ]);

  const handleSendMessage = (userMessage) => { /* ... */ };
  
  const handleMeetingBooked = (bookingDetails) => {
    // Call the function from App.jsx to update the shared list
    onBookMeeting(bookingDetails);

    // Update the local dashboard state
    const newActivity = { type: 'Meeting Booked:', details: `Session on ${bookingDetails.date} at ${bookingDetails.time}` };
    setRecentActivities(prev => [newActivity, ...prev]);
    setActivityData(prev => {
      const newData = [...prev.datasets[0].data];
      newData[3] += 1;
      return { ...prev, datasets: [{ ...prev.datasets[0], data: newData }] };
    });
  };

  return (
    <div className="app-container">
      {/* This line tells the Header to show the student version */}
      <Header onViewDashboardClick={() => setIsDashboardOpen(true)} userType="student" />
      <main className="main-content">
        <div className="content-grid">
          <Sidebar onBookCounselorClick={() => setIsBookingOpen(true)} />
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onShowPeerForum={() => setIsPeerForumOpen(true)} 
            onShowResources={() => setIsResourcesOpen(true)} 
          />
        </div>
      </main>
      
      <DashboardModal isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} activityData={activityData} recentActivities={recentActivities} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} onMeetingBooked={handleMeetingBooked} />
      <PeerForumModal isOpen={isPeerForumOpen} onClose={() => setIsPeerForumOpen(false)} />
      <ResourcesModal isOpen={isResourcesOpen} onClose={() => setIsResourcesOpen(false)} />
    </div>
  );
}

export default StudentPortal;