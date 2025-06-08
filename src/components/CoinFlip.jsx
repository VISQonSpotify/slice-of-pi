import React, { useState } from 'react';

const CoinFlip = ({ walletInfo }) => {
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [message, setMessage] = useState('');
  const [betAmount, setBetAmount] = useState(0.01);

  const flipCoin = () => {
    const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
    return outcome;
  };

  const handleFlip = async () => {
    if (!choice) {
      setMessage('Choose heads or tails first!');
      return;
    }

    setIsFlipping(true);
    setMessage('');

    const outcome = flipCoin();
    setResult(outcome);

    const win = outcome === choice;

    if (win) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const payout = betAmount * Math.pow(2, newStreak);
      setMessage(`🎉 You won! Streak: ${newStreak}. Payout: ${payout.toFixed(2)} Pi`);

      // TODO: Trigger backend payment via Pi SDK here
    } else {
      setMessage(`❌ You lost. Streak ended. Better luck next time!`);
      setStreak(0);
    }

    setIsFlipping(false);
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
