import React from 'react';

// This assumes the Pi SDK is already loaded via the Pi Browser
const WalletConnect = ({ onConnect }) => {
  const handleLogin = async () => {
    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes, (result) => {
        console.log('Approved scopes: ', result);
      });

      if (authResult) {
        onConnect(authResult); // Pass wallet info up to App
      }
    } catch (error) {
      console.error('Wallet login failed:', error);
      alert('Pi Wallet login failed. Make sure you’re using the Pi Browser.');
    }
  };

  return (
    <div className="wallet-connect">
      <h2>Connect Your Pi Wallet</h2>
      <button onClick={handleLogin}>Login with Pi</button>
    </div>
  );
};

export default WalletConnect;
