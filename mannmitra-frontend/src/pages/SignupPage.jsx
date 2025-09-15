import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [activeTab, setActiveTab] = useState('student');
  const navigate = useNavigate();

  // State for all fields and their errors
  const [fullName, setFullName] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  
  const [fullNameError, setFullNameError] = useState('');
  const [collegeIdError, setCollegeIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (value) => {
    if (value.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one capital letter.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one special character.';
    return '';
  };
  
  // onChange handler for Full Name
  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullName(value);
    if (value.trim() === '') {
      setFullNameError('Full Name cannot be empty.');
    } else {
      setFullNameError('');
    }
  };

  // onChange handler for College ID
  const handleCollegeIdChange = (event) => {
    const value = event.target.value;
    setCollegeId(value);
    if (value.trim() === '') {
      setCollegeIdError('College ID cannot be empty.');
    } else {
      setCollegeIdError('');
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    
    // Check all fields before submitting
    const passErr = validatePassword(password);
    const nameErr = fullName.trim() === '' ? 'Full Name cannot be empty.' : '';
    const idErr = collegeId.trim() === '' ? 'College ID cannot be empty.' : '';

    setFullNameError(nameErr);
    setCollegeIdError(idErr);
    setPasswordError(passErr);

    if (passErr || nameErr || idErr) {
      return; // Stop submission if any error exists
    }

    console.log('Creating a new account...');
    navigate('/student-portal');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Create an Account</h1>
          <p className="auth-subtitle">Join MannMitra Today</p>
        </div>

        <div className="auth-tabs">
          <button className={`tab-button ${activeTab === 'student' ? 'active' : ''}`} onClick={() => setActiveTab('student')}>Student</button>
          <button className={`tab-button ${activeTab === 'counselor' ? 'active' : ''}`} onClick={() => setActiveTab('counselor')}>Counselor</button>
          <button className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>Admin</button>
        </div>

        <form className="auth-form" onSubmit={handleSignup} noValidate>
          {activeTab === 'student' && (
            <>
              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" value={fullName} onChange={handleFullNameChange} placeholder="Enter your full name" />
                {fullNameError && <p className="error-message">{fullNameError}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="collegeId">College ID</label>
                <input type="text" id="collegeId" value={collegeId} onChange={handleCollegeIdChange} placeholder="Enter your College ID" />
                {collegeIdError && <p className="error-message">{collegeIdError}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Create a password" />
                {passwordError && <p className="error-message">{passwordError}</p>}
              </div>
            </>
          )}

          {activeTab === 'counselor' && ( <p className="auth-subtitle">Counselor registration is handled by administration.</p> )}
          {activeTab === 'admin' && ( <p className="auth-subtitle">Admin registration is handled by administration.</p> )}

          {activeTab === 'student' && (
            <>
              <div className="checkbox-group">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms"> I agree to the <a href="/terms" className="auth-link">Terms</a> and <a href="/privacy" className="auth-link">Privacy Policy</a>.</label>
              </div>
              <button type="submit" className="auth-button">
                Create Account
              </button>
            </>
          )}
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <a href="/" className="auth-link">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;