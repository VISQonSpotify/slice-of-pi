function calculatePayout(betAmount, streak) {
  const multiplier = Math.pow(2, streak);
  const payout = betAmount * multiplier;
  return { multiplier, payout };
}

function canPayout(liquidity, payout) {
  return liquidity >= payout;
}

module.exports = {
  calculatePayout,
  canPayout,
};
