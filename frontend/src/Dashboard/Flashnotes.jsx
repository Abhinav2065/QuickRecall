import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/Flashnotes.css';

const Flashnotes = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [cardNum, setCardNum] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      return;
    }
    setUploadedFile(file);
    setError('');
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError('');
  };

  const handleCardNumChange = (e) => {
    setCardNum(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedFile || !cardNum) {
      setError('Please upload a PDF and specify the number of flashcards.');
      return;
    }

    setLoading(true); // Start loading animation
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('cardNum', cardNum);

    try {
      console.log('Sending request to /api/uploadFlashCard/ with file:', uploadedFile.name, 'and cardNum:', cardNum);
      const response = await axios.post('http://localhost:8000/api/uploadFlashCard/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response received:', response.data);
      console.log('Extracted Text:', response.data.extracted_text);
      console.log('Flashcards:', response.data.flashcards);
      setLoading(false); // Stop loading animation
      navigate('/flashcard-viewer', { state: { flashcards: response.data.flashcards } });
    } catch (err) {
      console.error('Error during request:', err);
      setError(err.response?.data?.error || 'Failed to generate flashcards. Please try again.');
      document.getElementById('flashnotes-footer').innerHTML(err);
      setLoading(false); // Stop loading animation on error
    }
  };

  return (
    <div className="flashnotes">
      <div className="flashnotes-container">
        <Link to="/dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
        
        <h1 className="flashnotes-title">Create Flashnotes</h1>
        <p className="flashnotes-subtitle">Upload your PDF and get AI-generated flashcards instantly</p>
        
        <div className="upload-section">
          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''} ${uploadedFile ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <div className="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                </svg>
              </div>
              
              {uploadedFile ? (
                <div className="file-preview">
                  <h3>File Uploaded Successfully!</h3>
                  <p>{uploadedFile.name}</p>
                  <button onClick={removeFile} className="remove-button">
                    Remove File
                  </button>
                </div>
              ) : (
                <>
                  <h3>Drag & Drop your PDF here</h3>
                  <p>Supported format: PDF</p>
                  <label htmlFor="file-upload" className="browse-button">
                    Browse Files
                  </label>
                  <input 
                    id="file-upload" 
                    type="file" 
                    onChange={handleFileSelect} 
                    className="file-input" 
                    accept=".pdf"
                  />
                </>
              )}
            </div>
          </div>
          
          <div className="supported-formats">
            <h4>We support:</h4>
            <div className="format-list">
              <div className="format-item">
                <span className="format-icon">📄</span>
                <span>PDF Documents</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={cardNum}
            onChange={handleCardNumChange}
            placeholder="Number of flashcards"
            min="1"
            required
          />
          <button 
            type="submit"
            className={`generate-button ${!uploadedFile || !cardNum || loading ? 'disabled' : ''}`}
            disabled={!uploadedFile || !cardNum || loading}
          >
            {loading ? 'Generating...' : 'Generate Flashnotes'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Generating your flashcards...</p>
          </div>
        )}
        
        <div className="flashnotes-footer">
          <p>Your content is processed securely and is never stored on our servers</p>
        </div>
      </div>
    </div>
  );
};

export default Flashnotes;