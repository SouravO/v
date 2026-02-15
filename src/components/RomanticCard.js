import React from 'react';

const RomanticCard = ({ onNext, selectedDate }) => { // Accept selectedDate prop
  const handleYesClick = () => {
    onNext();
  };

  return (
    <div className="text-center p-8 max-w-xl min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl border-3 border-[#ffb3c1] w-4/5 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#ff4d6d]">
          So, you're forgiving me and going on a date? <br/>
          To confirm: a special date with me on <span className="font-extrabold">{selectedDate}</span>?
        </h2>
        <button id="finalYesButton" className="bg-gradient-to-r from-[#ff4d6d] to-[#ff85a1] text-white border-none px-10 py-4 text-xl rounded-full cursor-pointer mt-5 shadow-lg" onClick={handleYesClick}>
          YES! It's a Date! 💖
        </button>
      </div>
    </div>
  );
};

export default RomanticCard;
