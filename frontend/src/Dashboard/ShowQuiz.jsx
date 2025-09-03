import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../assets/ShowQuiz.css';

const ShowQuiz = () => {
  const { state } = useLocation();
  const quizzes = state?.quizzes || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answers, setAnswers] = useState({}); // Track user answers
  const [showResults, setShowResults] = useState(false);
  const [resultsIndex, setResultsIndex] = useState(0);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setShowFeedback(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      if (selectedOption) {
        setShowFeedback(true);
        const correct = selectedOption === quizzes[currentIndex].correct_answer;
        setIsCorrect(correct);
        setAnswers((prev) => ({
          ...prev,
          [currentIndex]: { selected: selectedOption, correct },
        }));
      }
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleSubmit = () => {
    if (selectedOption && !answers[currentIndex]) {
      const correct = selectedOption === quizzes[currentIndex].correct_answer;
      setAnswers((prev) => ({
        ...prev,
        [currentIndex]: { selected: selectedOption, correct },
      }));
    }
    setShowResults(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const incorrectQuestions = Object.entries(answers)
    .filter(([_, answer]) => !answer.correct)
    .map(([index]) => parseInt(index));

  const correctCount = Object.values(answers).filter((answer) => answer.correct).length;

  if (!quizzes.length) {
    return (
      <div className="quiz-viewer">
        <div className="quiz-container">
          <h1 className="quiz-title">No Quizzes Available</h1>
          <p>Upload a PDF in Quizzes to generate multiple-choice questions.</p>
          <Link to="/quizzes" className="btn btn-primary">Go to Quizzes</Link>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-viewer">
        <div className="quiz-container">
          <Link to="/quizzes" className="back-button">
            ← Back to Quizzes
          </Link>
          <h1 className="quiz-title">Quiz Results</h1>
          <p className="quiz-subtitle">
            You got {correctCount} out of {quizzes.length} questions right!
          </p>

          {incorrectQuestions.length > 0 ? (
            <>
              <h2 className="results-title">Incorrect Questions</h2>
              <div className="quiz-wrapper">
                <div className="quiz-content">
                  <div className="quiz-front">
                    <h3>{quizzes[incorrectQuestions[resultsIndex]].question}</h3>
                    <div className="options">
                      {quizzes[incorrectQuestions[resultsIndex]].options.map((option, idx) => (
                        <label
                          key={idx}
                          className={`option-label ${
                            option === quizzes[incorrectQuestions[resultsIndex]].correct_answer
                              ? 'correct-option'
                              : option === answers[incorrectQuestions[resultsIndex]].selected
                              ? 'incorrect-option'
                              : ''
                          }`}
                        >
                          <input type="radio" disabled />
                          {option}
                        </label>
                      ))}
                    </div>
                    <p className="explanation">
                      <strong>Explanation:</strong>{' '}
                      {quizzes[incorrectQuestions[resultsIndex]].explanation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="quiz-nav">
                <button
                  className="nav-button prev-button"
                  onClick={() => setResultsIndex(resultsIndex - 1)}
                  disabled={resultsIndex === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                  </svg>
                </button>
                <span>
                  {resultsIndex + 1} / {incorrectQuestions.length}
                </span>
                <button
                  className="nav-button next-button"
                  onClick={() => setResultsIndex(resultsIndex + 1)}
                  disabled={resultsIndex === incorrectQuestions.length - 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <p className="quiz-subtitle">Well Well, time for the result huh!</p>
          )}
        </div>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];

  return (
    <div className="quiz-viewer">
      <div className="quiz-container">
        <Link to="/quizzes" className="back-button">
          ← Back to Quizzes
        </Link>
        <h1 className="quiz-title">FIGHT!!</h1>
        <p className="quiz-subtitle">You Know the drill! All the best!</p>

        <div className={`quiz-wrapper ${showFeedback ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
          <div className={`quiz-content ${isFlipped ? 'flipped' : ''}`} >
            <div className="quiz-front">
              <h3>{currentQuiz.question}</h3>
              <div className="options">
                {currentQuiz.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`option-label ${showFeedback && option === currentQuiz.correct_answer ? 'correct-option' : ''}`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                      disabled={isFlipped || showFeedback}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="quiz-back">
              <h3>Explanation</h3>
              <p>{currentQuiz.explanation}</p>
              <p><strong>Correct Answer:</strong> {currentQuiz.correct_answer}</p>
            </div>
          </div>
        </div>

        <div className="quiz-nav">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <span>{currentIndex + 1} / {quizzes.length}</span>
          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={currentIndex === quizzes.length - 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
          <button
            className="nav-button submit-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowQuiz;