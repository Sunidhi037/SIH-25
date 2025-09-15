import React, { useState, useEffect, useRef } from 'react';

// Accept all functions as props
function ChatInterface({ messages, onSendMessage, onShowPeerForum, onShowResources }) {
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : ''}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <form className="chat-input-wrapper" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="send-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>

        <div className="feature-button-container">
          {/* <button className="feature-button btn-wisdom">
            <span role="img" aria-label="gita wisdom">🙏</span> Wisdom AI
          </button> */}
          {/* Connect the Peer Forum button */}
          <button className="feature-button btn-peer" onClick={onShowPeerForum}>
            <span role="img" aria-label="friends emoji">🤝</span> Peer Forum
          </button>
          {/* Connect the Resources button */}
          <button className="feature-button btn-resources" onClick={onShowResources}>
            <span role="img" aria-label="books emoji">📚</span> Resources
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;