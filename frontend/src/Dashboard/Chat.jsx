import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Sorry but this feature is not out yet :(", sender: 'ai' },
  ]);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Biology Concepts", active: true },
    { id: 2, title: "Calculus Problems" },
    { id: 3, title: "History Timeline" },
    { id: 4, title: "Chemistry Equations" },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Add user message
    const newUserMessage = { id: messages.length + 1, text: inputText, sender: 'user' };
    setMessages([...messages, newUserMessage]);
    setInputText('');

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = { 
        id: messages.length + 2, 
        text: "Your Question seems great but currently this Feature is under development! Please Come back Later!.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const startNewChat = () => {
    setMessages([{ id: 1, text: "Sorry but this feature is not out yet! :(", sender: 'ai' }]);
  };

  const selectChat = (id) => {
    setChatHistory(chatHistory.map(chat => ({
      ...chat,
      active: chat.id === id
    })));
    // In a real app, you would load the selected chat messages
  };

  return (
    <div className="chat">
      <div className={`chat-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={startNewChat}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
            New Chat
          </button>
          <button 
            className="sidebar-toggle" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="chat-history">
          <h3>Chat History</h3>
          <div className="history-list">
            {chatHistory.map(chat => (
              <div 
                key={chat.id} 
                className={`history-item ${chat.active ? 'active' : ''}`}
                onClick={() => selectChat(chat.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.97 48.97 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                </svg>
                <span>{chat.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="sidebar-footer">
          <Link to="/dashboard" className="back-to-dashboard">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {!isSidebarOpen && (
        <button 
          className="sidebar-toggle floating-toggle"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      <div className="chat-main">

        <div className="chat-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === 'ai' ? (
                  <div className="ai-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L3 13.5V15.5L9 14V16H15V14L21 15.5V13.5L15 12V10.5L21 9Z" />
                    </svg>
                  </div>
                ) : (
                  <div className="user-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="message-content">
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message AI study assistant..."
                className="chat-input"
              />
              <button type="submit" className="send-button" disabled={inputText.trim() === ''}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </form>
          <p className="input-footer">AI assistant may produce inaccurate information about people, places, or facts.</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;