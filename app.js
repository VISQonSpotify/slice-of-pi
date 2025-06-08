let tipJarAmount = 0;
let totalRevenue = 0;
let liquidityPool = 1;
let flipping = false;
let userAddress = null;
let testnet = false;

// Updated app wallet with your Pi Developer Wallet address
const appWallet = 'GA3XS66QZEJB22SFC57JZAPAXUJFDKXS7M4EG47JQLXFCMAK6HLJD2Y5';

const coin = document.getElementById('coin');
const flipBtn = document.getElementById('flipBtn');
const tipJar = document.getElementById('tipJar');
const verifyPaymentBtn = document.getElementById('verifyPaymentBtn');
const verifyStatus = document.getElementById('verifyStatus');
const themeSelector = document.getElementById('themeSelector');
const adminDashboard = document.getElementById('adminDashboard');
const userWalletSpan = document.getElementById('userWallet');
const modeToggle = document.getElementById('modeToggle');
const currentModeSpan = document.getElementById('currentMode');
const loginContainer = document.getElementById('loginContainer');
const appContainer = document.getElementById('appContainer');
const loginBtn = document.getElementById('loginBtn');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#eee';
    coin.style.backgroundColor = '#ffcc00';
    coin.style.color = '#222';
    flipBtn.style.backgroundColor = '#333';
    flipBtn.style.color = '#eee';
  } else {
    document.body.style.backgroundColor = '#f7f5f0';
    document.body.style.color = '#222';
    coin.style.backgroundColor = '#ffd633';
    coin.style.color = '#222';
    flipBtn.style.backgroundColor = '#222';
    flipBtn.style.color = '#fff';
  }
}

themeSelector.addEventListener('change', e => applyTheme(e.target.value));
applyTheme('light');

function updateAdminDashboard() {
  adminDashboard.children[0].textContent = `Total Revenue: ${totalRevenue.toFixed(2)} π`;
  adminDashboard.children[1].textContent = `Liquidity Pool: ${liquidityPool.toFixed(2)} π`;
  userWalletSpan.textContent = userAddress || 'Not connected';
  currentModeSpan.textContent = testnet ? 'Testnet' : 'Mainnet';
}

function updateTipJar() {
  tipJar.textContent = `Tip Jar: ${tipJarAmount.toFixed(2)} π`;
  tipJar.classList.add('blink');
  setTimeout(() => tipJar.classList.remove('blink'), 1200);
}

async function loginUser() {
  if (!window.Pi) {
    alert('Please open Slice of Pi inside the Pi Browser app.');
    return false;
  }
  try {
    const isAuthorized = await window.Pi.isAuthorized();
    if (!isAuthorized) {
      await window.Pi.requestAuthorization();
    }
    userAddress = await window.Pi.getAccount();
    updateAdminDashboard();
    // Show main UI
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';
    flipBtn.disabled = false;
    flipBtn.textContent = 'Flip Coin';
    appContainer.focus();
    return true;
  } catch (err) {
    alert('Pi wallet authorization failed or was cancelled.');
    return false;
  }
}

async function sendPiTransaction(to, amount, memo) {
  if (testnet) {
    // Simulated transaction on testnet mode
    console.log(`[TESTNET] Sending ${amount} Pi to ${to} with memo "${memo}"`);
    return true;
  }
  if (!window.Pi) {
    alert('Pi SDK not found. Use Pi Browser.');
    return false;
  }
  try {
    const res = await window.Pi.sendTransaction({
      recipient: to,
      amount: amount,
      memo: memo
    });
    console.log('Transaction sent:', res);
    return true;
  } catch (e) {
    console.error('Transaction error:', e);
    alert('Transaction failed or cancelled.');
    return false;
  }
}

async function flipCoin() {
  if (flipping) return;
  flipping = true;
  flipBtn.disabled = true;
  coin.classList.add('flipping');

  try {
    // Send bet of 0.01 Pi to liquidity pool wallet
    const betAmount = 0.01;

    const betSuccess = await sendPiTransaction(appWallet, betAmount, 'Slice of Pi bet');
    if (!betSuccess) throw new Error('Bet transaction failed');

    // Wait flip animation
    await new Promise(r => setTimeout(r, 1000));

    // Determine random outcome
    const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
    alert(`Coin landed on ${outcome}!`);

    // Simulated payout (payout > bet to simulate win)
    const payoutAmount = 0.018;
    const payoutSuccess = await sendPiTransaction(userAddress, payoutAmount, 'Slice of Pi payout');
    if (!payoutSuccess) throw new Error('Payout transaction failed');

    // Update local state
    totalRevenue += betAmount;
    tipJarAmount += 0.005;
    liquidityPool += (betAmount - payoutAmount);
    updateTipJar();
    updateAdminDashboard();

  } catch (error) {
    alert('Error during coin flip: ' + error.message);
  } finally {
    flipping = false;
    flipBtn.disabled = false;
    coin.classList.remove('flipping');
  }
}

modeToggle.addEventListener('click', () => {
  testnet = !testnet;
  modeToggle.textContent = testnet ? 'Switch to Mainnet' : 'Switch to Testnet';
  updateAdminDashboard();
  console.log(`Switched to ${testnet ? 'Testnet' : 'Mainnet'}`);
});

// Only login when user clicks login button
loginBtn.addEventListener('click', loginUser);

// Flip coin or connect wallet on flip button click (only works after login)
flipBtn.addEventListener('click', flipCoin);

coin.addEventListener('click', flipCoin);

// Verification payment button handler
verifyPaymentBtn.addEventListener('click', async () => {
  if (!window.Pi) {
    alert('Please open inside Pi Browser to send verification payment.');
    return;
  }
  try {
    verifyPaymentBtn.disabled = true;
    verifyStatus.textContent = 'Waiting for payment confirmation...';
    await window.Pi.sendTransaction({
      recipient: appWallet,
      amount: 0.0001,
      memo: 'App ownership verification'
    });
    verifyStatus.textContent = 'Payment sent! Verification should complete soon.';
  } catch (e) {
    verifyStatus.textContent = 'Payment failed or cancelled.';
  } finally {
    verifyPaymentBtn.disabled = false;
  }
});
