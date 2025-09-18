import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import DashboardModal from '../components/DashboardModal';
import BookingModal from '../components/BookingModal';
import PeerForumModal from '../components/PeerForumModal';
import ResourcesModal from '../components/ResourcesModal';
import PHQ9Form from '../components/PHQ9Form';
import Modal from '../components/Modal';

function StudentPortal({ meetings, onBookMeeting }) {
  // --- State Management for all modals ---
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPeerForumOpen, setIsPeerForumOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isPHQ9Open, setIsPHQ9Open] = useState(false); // State for the PHQ-9 Test

  // --- State for chat and dashboard data ---
  const [messages, setMessages] = useState([
    { text: "Namaste! Welcome to MannMitra. I'm here to listen and support you.", sender: 'bot' }
  ]);
  const [activityData, setActivityData] = useState({
    labels: ['Chat Sessions', 'Resources Viewed', 'Peer Forum', 'Meetings Booked'],
    datasets: [{ data: [60, 25, 15, meetings.length], backgroundColor: ['#2563eb', '#ec4899', '#8b5cf6', '#16a34a'], hoverOffset: 4 }]
  });
  const [recentActivities, setRecentActivities] = useState([
    { type: 'Chat with MannMitra:', details: 'Discussed exam anxiety.' },
  ]);

  // --- Event Handlers ---
  const handleSendMessage = (userMessage) => {
    setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: 'user' }]);
    // We'll replace this with the Gemini API call later
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "Thank you for sharing. I'm here to listen.", sender: 'bot' }]);
    }, 1000);
  };
  
  const handleMeetingBooked = (bookingDetails) => {
    onBookMeeting(bookingDetails);
    const newActivity = { type: 'Meeting Booked:', details: `Session on ${bookingDetails.date} at ${bookingDetails.time}` };
    setRecentActivities(prev => [newActivity, ...prev]);
    setActivityData(prev => {
      const newData = [...prev.datasets[0].data];
      newData[3] += 1;
      return { ...prev, datasets: [{ ...prev.datasets[0], data: newData }] };
    });
  };

  // Handlers for the PHQ-9 Test
  const handleShowPHQ9Test = () => {
    setIsPHQ9Open(true);
  };

  const handleCompletePHQ9Test = (score, riskLevel) => {
    setIsPHQ9Open(false);
    const newActivity = { type: 'Test Completed:', details: `PHQ-9 score of ${score} (risk: ${riskLevel})` };
    setRecentActivities(prev => [newActivity, ...prev]);
    setMessages(prevMessages => [
      ...prevMessages, 
      { text: `Your test score is ${score}. This indicates a ${riskLevel} level. This is not a diagnosis. Please consider booking a session with a counselor to discuss this further.`, sender: 'bot' }
    ]);
  };

  return (
    <div className="app-container" style={{ height: '100vh', overflow: 'hidden' }}>
      <Header onViewDashboardClick={() => setIsDashboardOpen(true)} userType="student" />
      <main className="main-content">
        <div className="content-grid">
          <Sidebar 
            onBookCounselorClick={() => setIsBookingOpen(true)} 
            onTakeTestClick={handleShowPHQ9Test} // Pass the test function to the sidebar
          />
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onShowPeerForum={() => setIsPeerForumOpen(true)} 
            onShowResources={() => setIsResourcesOpen(true)} 
          />
        </div>
      </main>
      
      {/* Render all modals */}
      <DashboardModal isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} activityData={activityData} recentActivities={recentActivities} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} onMeetingBooked={handleMeetingBooked} />
      <PeerForumModal isOpen={isPeerForumOpen} onClose={() => setIsPeerForumOpen(false)} />
      <ResourcesModal isOpen={isResourcesOpen} onClose={() => setIsResourcesOpen(false)} />
      
      {/* Render the PHQ-9 Test in a generic modal */}
      <Modal isOpen={isPHQ9Open} onClose={() => setIsPHQ9Open(false)}>
        <PHQ9Form onComplete={handleCompletePHQ9Test} />
      </Modal>
    </div>
  );
}

export default StudentPortal;