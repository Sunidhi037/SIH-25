import React from 'react';

// 1. The component now receives the 'onBookCounselorClick' function as a prop
function Sidebar({ onBookCounselorClick }) {
  return (
    <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Wellness Snapshot</h2>
      <div className="flex items-center space-x-6 mb-6 p-4 bg-blue-50 rounded-2xl shadow-inner w-full">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-blue-200">
          <span>3</span>
        </div>
        <p className="text-lg text-gray-600 font-medium">Consecutive Day Streak</p>
      </div>
      <div className="bg-gray-100 rounded-2xl p-6 mb-6 shadow-inner w-full">
        <h3 className="font-bold text-gray-700 mb-3">Stress Level (PHQ-9)</h3>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div className="bg-yellow-500 h-3 rounded-full shadow-md" style={{ width: '45%' }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Currently: <span className="font-semibold text-yellow-600">Moderate Risk</span></p>
      </div>
      
      {/* 2. Add the onClick handler to the button */}
      <button 
        className="w-full bg-green-500 text-white font-bold py-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
        onClick={onBookCounselorClick}
      >
        Book a Counselor
      </button>
    </div>
  );
}

export default Sidebar;