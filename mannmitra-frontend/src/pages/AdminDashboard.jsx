import React from 'react';
import Header from '../components/Header';

// Sample data for the admin dashboard
const highRiskStudents = [
    { id: '129', name: 'Aditya Verma', details: 'Stress level critical for 3 consecutive days.'},
    { id: '130', name: 'Sneha Reddy', details: 'Expressed feelings of severe anxiety in last chat.'},
];

const allStudents = [
    { id: '123', name: 'Rohan Sharma', lastActivity: 'Chat Session' },
    { id: '124', name: 'Priya Patel', lastActivity: 'Booked Session' },
    { id: '125', name: 'Amit Kumar', lastActivity: 'Viewed Resource' },
];

const counselorActivity = [
    { id: 'c1', name: 'Dr. Anjali Mehta', status: 'Online', upcomingSessions: 5 },
    { id: 'c2', name: 'Dr. Vikram Singh', status: 'Offline', upcomingSessions: 2 },
];

function AdminDashboard() {
  return (
    <div className="app-container">
      <Header userType="admin" />
      <main className="main-content">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* High-Risk Alerts Section */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">High-Risk Student Alerts</h2>
            {/* Logic to display alerts would go here */}
            {highRiskStudents.map(student => (
                <div key={student.id} className="bg-white p-3 rounded-lg mb-2">{student.name} - {student.details}</div>
            ))}
        </div>

        {/* Student Monitoring Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Monitoring</h2>
          {/* Logic to display a searchable list of all students */}
          {allStudents.map(student => (
              <div key={student.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-2">
                  <p className="font-semibold">{student.name}</p>
                  <button className="auth-link text-sm">View Full Dashboard</button>
              </div>
          ))}
        </div>

        {/* Counselor Activity Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Counselor Activity</h2>
          {/* Logic to display counselor stats */}
           {counselorActivity.map(counselor => (
              <div key={counselor.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-2">
                  <p className="font-semibold">{counselor.name} ({counselor.status})</p>
                  <p className="text-sm text-gray-600">Upcoming Sessions: {counselor.upcomingSessions}</p>
              </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;