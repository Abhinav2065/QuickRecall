import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../assets/Chat.css';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, loading, error]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    const newMessage = { question, answer: null };
    setConversation([...conversation, newMessage]);
    setQuestion('');
    setLoading(true);

    try {
      console.log('Sending question to /api/chat/:', question);
      const response = await axios.post('http://localhost:8000/api/chat/', { question }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response received:', response.data);
      setConversation((prev) => [
        ...prev.slice(0, -1),
        { question, answer: response.data.answer },
      ]);
      setLoading(false);
    } catch (err) {
      console.error('Error during request:', err);
      setError(err.response?.data?.error || 'Failed to get response. Please try again.');
      setConversation((prev) => [...prev.slice(0, -1)]);
      setLoading(false);
    }
  };

  const renderLatex = (text) => {
    try {
      // Split the text into segments of plain text, inline math, and display math
      const segments = [];
      let currentText = text;
      const regex = /(\\[\[\(])(.*?)(\\[\]\)])/gs;

      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        // Add plain text before the match
        if (match.index > lastIndex) {
          segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
        }
        // Add the LaTeX content
        const isDisplayMath = match[1] === '\\[';
        segments.push({
          type: isDisplayMath ? 'display' : 'inline',
          content: match[2], // Content inside \(...\)/\[...\]
        });
        lastIndex = match.index + match[0].length;
      }

      // Add remaining plain text
      if (lastIndex < text.length) {
        segments.push({ type: 'text', content: text.slice(lastIndex) });
      }

      return segments.map((segment, index) => {
        if (segment.type === 'text') {
          // Replace \text{...} with its content
          const cleanedText = segment.content.replace(/\\text\{(.*?)\}/g, '$1');
          return <span key={index}>{cleanedText}</span>;
        }
        if (segment.type === 'display') {
          return <BlockMath key={index} math={segment.content} />;
        }
        return <InlineMath key={index} math={segment.content} />;
      });
    } catch (e) {
      console.error('LaTeX rendering error:', e);
      return <span>{text}</span>;
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Link to="/dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
        <h1 className="chat-title">AI Tutor</h1>
      </div>
      <div className="chat-container">
        <div className="conversation">
          {conversation.length === 0 && !loading && (
            <div className="no-messages">
              <h2>Welcome to AI Tutor</h2>
              <p>Ask any question to get started!</p>
            </div>
          )}
          {conversation.map((msg, index) => (
            <div key={index} className="message-group">
              <div className="message user-message">
                <span>{msg.question}</span>
              </div>
              {msg.answer && (
                <div className="message ai-message">
                  {renderLatex(msg.answer)}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="message-group">
              <div className="message ai-message">
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="message-group">
              <div className="message error-message">
                <span>{error}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Ask a question..."
            disabled={loading}
          />
          <button
            type="submit"
            className={`submit-button ${!question.trim() || loading ? 'disabled' : ''}`}
            disabled={!question.trim() || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;