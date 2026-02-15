import React, { useEffect, useState } from 'react';
import '../styles/KissExplosion.css';

const KissExplosion = () => {
  const [emojis, setEmojis] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    // Create kiss emojis
    const newEmojis = [];
    for (let i = 0; i < 50; i++) {
      newEmojis.push({
        id: `kiss-${i}`,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 4,
        delay: i * 0.1
      });
    }
    setEmojis(newEmojis);

    // Create confetti
    const newConfetti = [];
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: `confetti-${i}`,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 4,
        width: Math.random() * 15 + 5,
        height: Math.random() * 15 + 5,
        color: ['#ff80ab', '#ec407a', '#f8bbd0', '#ffcc00', '#4caf50'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360
      });
    }
    setConfetti(newConfetti);

    // Show final message after delay
    const messageTimer = setTimeout(() => {
      setShowFinalMessage(true);
    }, 3000);

    // Play kiss sound
    playKissSound();

    return () => {
      clearTimeout(messageTimer);
    };
  }, []);

  const playKissSound = () => {
    try {
      // Create audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for kiss sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log("Could not play kiss sound:", e);
    }
  };

  return (
    <div className="kiss-explosion">
      {/* Kiss Emojis */}
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="kiss-emoji"
          style={{
            left: `${emoji.left}vw`,
            animationDuration: `${emoji.duration}s`,
            animationDelay: `${emoji.delay}s`
          }}
        >
          💋
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}vw`,
            backgroundColor: piece.color,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`
          }}
        />
      ))}

      {/* Final Message */}
      {showFinalMessage && (
        <div className="final-message">
          <h2>Check your [WhatsApp/Doorstep/Email] for your real gift! I love you!</h2>
        </div>
      )}
    </div>
  );
};

export default KissExplosion;