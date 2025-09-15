import React, { useState } from 'react';

function BookingModal({ isOpen, onClose }) {
  // State to manage form inputs
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // State to show a confirmation message
  const [isBooked, setIsBooked] = useState(false);

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    // In a real app, you would send this data to a backend server
    console.log('Booking submitted:', { name: name || 'Anonymous', date, time });
    
    // Show the confirmation message
    setIsBooked(true);
  };

  const handleClose = () => {
    setIsBooked(false); // Reset confirmation on close
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-40 modal-backdrop">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full mx-4 relative border border-gray-200">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Book a Confidential Session</h2>
        
        {/* Conditionally render the form or the confirmation message */}
        {!isBooked ? (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="input-group">
              <label htmlFor="name">Your Name (Optional)</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Leave blank to stay anonymous" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-group">
                <label htmlFor="date">Select Date</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="input-group">
                <label htmlFor="time">Select Time</label>
                <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="auth-button w-full">Confirm Booking</button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-600">Session Booked!</h3>
            <p className="mt-2 text-gray-600">Your session for <strong>{date} at {time}</strong> has been confirmed. A counselor will reach out to you shortly.</p>
            <p className="mt-4 font-semibold">Your Google Meet Link:</p>
            <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" className="auth-link break-words">
              https://meet.google.com/new
            </a>
            <button onClick={handleClose} className="auth-button w-full mt-6">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;