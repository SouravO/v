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
    <div className="text-center p-8 max-w-xl min-h-screen flex flex-col justify-center items-center">
      <h1 id="apologyText" className="text-3xl font-bold mb-8 text-[#ff4d6d]">
        My Dearest Love, I'm so sorry I missed Valentine's Day! <br/>
        Please forgive me and let me make it up to you with a special date?
      </h1>
      <div className="relative mt-8 w-full h-[500px]">
        <button
          id="yesButton"
          className="absolute bg-[#ff4d6d] text-white border-none px-8 py-4 text-lg rounded-full cursor-pointer m-2 shadow-md hover:bg-[#ff85a1] hover:scale-105 transition-all duration-200 ease-in-out"
          style={{
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
          className="absolute bg-[#adb5bd] text-white border-none px-8 py-4 text-lg rounded-full cursor-pointer m-2 shadow-md hover:bg-[#ff85a1] hover:scale-105 transition-all duration-200 ease-in-out"
          style={{
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

export default ApologySection;