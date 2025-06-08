import React, { useEffect, useState } from "react";

const WalletConnect = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    if (!window.Pi) {
      alert("Pi Network SDK not found. Please open in Pi Browser.");
      return;
    }

    try {
      const scopes = ["payments"];
      const result = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(result.user);
    } catch (error) {
      console.error("Pi Authentication Error:", error);
      alert("Authentication failed.");
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment found:", payment);
    // Optional: handle restoring payment status
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <button onClick={handleSignIn}>Sign in with Pi</button>
      )}
    </div>
  );
};

export default WalletConnect;
