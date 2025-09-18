import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [activeTab, setActiveTab] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle login submit
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    // --- START: Sample Credentials Check ---
    // Check for hardcoded counselor credentials
    if (activeTab === 'counselor' && identifier === 'counselor@mannmitra.com' && password === 'Password@123') {
      console.log('Logging in as sample counselor...');
      navigate('/counselor-dashboard');
      return; // Stop the function here
    }

    // Check for hardcoded admin credentials
    if (activeTab === 'admin' && identifier === 'admin@mannmitra.com' && password === 'Password@123') {
      console.log('Logging in as sample admin...');
      navigate('/admin-dashboard');
      return; // Stop the function here
    }
    // --- END: Sample Credentials Check ---

    // If sample credentials don't match, proceed with your backend API call
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeTab,
          collegeId: identifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      // Redirect based on role from API response
      if (activeTab === "student") navigate("/student-portal");
      else if (activeTab === "counselor") navigate("/counselor-dashboard");
      else if (activeTab === "admin") navigate("/admin-dashboard");

    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };
  
  // Helper to clear state when changing tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIdentifier('');
    setPassword('');
    setError('');
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
            className={`tab-button ${activeTab === "student" ? "active" : ""}`}
            onClick={() => handleTabClick("student")}
          >
            Student
          </button>
          <button
            className={`tab-button ${activeTab === "counselor" ? "active" : ""}`}
            onClick={() => handleTabClick("counselor")}
          >
            Counselor
          </button>
          <button
            className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => handleTabClick("admin")}
          >
            Admin
          </button>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {activeTab === "student" && (
            <div className="input-group">
              <label htmlFor="collegeId">College ID</label>
              <input type="text" id="collegeId" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Enter your College ID" required />
            </div>
          )}
          {activeTab === "counselor" && (
            <div className="input-group">
              <label htmlFor="counselorId">Counselor ID / Email</label>
              <input type="text" id="counselorId" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="counselor@mannmitra.com" required />
            </div>
          )}
          {activeTab === "admin" && (
            <div className="input-group">
              <label htmlFor="adminId">Admin Username</label>
              <input type="text" id="adminId" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="admin@mannmitra.com" required />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password@123" required />
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">Login</button>
        </form>

        <div className="auth-footer">
          <a href="/forgot-password" className="auth-link">Forgot Password?</a>
          <p>
            Don&apos;t have an account?{" "}
            <a href="/signup" className="auth-link">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;