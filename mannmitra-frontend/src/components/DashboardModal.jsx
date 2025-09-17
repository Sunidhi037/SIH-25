import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

function DashboardModal({ isOpen, onClose, activityData, recentActivities }) {
  if (!isOpen) return null;

  const moodData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'My Mood (1-10 Scale)',
      data: [6, 7, 5, 8, 9, 7, 8],
      borderColor: '#fde047',
      backgroundColor: 'rgba(253, 224, 71, 0.2)',
      tension: 0.4,
      fill: true,
    }]
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <h2 className="modal-title">Your Personal Dashboard</h2>
        
        <div className="dashboard-grid">
          <div className="dashboard-card static-card">
            <p className="dashboard-card-text">Current Wellness Score</p>
            <p className="dashboard-card-value score">85</p>
          </div>
          <div className="dashboard-card static-card">
            <p className="dashboard-card-text">Consecutive Day Streak</p>
            <p className="dashboard-card-value streak">3</p>
          </div>
          <div className="dashboard-card chart-card full-width-card">
            <h3 className="dashboard-card-title">My Mood Over the Week</h3>
            <div className="chart-container">
              <Line data={moodData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 10 } } }} />
            </div>
          </div>
          <div className="dashboard-card chart-card full-width-card">
            <h3 className="dashboard-card-title">My Activity Breakdown</h3>
            <div className="chart-container">
              <Doughnut data={activityData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
          <div className="dashboard-card full-width-card">
            <h3 className="dashboard-card-title">My Recent Activity</h3>
            <ul className="activity-list">
              {recentActivities && recentActivities.map((activity, index) => (
                <li key={index} className="activity-list-item">
                  <span className="activity-type">{activity.type}</span> {activity.details}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardModal;