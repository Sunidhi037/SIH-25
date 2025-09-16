import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [activeTab, setActiveTab] = useState('student');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`Logging in as: ${activeTab}`);

    if (activeTab === 'student') {
      navigate('/student-portal');
    } else if (activeTab === 'counselor') {
      navigate('/counselor-dashboard');
    } else if (activeTab === 'admin') {
      // This now navigates to the admin dashboard
      navigate('/admin-dashboard');
    }
  };

  return (
    <div className="auth-page auth-page-centered">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Welcome to MannMitra</h1>
          <p className="auth-subtitle">Please sign in to continue</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => setActiveTab('student')}
          >
            Student
          </button>
          <button
            className={`tab-button ${activeTab === 'counselor' ? 'active' : ''}`}
            onClick={() => setActiveTab('counselor')}
          >
            Counselor
          </button>
          <button
            className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {activeTab === 'student' && (
            <div className="input-group">
              <label htmlFor="collegeId">College ID</label>
              <input type="text" id="collegeId" placeholder="Enter your College ID" required />
            </div>
          )}

          {activeTab === 'counselor' && (
            <div className="input-group">
              <label htmlFor="counselorId">Counselor ID / Email</label>
              <input type="text" id="counselorId" placeholder="Enter your Counselor ID or Email" required />
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="input-group">
              <label htmlFor="adminId">Admin Username</label>
              <input type="text" id="adminId" placeholder="Enter your Admin Username" required />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <a href="/forgot-password" className="auth-link">Forgot Password?</a>
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="auth-link">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;