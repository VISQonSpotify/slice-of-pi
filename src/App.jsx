import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import CoinFlip from './components/CoinFlip';

const App = () => {
  const [walletInfo, setWalletInfo] = useState(null);

  return (
    <div className="app-container">
      <header>
        <h1>🥧 Slice of Pi</h1>
        <p>Flip a coin. Win Pi. Simple.</p>
      </header>

      <main>
        {!walletInfo ? (
          <WalletConnect onConnect={setWalletInfo} />
        ) : (
          <CoinFlip walletInfo={walletInfo} />
        )}
      </main>

      <footer>
        <small>Built for the Pi Network ecosystem</small>
      </footer>
    </div>
  );
};

export default App;
