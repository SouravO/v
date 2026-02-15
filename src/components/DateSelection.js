import React, { useState } from 'react';

const DateSelection = ({ onNext }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [message, setMessage] = useState('When are you free to make up for it?');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      setMessage(`Awesome! ${selectedDate} it is!`);
      setTimeout(() => {
        onNext(selectedDate);
      }, 1500);
    } else {
      setMessage('Please pick a date!');
    }
  };

  return (
    <div style={dateSelectionStyles.container}>
      <h2 style={dateSelectionStyles.heading}>{message}</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={dateSelectionStyles.dateInput}
      />
      <button
        onClick={handleSubmit}
        style={dateSelectionStyles.buttonConfirm}
      >
        Confirm Date!
      </button>
    </div>
  );
};

const dateSelectionStyles = {
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
  dateInput: {
    padding: '12px',
    border: '2px solid #ffb3c1',
    borderRadius: '8px',
    fontSize: '1.125rem',
    marginBottom: '1rem',
  },
  buttonConfirm: {
    backgroundColor: '#ff4d6d',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    fontSize: '1.125rem',
    borderRadius: '9999px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.2s ease-in-out',
    // No explicit hover for simplicity, will work with default
  },
};

export default DateSelection;