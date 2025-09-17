import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentPortal from './pages/StudentPortal';
import CounselorDashboard from './pages/CounselorDashboard';
import AdminDashboard from './pages/AdminDashboard'; // Import the new page

function App() {
  const [meetings, setMeetings] = useState([]);

  const handleBookMeeting = (bookingDetails) => {
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const newMeeting = {
      studentName: bookingDetails.name || 'Anonymous Student',
      date: bookingDetails.date,
      time: bookingDetails.time,
      meetLink: `https://meet.google.com/${uniqueId}`
    };
    setMeetings(prevMeetings => [...prevMeetings, newMeeting]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/student-portal" 
          element={<StudentPortal meetings={meetings} onBookMeeting={handleBookMeeting} />} 
        />
        <Route 
          path="/counselor-dashboard" 
          element={<CounselorDashboard meetings={meetings} />} 
        />
        {/* Add the new route for the admin */}
        <Route 
          path="/admin-dashboard" 
          element={<AdminDashboard meetings={meetings} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;