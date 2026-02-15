import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// --- SUB-COMPONENT: SCRATCH CARD ---
const ScratchBox = ({ reward, onScratch }) => {
  const [scratched, setScratched] = useState(false);
  return (
    <div 
      onClick={() => {
        if (!scratched) {
          setScratched(true);
          onScratch(reward);
          confetti({ particleCount: 15, spread: 40, origin: { y: 0.8 }, colors: ['#ff4d6d'] });
        }
      }}
      style={{
        ...styles.scratchCardMini,
        ...(scratched ? styles.scratchCardRevealed : {})
      }}
    >
      {!scratched ? (
        <div style={styles.scratchOverlayMini}>
          <div style={styles.silverTexture}>SCRATCH</div>
        </div>
      ) : (
        <div style={styles.rewardTextMini}>{reward}</div>
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [phase, setPhase] = useState('loading');
  const [progress, setProgress] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noStyle, setNoStyle] = useState({});
  const [yesScale, setYesScale] = useState(1);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hackerText, setHackerText] = useState('');
  
  // DATA COLLECTION
  const [upgrades, setUpgrades] = useState({ patience: 50, romance: 50, naughty: 50 });
  const [targetDate, setTargetDate] = useState('');
  const [displayDate, setDisplayDate] = useState(new Date().toLocaleDateString());
  const [scratchedItems, setScratchedItems] = useState([]);
  const [showBedroomModal, setShowBedroomModal] = useState(false);

  const phrases = ["No", "Are you sure?", "Really sure??", "Think again!", "Last chance!", "Surely not?", "💔", "😭", "PLEASEEE", "Error 404"];

  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { clearInterval(interval); setTimeout(() => setPhase('prank'), 800); return 100; }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }

    if (phase === 'hacker') {
      const lines = [
        "> Initializing Boyfriend_Upgrade_V4.0...",
        "> Optimizing delivery route... to your heart ❤️",
        "> WARNING: Naughty levels exceeding safety limits...",
        "> Deleting all 'Late' excuses from memory...",
        "> SUCCESS: Sourav is now the Perfect Version."
      ];
      let i = 0;
      const hackInterval = setInterval(() => {
        if (i < lines.length) { setHackerText(prev => prev + lines[i] + "\n"); i++; } 
        else { clearInterval(hackInterval); setTimeout(() => setPhase('calendar'), 1000); }
      }, 600);
      return () => clearInterval(hackInterval);
    }

    if (phase === 'warping') {
      let count = 0;
      const warpInterval = setInterval(() => {
        const tempDate = new Date();
        tempDate.setDate(tempDate.getDate() + count);
        setDisplayDate(tempDate.toLocaleDateString());
        count++;
        if (count > 25) {
          clearInterval(warpInterval);
          setDisplayDate(new Date(targetDate).toLocaleDateString());
          confetti({ particleCount: 200, spread: 100 });
          setTimeout(() => setPhase('final-choice'), 1500);
        }
      }, 80);
      return () => clearInterval(warpInterval);
    }

    // WILD CELEBRATION LOGIC
    if (phase === 'success') {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [phase, targetDate]);

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 150);
    setNoStyle({ position: 'fixed', left: `${x}px`, top: `${y}px`, zIndex: 999 });
    setNoCount(noCount + 1);
    setMessageIndex(noCount % phrases.length);
    setYesScale(prev => prev + 0.15);
  };

  const handleSendWhatsApp = () => {
    // Assistant's commentary based on her slider choices
    const patienceAdvice = upgrades.patience > 80 
      ? "She's set your patience to 'Saint Level,' so don't you dare snap! 😇" 
      : "She knows you're a bit of a brat, so keep that temper in check. 😈";
    
    const romanceAdvice = upgrades.romance > 80 
      ? "She wants the full Bollywood experience—flowers, slow-mo, the works. 🌹" 
      : "Keep it smooth and classic, Sourav. No pressure. 😎";

    const naughtyAdvice = upgrades.naughty > 80 
      ? "Warning: She cranked the heat to 100%. I hope you've been working out. 🔞🔥" 
      : "She's keeping it spicy, but play it cool... for now. 🌶️";

    const summary = `
🤖 *ASSISTANT PROTOCOL: MISSION "FORGIVE SOURAV"*
------------------------------------------
Hey Sourav, the boss has spoken! I’ve analyzed her upgrades and here’s your briefing for ${new Date(targetDate).toDateString()}:

🛠️ *YOUR RE-CONFIGURATION:*
• ${patienceAdvice}
• ${romanceAdvice}
• ${naughtyAdvice}

📍 *THE MISSION LOG:*
She skipped the movies and dinner—her "heart logic" (with a little help from me) locked in the *BEDROOM* 🫦 as the final destination. 

🎁 *THE PENALTY LIST (NO EXCUSES!):*
You've been ordered to provide:
${scratchedItems.length > 0 ? scratchedItems.map(i => `• ${i}`).join('\n') : "• Total Submission. 😈"}

_Assistant Note: She's waiting. Don't be late again or I'm deleting your admin access!_ ✅
    `.trim();
    
   // Replace 91XXXXXXXXXX with your actual mobile number
window.location.href = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(summary)}`;
};
  return (
    <div style={styles.container}>
      <style>{animations}</style>

      {/* PHASE 1: LOADING */}
      {phase === 'loading' && (
        <div style={styles.card}>
          <div style={styles.spinner}>💖</div>
          <h2 style={styles.title}>System Apology Update</h2>
          <div style={styles.progressBarOuter}><div style={{ ...styles.progressBarInner, width: `${progress}%` }} /></div>
          <p>{progress}% - Syncing with her heart...</p>
        </div>
      )}

      {/* PHASE 2: PRANK */}
      {phase === 'prank' && (
        <div style={styles.card}>
          <div style={{fontSize: '60px', animation: 'float 3s infinite'}}>💝</div>
          <h2 style={styles.title}>I know I'm a bit late...</h2>
          <p style={styles.text}>Will you still be my Valentine?</p>
          <div style={styles.buttonGroup}>
            <button onClick={() => setPhase('configurator')} style={{ ...styles.btnYes, transform: `scale(${yesScale})` }}>YES! 🌹</button>
            <button onMouseEnter={moveNoButton} onClick={moveNoButton} style={{ ...styles.btnNo, ...noStyle }}>{phrases[messageIndex]}</button>
          </div>
        </div>
      )}

      {/* PHASE 3: CONFIGURATOR */}
      {phase === 'configurator' && (
        <div style={styles.card}>
          <h2 style={styles.title}>Upgrade Your Sourav</h2>
          <div style={styles.sliderGroup}>
            <label style={styles.label}>Patience: {upgrades.patience}%</label>
            <input type="range" style={styles.slider} value={upgrades.patience} onChange={(e) => setUpgrades({...upgrades, patience: e.target.value})} />
            <label style={styles.label}>Romance: {upgrades.romance}%</label>
            <input type="range" style={styles.slider} value={upgrades.romance} onChange={(e) => setUpgrades({...upgrades, romance: e.target.value})} />
            <label style={styles.label}>Naughtiness: {upgrades.naughty}%</label>
            <input type="range" style={styles.slider} value={upgrades.naughty} onChange={(e) => setUpgrades({...upgrades, naughty: e.target.value})} />
          </div>
          <button onClick={() => setPhase('success')} style={{...styles.btnYes, width: '100%', marginTop: '20px'}}>SAVE SETTINGS</button>
        </div>
      )}

      {/* PHASE 4: SUCCESS (WILD CELEBRATION) */}
      {phase === 'success' && (
        <div style={{...styles.card, animation: 'heartbeat 1s infinite alternate'}}>
          <div style={{fontSize: '5rem', animation: 'bounceSuccess 0.5s infinite alternate'}}>🏆</div>
          <h2 style={{...styles.title, fontSize: '2rem'}}>VICTORY! ❤️</h2>
          <div style={styles.wildBadge}>CHAMPION OF MY HEART</div>
          <p style={styles.text}>
            Congratulations! <br/>
            <strong style={{color: '#ff4d6d', fontSize: '1.2rem'}}>You are my Valentine.</strong>
          </p>
          <div style={styles.sparkleRow}>✨💖✨💖✨</div>
          <button 
            onClick={() => setPhase('hacker')} 
            style={{...styles.btnYes, marginTop: '20px', width: '100%', boxShadow: '0 0 20px #ff4d6d'}}
          >
            CONTINUE TO CRAZINESS 🌀
          </button>
        </div>
      )}

      {/* PHASE 5: HACKER */}
      {phase === 'hacker' && (
        <div style={{...styles.card, backgroundColor: '#000', border: '2px solid #0f0'}}>
          <pre style={styles.hackerBox}>{hackerText}</pre>
        </div>
      )}

      {/* PHASE 6: CALENDAR SELECT */}
      {phase === 'calendar' && (
        <div style={styles.card}>
          <h2 style={styles.title}>Pick a Day for a date 📅</h2>
          <input type="date" style={styles.dateInput} onChange={(e) => setTargetDate(e.target.value)} />
          <button disabled={!targetDate} onClick={() => setPhase('warping')} style={{...styles.btnYes, width: '100%', marginTop: '20px', opacity: targetDate ? 1 : 0.5}}>CONFIRM</button>
        </div>
      )}

      {/* PHASE 7: WARP */}
      {phase === 'warping' && (
        <div style={styles.card}>
          <h2 style={styles.title}>Fast Forwarding... 🚀</h2>
          <div style={styles.warpText}>{displayDate}</div>
        </div>
      )}

      {/* PHASE 8: THE CHOICE WITH REDIRECT MODAL */}
      {phase === 'final-choice' && (
        <div style={styles.card}>
          <h2 style={styles.title}>Hooray! It's {new Date(targetDate).toDateString()}! 🎉</h2>
          <p style={styles.text}>What's the plan for today?</p>
          <div style={styles.choiceGrid}>
            {['Movie 🎬', 'Candle Light 🕯️', 'Bedroom 🫦'].map(choice => (
              <button key={choice} style={styles.btnChoice} onClick={() => setShowBedroomModal(true)}>
                {choice}
              </button>
            ))}
          </div>

          {showBedroomModal && (
            <div style={styles.modalOverlay}>
              <div style={styles.modalContent}>
                <div style={{fontSize: '50px'}}>🎯</div>
                <h2 style={{color: '#ff4d6d', margin: '10px 0'}}>Excellent Choice!</h2>
                <p style={{color: '#333', fontWeight: 'bold'}}>
                  The system detected your heart actually wanted the 
                  <span style={{color: '#ff4d6d', display: 'block', fontSize: '1.5rem', marginTop: '5px'}}>BEDROOM 🫦</span>
                </p>
                <button 
                  onClick={() => { setShowBedroomModal(false); setPhase('naughty-coupon'); }} 
                  style={{...styles.btnYes, width: '100%', marginTop: '20px', fontSize: '1.1rem'}}
                >
                  ENTER THE BEDROOM 🔓
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 9: SCRATCH & WA */}
      {phase === 'naughty-coupon' && (
        <div style={styles.card}>
          <h2 style={styles.title}>Bedroom Penalties For Destroying Valentine's Day 🎉</h2>
          <div style={styles.scratchGrid}>
            {["Full Body Massage", "Waterfall massage", "Watermellon Juice", "Nute🙈lla in Bed"].map((r, i) => (
              <ScratchBox key={i} reward={r} onScratch={(res) => setScratchedItems(prev => [...prev, res])} />
            ))}
          </div>
          <button onClick={handleSendWhatsApp} style={styles.btnWa}>Sourav is waiting</button>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: { height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffe5ec', fontFamily: 'cursive', textAlign: 'center', overflow: 'hidden' },
  card: { padding: '25px', borderRadius: '30px', backgroundColor: 'white', boxShadow: '0 20px 50px rgba(255, 77, 109, 0.3)', maxWidth: '380px', width: '90%', position: 'relative' },
  title: { color: '#ff4d6d', fontSize: '1.4rem', marginBottom: '10px' },
  text: { color: '#555', fontSize: '0.85rem' },
  wildBadge: { backgroundColor: '#ff4d6d', color: 'white', padding: '5px 15px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' },
  sparkleRow: { display: 'flex', justifyContent: 'space-around', fontSize: '1.2rem', margin: '10px 0' },
  buttonGroup: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', minHeight: '120px' },
  btnYes: { padding: '12px 25px', backgroundColor: '#ff4d6d', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' },
  btnNo: { padding: '10px 20px', backgroundColor: '#adb5bd', color: 'white', border: 'none', borderRadius: '10px' },
  sliderGroup: { textAlign: 'left', marginTop: '10px' },
  label: { fontSize: '0.75rem', color: '#ff4d6d', fontWeight: 'bold', display: 'block', marginTop: '8px' },
  slider: { width: '100%', accentColor: '#ff4d6d' },
  hackerBox: { textAlign: 'left', color: '#0f0', fontSize: '0.7rem', backgroundColor: '#111', padding: '15px', borderRadius: '10px', height: '150px', overflowY: 'auto', fontFamily: 'monospace' },
  dateInput: { width: '100%', padding: '15px', borderRadius: '15px', border: '2px solid #ff4d6d', marginTop: '10px', outline: 'none' },
  warpText: { fontSize: '2rem', fontWeight: 'bold', color: '#ff4d6d', margin: '20px 0' },
  choiceGrid: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' },
  btnChoice: { padding: '15px', borderRadius: '15px', border: '2px solid #ff4d6d', backgroundColor: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  scratchGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' },
  scratchCardMini: { height: '60px', backgroundColor: '#1a1a1a', borderRadius: '12px', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  scratchOverlayMini: { position: 'absolute', inset: 0, backgroundColor: '#c0c0c0', color: '#777', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.6rem' },
  rewardTextMini: { color: '#ff4d6d', fontSize: '0.6rem', fontWeight: 'bold' },
  btnWa: { marginTop: '20px', width: '100%', padding: '15px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
  spinner: { fontSize: '40px', animation: 'spin 2s linear infinite' },
  progressBarOuter: { height: '10px', backgroundColor: '#ffd1dc', borderRadius: '10px', margin: '15px 0' },
  progressBarInner: { height: '100%', backgroundColor: '#ff4d6d', borderRadius: '10px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 229, 236, 0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, animation: 'fadeIn 0.3s ease-out' },
  modalContent: { backgroundColor: 'white', padding: '40px 30px', borderRadius: '40px', boxShadow: '0 0 100px rgba(255, 77, 109, 0.5)', maxWidth: '320px', width: '85%', textAlign: 'center', border: '3px solid #ff4d6d', animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }
};

const animations = `
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes heartbeat { from { transform: scale(1); } to { transform: scale(1.05); } }
@keyframes bounceSuccess { from { transform: translateY(0); } to { transform: translateY(-15px); } }
`;

export default App;