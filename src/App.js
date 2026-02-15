import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import ApologySection from './components/ApologySection';
import DateSelection from './components/DateSelection';
import RomanticCard from './components/RomanticCard';

const App = () => {
  const [phase, setPhase] = useState('loading');
  const [progress, setProgress] = useState(0);
  const [noCount, setNoCount] = useState(0); 
  const [noStyle, setNoStyle] = useState({}); 
  const [yesScale, setYesScale] = useState(1); 
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            setTimeout(() => {
              setPhase('apology');
            }, 800);
            return 99;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth * 0.7);
    const y = Math.random() * (window.innerHeight * 0.7);
    setNoStyle({
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      transition: '0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
      zIndex: 999
    });
    setNoCount(noCount + 1);
    setYesScale(prev => prev + 0.2);
  };

  const triggerKisses = () => {
    const end = Date.now() + (6 * 1000);

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff4d6d', '#ff0000', '#ff85a1'],
        shapes: ['circle']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#ff4d6d', '#ff0000', '#ff85a1'],
        shapes: ['circle']
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleApologyComplete = () => {
    setPhase('dateSelection');
  };

  const handleDateSelectionComplete = (date) => {
    setSelectedDate(date);
    setPhase('romanticCard');
  };

  const handleRomanticCardComplete = () => {
    setPhase('success');
    triggerKisses();
  };

  return (
    <div style={styles.container}>
      {/* MAIN CONTENT */}
      {phase === 'loading' && (
        <div style={styles.card}>
          <h2 style={styles.title}>Booting "Super Boyfriend" Mode...</h2>
          <div style={styles.progressBarOuter}>
            <div style={{ ...styles.progressBarInner, width: `${progress}%` }} />
          </div>
          <p>{progress}%</p>
        </div>
      )}

      {phase === 'apology' && (
        <ApologySection onNext={handleApologyComplete} />
      )}

      {phase === 'dateSelection' && (
        <DateSelection onNext={handleDateSelectionComplete} />
      )}

      {phase === 'romanticCard' && (
        <RomanticCard onNext={handleRomanticCardComplete} selectedDate={selectedDate} />
      )}

      {phase === 'success' && (
        <div style={styles.card}>
          <h1 style={{fontSize: '4rem'}}>💋</h1>
          <h2 style={styles.title}>SUCCESS!</h2>
          <p style={styles.text}>The contract is signed! You are my Valentine forever. ❤️</p>
          <p style={styles.text}>Our date is set for: <strong style={styles.boldText}>{selectedDate}</strong>!</p>
          <div style={styles.statsBox}>
            <p><strong>Kisses Owed:</strong> 1,000,000+</p>
            <p><strong>Lemon Farming Help:</strong> Mandatory</p>
          </div>
        </div>
      )}

      {/* BOTTOM TICKER */}
      <div style={styles.ticker}>
        I LOVE YOU MORE THAN LEMONS • PLEASE SAY YES • SORRY I'M LATE • YOU ARE BEAUTIFUL •
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f3',
    fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
    margin: 0,
    overflow: 'hidden',
    position: 'relative'
  },
  card: {
    padding: '40px',
    borderRadius: '30px',
    backgroundColor: 'white',
    boxShadow: '0 20px 50px rgba(255, 77, 109, 0.3)',
    maxWidth: '420px',
    width: '90%',
    zIndex: 10,
    border: '4px solid #ffb3c1'
  },
  title: { color: '#ff4d6d', fontSize: '1.8rem' },
  text: { color: '#666', fontSize: '1.1rem' },
  progressBarOuter: {
    width: '100%',
    height: '15px',
    backgroundColor: '#ffe5ec',
    borderRadius: '20px',
    margin: '20px 0'
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: '#ff4d6d',
    borderRadius: '20px',
    transition: 'width 0.1s linear'
  },
  buttonGroup: {
    marginTop: '40px',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnYes: {
    padding: '15px 40px',
    backgroundColor: '#ff4d6d',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    boxShadow: '0 8px 20px rgba(255, 77, 109, 0.4)',
    zIndex: 20
  },
  btnNo: {
    padding: '10px 25px',
    backgroundColor: '#adb5bd',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  },
  statsBox: {
    background: '#fff0f3',
    padding: '15px',
    borderRadius: '15px',
    marginTop: '20px',
    textAlign: 'left'
  },
  ticker: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffb3c1',
    color: '#ff4d6d',
    padding: '10px 0',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap'
  },
  boldText: { // Added style for strong tag in success message
    fontWeight: 'bold'
  }
};

export default App;