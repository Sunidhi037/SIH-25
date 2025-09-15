import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentPortal from './pages/StudentPortal';
// import './index.css'; // Delete this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/student-portal" element={<StudentPortal />} />
      </Routes>
    </Router>
  );
}

export default App;