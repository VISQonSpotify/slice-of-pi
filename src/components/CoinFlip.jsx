import React, { useState } from 'react';

const CoinFlip = ({ walletInfo }) => {
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [message, setMessage] = useState('');
  const [betAmount, setBetAmount] = useState(0.01);

  const flipCoin = () => {
    return Math.random() < 0.5 ? 'heads' : 'tails';
  };

  const handleFlip = async () => {
    if (!choice) {
      setMessage('Choose heads or tails first!');
      return;
    }

    setIsFlipping(true);
    setMessage('');

    const outcome = flipCoin();
    const didWin = outcome === choice;

    try {
      const response = await fetch('http://localhost:5000/flip-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: walletInfo.user.username,
          amount: betAmount,
          won: didWin,
          streak,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Backend error');
      }

      if (didWin) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setMessage(`🎉 You won! Result: ${outcome}. Streak: ${newStreak}. Payout: ${data.payout.toFixed(2)} Pi`);
      } else {
        setStreak(0);
        setMessage(`❌ You lost! Result: ${outcome}. Streak reset.`);
      }

      setResult(outcome);
    } catch (err) {
      console.error(err);
      setMessage(`⚠️ Error: ${err.message}`);
    } finally {
      setIsFlipping(false);
    }
  };

  const reset = () => {
    setChoice(null);
    setResult(null);
    setMessage('');
  };

  return (
    <div className="coin-flip-game">
      <h2>Welcome, @{walletInfo.user.username}</h2>

      <div className="choice-buttons">
        <button onClick={() => setChoice('heads')}>Heads</button>
        <button onClick={() => setChoice('tails')}>Tails</button>
      </div>

      <p>Your choice: <strong>{choice || '—'}</strong></p>

      <button onClick={handleFlip} disabled={isFlipping || !choice}>
        {isFlipping ? 'Flipping...' : 'Flip the Coin'}
      </button>

      {result && <p>🪙 Result: <strong>{result}</strong></p>}
      <p>{message}</p>

      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default CoinFlip;
