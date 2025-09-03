import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../assets/ShowNotes.css';

const ShowNotes = () => {
  const { state } = useLocation();
  const flashcards = state?.flashcards || {};
  const flashcardArray = Object.entries(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcardArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  if (!flashcardArray.length) {
    return (
      <div className="flashcard-viewer">
        <div className="flashcard-container">
          <h1 className="flashcard-title">No Flashcards Available</h1>
          <p>Upload a PDF in Flashnotes to generate flashcards.</p>
          <Link to="/flashnotes" className="btn btn-primary">Go to Flashnotes</Link>
        </div>
      </div>
    );
  }

  const [question, answer] = flashcardArray[currentIndex];

  return (
    <div className="flashcard-viewer">
      <div className="flashcard-container">
        <Link to="/flashnotes" className="back-button">
          ← Back to Flashnotes
        </Link>
        <h1 className="flashcard-title">Your Flashcards</h1>
        <p className="flashcard-subtitle">Click the card to flip between question and answer</p>

        <div className="flashcard-wrapper">
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h3>Question</h3>
                <p>{question}</p>
              </div>
              <div className="flashcard-back">
                <h3>Answer</h3>
                <p>{answer}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flashcard-nav">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <span>{currentIndex + 1} / {flashcardArray.length}</span>
          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={currentIndex === flashcardArray.length - 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


export default ShowNotes