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
        onNext(selectedDate); // Pass the selected date back to App.js if needed
      }, 1500);
    } else {
      setMessage('Please pick a date!');
    }
  };

  return (
    <div className="text-center p-8 max-w-xl min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8 text-[#ff4d6d]">{message}</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="p-3 border-2 border-[#ffb3c1] rounded-lg text-lg mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-[#ff4d6d] text-white border-none px-8 py-4 text-lg rounded-full cursor-pointer shadow-md hover:bg-[#ff85a1] transition-all duration-200 ease-in-out"
      >
        Confirm Date!
      </button>
    </div>
  );
};

export default DateSelection;
