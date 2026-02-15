import React from 'react';

const RomanticCard = ({ onNext, selectedDate }) => {
  const handleYesClick = () => {
    onNext();
  };

  return (
    <div style={romanticCardStyles.container}>
      <div style={romanticCardStyles.card}>
        <h2 style={romanticCardStyles.heading}>
          So, you're forgiving me and going on a date? <br/>
          To confirm: a special date with me on <span style={romanticCardStyles.boldText}>{selectedDate}</span>?
        </h2>
        <button id="finalYesButton" style={romanticCardStyles.buttonConfirm} onClick={handleYesClick}>
          YES! It's a Date! 💖
        </button>
      </div>
    </div>
  );
};

const romanticCardStyles = {
  container: {
    textAlign: 'center',
    padding: '30px',
    maxWidth: '600px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    border: '3px solid #ffb3c1',
    width: '80%',
    maxWidth: '500px',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ff4d6d',
  },
  boldText: {
    fontWeight: 'bolder', // Equivalent of font-extrabold
  },
  buttonConfirm: {
    background: 'linear-gradient(to right, #ff4d6d, #ff85a1)',
    color: 'white',
    border: 'none',
    padding: '16px 40px',
    fontSize: '1.25rem',
    borderRadius: '9999px',
    cursor: 'pointer',
    marginTop: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Adjusted shadow
  },
};

export default RomanticCard;