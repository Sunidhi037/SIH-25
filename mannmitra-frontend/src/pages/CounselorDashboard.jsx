import React, { useState } from 'react';
import Header from '../components/Header';
import DashboardModal from '../components/DashboardModal';

// Sample data for different sections
const studentHistoryData = [
  { id: '123', name: 'Rohan Sharma', lastSession: '2025-09-10' },
  { id: '124', name: 'Priya Patel', lastSession: '2025-09-12' },
];

const highRiskStudents = [
  { id: '129', name: 'Aditya Verma', details: 'Stress level critical for 3 consecutive days.'},
  { id: '130', name: 'Sneha Reddy', details: 'Expressed feelings of severe anxiety in last chat.'},
];

function CounselorDashboard({ meetings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentDetailOpen, setIsStudentDetailOpen] = useState(false);

  const filteredStudents = studentHistoryData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewStudentDashboard = (student) => {
    setSelectedStudent(student);
    setIsStudentDetailOpen(true);
  };

  return (
    <>
      <div className="app-container">
        <Header userType="counselor" />
        <main className="main-content">
          <h1 className="text-3xl font-bold mb-6">Counselor Dashboard</h1>
          
          {/* High-Risk Alerts Section */}
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">High-Risk Alerts</h2>
            <div className="space-y-3">
              {highRiskStudents.map((student) => (
                <div key={student.id} className="bg-white p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-red-800">{student.name}</p>
                    <p className="text-sm text-red-600">{student.details}</p>
                  </div>
                  <button onClick={() => handleViewStudentDashboard(student)} className="auth-link text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Sessions Section */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Student Sessions</h2>
            <div className="space-y-4">
              {meetings && meetings.length > 0 ? (
                meetings.map((meeting, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Session with: {meeting.studentName || 'Anonymous'}</p>
                      <p className="text-sm text-gray-500">{meeting.date} at {meeting.time}</p>
                    </div>
                    <a href={meeting.meetLink} target="_blank" rel="noopener noreferrer" className="header-button">Join Now</a>
                  </div>
                ))
              ) : ( <p className="text-gray-500">No new sessions booked yet.</p> )}
            </div>
          </div>

          {/* Student History Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Student History</h2>
              <input 
                type="text"
                placeholder="Search students..."
                className="input-group input" // Note: This might need a dedicated style for width
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-gray-500">Last Session: {student.lastSession}</p>
                  </div>
                  <button onClick={() => handleViewStudentDashboard(student)} className="auth-link text-sm">
                    View Dashboard
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Render the Dashboard Modal when a student is selected */}
      {selectedStudent && (
        <DashboardModal 
          isOpen={isStudentDetailOpen}
          onClose={() => setIsStudentDetailOpen(false)}
          // These props would eventually be replaced with the selected student's actual data
          activityData={{ labels:[], datasets:[] }} 
          recentActivities={[]}
        />
      )}
    </>
  );
}

export default CounselorDashboard;