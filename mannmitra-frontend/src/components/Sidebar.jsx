import React from 'react';

function Sidebar({ onBookCounselorClick }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Your Wellness Snapshot</h2>
      
      <div className="sidebar-stats-container">
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mannmitra-blue)', fontSize: '1.25rem', fontWeight: 'bold', border: '2px solid #bfdbfe' }}>
              <span>3</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#475569', fontWeight: '500' }}>Consecutive Day Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <h3 style={{ fontWeight: 'bold', color: '#334155', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Stress Level (PHQ-9)</h3>
          <div style={{ width: '100%', backgroundColor: '#d1d5db', borderRadius: '9999px', height: '0.5rem' }}>
            <div style={{ backgroundColor: '#f59e0b', height: '0.5rem', borderRadius: '9999px', width: '45%' }}></div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Currently: <span style={{ fontWeight: '600', color: '#d97706' }}>Moderate</span></p>
        </div>
      </div>

      <button 
        className="sidebar-button btn-counselor" 
        onClick={onBookCounselorClick}
      >
        Book a Counselor
      </button>
    </div>
  );
}

export default Sidebar;