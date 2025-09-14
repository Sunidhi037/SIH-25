import React from 'react';

function ChatInterface() {
  return (
    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col h-[75vh]">
      <div className="flex-grow chat-container" id="chat-container">
        {/* Chat messages will be rendered here by React */}
      </div>

      <div className="mt-4 border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-3">
          <input type="text" id="user-input" placeholder="Type your message..." className="flex-grow p-4 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          <button id="send-btn" className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-3">
          <button id="wisdom-btn" className="text-sm bg-yellow-400 text-gray-800 font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-yellow-500 transition-all transform hover:scale-105">
            <span role="img" aria-label="gita wisdom">🙏</span> Wisdom AI
          </button>
          <button className="text-sm bg-purple-500 text-white font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-purple-600 transition-all transform hover:scale-105">
            <span role="img" aria-label="friends emoji">🤝</span> Peer Forum
          </button>
          <button className="text-sm bg-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-pink-600 transition-all transform hover:scale-105">
            <span role="img" aria-label="books emoji">📚</span> Resources
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;