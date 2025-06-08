const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const liquidityPool = {
  balance: 100, // starting pool in Pi (for simulation)
};

// Temporary in-memory log
const gameLogs = [];

app.get('/', (req, res) => {
  res.send('🟢 Slice of Pi Backend is running.');
});

app.post('/flip-result', (req, res) => {
  const { username, amount, won, streak } = req.body;

  const payout = won ? amount * Math.pow(2, streak) : 0;

  if (won && liquidityPool.balance < payout) {
    return res.status(400).json({ error: 'Not enough Pi in the pool.' });
  }

  if (won) {
    liquidityPool.balance -= payout;
  }

  gameLogs.push({
    username,
    amount,
    won,
    streak,
    payout,
    time: Date.now(),
  });

  res.json({ success: true, payout });
});

app.get('/admin/stats', (req, res) => {
  res.json({
    liquidity: liquidityPool.balance,
    totalGames: gameLogs.length,
    recentGames: gameLogs.slice(-5).reverse(),
  });
});

app.listen(port, () => {
  console.log(`Slice of Pi backend listening on port ${port}`);
});
