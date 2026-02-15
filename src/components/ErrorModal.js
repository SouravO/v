import React, { useState, useEffect } from 'react';
import '../styles/ErrorModal.css';

const ErrorModal = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          // Wait 5 seconds before completing
          setTimeout(() => {
            setShowModal(false);
            setTimeout(() => {
              onComplete();
            }, 300);
          }, 5000);
          return 99;
        }
        return prev + 1;
      });
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Oops! Your Valentine is 24+ hours late. Please wait for the apology to load.</h2>
        <div className="loading-container">
          <div className="loading-bar">
            <div 
              className="loading-progress" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="loading-text">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;