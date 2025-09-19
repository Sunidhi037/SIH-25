import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentPortal from './pages/StudentPortal';
import CounselorDashboard from './pages/CounselorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SplashScreen from './components/SplashScreen'; // 2. Import SplashScreen component

function App() {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 3. Add loading state

  useEffect(() => {
    // Set a timer to hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Run only once when the component mounts

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

  if (isLoading) {
    // 4. Conditionally render the SplashScreen component
    return <SplashScreen />;
  }

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
        <Route 
          path="/admin-dashboard" 
          element={<AdminDashboard meetings={meetings} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;