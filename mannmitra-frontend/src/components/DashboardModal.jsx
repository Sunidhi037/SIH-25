import React from 'react';
// 1. Import the chart components from the library
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';

// 2. Register the components Chart.js needs to draw the charts
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

// This component now receives its data as props
function DashboardModal({ isOpen, onClose, activityData, recentActivities }) {
  if (!isOpen) return null;

  // The mood chart data can stay here for now as it's not dynamic yet
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-40 modal-backdrop">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-3xl w-full mx-4 relative border border-gray-200 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Personal Dashboard</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 text-center p-2">
          {/* Static cards remain the same */}
          <div className="bg-green-100 p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <p className="font-bold text-green-700">Current Wellness Score</p>
            <p className="text-5xl font-extrabold text-green-800">85</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <p className="font-bold text-blue-700">Consecutive Day Streak</p>
            <p className="text-5xl font-extrabold text-blue-800">3</p>
          </div>

          {/* Chart Components */}
          <div className="lg:col-span-2 bg-yellow-50 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-yellow-700 mb-4 text-xl">My Mood Over the Week</h3>
            <div className="h-64">
              <Line data={moodData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 10 } } }} />
            </div>
          </div>
          <div className="lg:col-span-2 bg-purple-50 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-purple-700 mb-4 text-xl">My Activity Breakdown</h3>
            <div className="h-64">
              {/* 3. Use the activityData prop to render the doughnut chart */}
              <Doughnut data={activityData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
          <div className="lg:col-span-2 bg-gray-100 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-gray-700 mb-4 text-xl">My Recent Activity</h3>
            <ul className="text-left space-y-2">
              {/* 4. Map over the recentActivities prop to render the list */}
              {recentActivities.map((activity, index) => (
                <li key={index} className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                  <span className="font-semibold text-gray-800">{activity.type}</span> {activity.details}
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