import React, { useState, useRef, useEffect } from 'react';

const ApologySection = ({ onNext }) => {
  const [yesPosition, setYesPosition] = useState({ x: 0, y: 0 });
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  useEffect(() => {
    positionButtonRandomly('yes');
    positionButtonRandomly('no');
  }, []);

  const positionButtonRandomly = (buttonType) => {
    const maxX = window.innerWidth - 100; // Approximate button width
    const maxY = window.innerHeight - 50; // Approximate button height

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    if (buttonType === 'yes') {
      setYesPosition({ x: randomX, y: randomY });
    } else {
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const handleYesHover = (e) => {
    e.preventDefault();
    positionButtonRandomly('yes');
  };

  const handleYesClick = () => {
    onNext();
  };

  const handleNoHover = (e) => {
    e.preventDefault();
    positionButtonRandomly('no');
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    positionButtonRandomly('no');
  };

  return (
    <div style={apologyStyles.container}>
      <h1 id="apologyText" style={apologyStyles.heading}>
        My Dearest Love, I'm so sorry I missed Valentine's Day! <br/>
        Please forgive me and let me make it up to you with a special date?
      </h1>
      <div style={apologyStyles.buttonContainer}>
        <button
          id="yesButton"
          style={{
            ...apologyStyles.buttonBase,
            ...apologyStyles.buttonYes,
            position: 'absolute',
            left: `${yesPosition.x}px`,
            top: `${yesPosition.y}px`,
          }}
          onMouseEnter={handleYesHover}
          onClick={handleYesClick}
          ref={yesButtonRef}
        >
          Yes, I'll go on a date! ❤️
        </button>
        <button
          id="noButton"
          style={{
            ...apologyStyles.buttonBase,
            ...apologyStyles.buttonNo,
            position: 'absolute',
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
          }}
          onMouseEnter={handleNoHover}
          onClick={handleNoClick}
          ref={noButtonRef}
        >
          No, never! 💔
        </button>
      </div>
    </div>
  );
};

const apologyStyles = {
  container: {
    textAlign: 'center',
    padding: '30px',
    maxWidth: '600px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#ff4d6d',
  },
  buttonContainer: {
    position: 'relative',
    marginTop: '2rem',
    width: '100%',
    height: '500px',
  },
  buttonBase: {
    border: 'none',
    padding: '16px 32px',
    fontSize: '1.125rem',
    borderRadius: '9999px', // rounded-full
    cursor: 'pointer',
    margin: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease-in-out', // hover:scale-105 transition-all duration-200 ease-in-out
  },
  buttonYes: {
    backgroundColor: '#ff4d6d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ff85a1', // hover:bg-[#ff85a1]
      transform: 'scale(1.05)',
    }
  },
  buttonNo: {
    backgroundColor: '#adb5bd',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ff85a1', // hover:bg-[#ff85a1]
      transform: 'scale(1.05)',
    }
  },
};

export default ApologySection;