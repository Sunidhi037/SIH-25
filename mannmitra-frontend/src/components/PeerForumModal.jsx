import React from 'react';

function PeerForumModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-40 modal-backdrop">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full mx-4 relative border border-gray-200 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Peer Support Forum</h2>
        <p className="text-gray-600 mb-6">
          This will be a safe and anonymous space to connect with trained student volunteers and peers who understand what you're going through. Share experiences and find support within your community.
        </p>
        <div className="bg-yellow-100 text-yellow-800 font-bold p-4 rounded-lg">
          This feature is coming soon!
        </div>
      </div>
    </div>
  );
}

export default PeerForumModal;