const express = require('express');
const cors = require('cors');
const { calculatePayout, canPayout } = require('./logic/payout');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const liquidityPool = {
  balance: 100, // Starting liquidity in Pi (for testing)
};

const gameLogs = [];

app.get('/', (req, res) => {
  res.send('🟢 Slice of Pi backend is running.');
});

app.post('/flip-result', (req, res) => {
  const { username, amount, won, streak } = req.body;

  if (!username || typeof amount !== 'number' || typeof won !== 'boolean' || typeof streak !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid game data.' });
  }

  const { payout } = calculatePayout(amount, streak);

  if (won && !canPayout(liquidityPool.balance, payout)) {
    return res.status(400).json({ error: 'Insufficient liquidity for payout.' });
  }

  if (won) {
    liquidityPool.balance -= payout;
  }

  gameLogs.push({
    username,
    amount,
    won,
    streak,
    payout: won ? payout : 0,
    timestamp: Date.now(),
  });

  res.json({ success: true, payout: won ? payout : 0 });
});

app.get('/admin/stats', (req, res) => {
  res.j
