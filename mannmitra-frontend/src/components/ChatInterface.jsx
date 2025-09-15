import React from 'react';

function ChatInterface() {
  return (
    <div className="chat-interface">
      <div className="chat-messages-container" id="chat-container">
        {/* Placeholder for the initial bot message */}
        <div className="message bot-message">
          Namaste! Welcome to MannMitra. I'm here to listen. How are you feeling today?
        </div>
      </div>

      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            className="chat-input"
          />
          <button id="send-btn" className="send-button">
            <svg xmlns="http://www.w.org/2000/svg" className="send-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        {/* The new buttons are here */}
        <div className="feature-button-container">
          <button className="feature-button btn-wisdom">
            <span role="img" aria-label="gita wisdom">🙏</span> Wisdom AI
          </button>
          <button className="feature-button btn-peer">
            <span role="img" aria-label="friends emoji">🤝</span> Peer Forum
          </button>
          <button className="feature-button btn-resources">
            <span role="img" aria-label="books emoji">📚</span> Resources
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;