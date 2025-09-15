import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

function DashboardModal({ isOpen, onClose }) {
  // Use a ref to hold the chart instances so we can clean them up
  const charts = {};

  // This effect runs every time the modal opens (isOpen becomes true)
  useEffect(() => {
    if (isOpen) {
      // Initialize charts when the modal is visible
      const personalDashboardContent = document.getElementById('personal-dashboard-content');
      if (personalDashboardContent) {
        charts.moodChart = new Chart(document.getElementById('moodTrackerChart').getContext('2d'), {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'My Mood (1-10 Scale)',
              data: [6, 7, 5, 8, 9, 7, 8],
              borderColor: '#fde047',
              backgroundColor: 'rgba(253, 224, 71, 0.2)',
              tension: 0.4,
              fill: true,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 10 } }
          }
        });
        
        charts.activityChart = new Chart(document.getElementById('activityBreakdownChart').getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ['Chat Sessions', 'Resources Viewed', 'Peer Forum'],
            datasets: [{
              data: [60, 25, 15],
              backgroundColor: ['#2563eb', '#ec4899', '#8b5cf6'],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
          }
        });
      }
    }

    // Cleanup function to destroy charts when the modal is closed
    return () => {
      if (charts.moodChart) {
        charts.moodChart.destroy();
      }
      if (charts.activityChart) {
        charts.activityChart.destroy();
      }
    };
  }, [isOpen]); // The effect depends on the `isOpen` state

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-40 modal-backdrop">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-3xl w-full mx-4 relative border border-gray-200 transform scale-100 transition-transform duration-300 ease-out max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 id="modal-title" className="text-3xl font-bold text-gray-800 mb-6">Your Personal Dashboard</h2>
        
        <div id="personal-dashboard-content" className="grid lg:grid-cols-2 gap-8 text-center p-2">
          {/* Your dashboard HTML content goes here */}
          <div className="bg-green-100 p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <p className="font-bold text-green-700">Current Wellness Score</p>
            <p className="text-5xl font-extrabold text-green-800">85</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <p className="font-bold text-blue-700">Consecutive Day Streak</p>
            <p className="text-5xl font-extrabold text-blue-800">3</p>
          </div>
          <div className="lg:col-span-2 bg-yellow-50 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-yellow-700 mb-4 text-xl">My Mood Over the Week</h3>
            <div className="h-64">
              <canvas id="moodTrackerChart"></canvas>
            </div>
          </div>
          <div className="lg:col-span-2 bg-purple-50 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-purple-700 mb-4 text-xl">My Activity Breakdown</h3>
            <div className="h-64">
              <canvas id="activityBreakdownChart"></canvas>
            </div>
          </div>
          <div className="lg:col-span-2 bg-gray-100 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-gray-700 mb-4 text-xl">My Recent Activity</h3>
            <ul className="text-left space-y-2">
              <li className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="font-semibold text-gray-800">Chat with MannMitra:</span> Discussed exam anxiety.
              </li>
              <li className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="font-semibold text-gray-800">Resource Viewed:</span> "10-Minute Guided Meditation" audio.
              </li>
              <li className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="font-semibold text-gray-800">Peer Forum Post:</span> "Best tips to stay motivated."
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardModal;