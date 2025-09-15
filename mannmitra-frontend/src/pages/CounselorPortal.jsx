import React from 'react';
import Header from '../components/Header'; // We can reuse the header

function CounselorPortal({ meetings }) { // It will receive meetings as a prop
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <h1 className="text-3xl font-bold mb-6">Counselor Dashboard</h1>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Student Sessions</h2>
          <div className="space-y-4">
            {/* We will map over the real meeting data here later */}
            {meetings && meetings.length > 0 ? (
              meetings.map((meeting, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Session with: {meeting.studentName || 'Anonymous Student'}</p>
                    <p className="text-sm text-gray-500">{meeting.date} at {meeting.time}</p>
                  </div>
                  <a href={meeting.meetLink} target="_blank" rel="noopener noreferrer" className="header-button">
                    Join Now
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No sessions booked yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CounselorPortal;