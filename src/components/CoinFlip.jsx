import React, { useState } from "react";
import axios from "axios";

const CoinFlip = ({ walletInfo }) => {
  const [status, setStatus] = useState("Ready");
  const [result, setResult] = useState(null);

  const flipCoin = async () => {
    const amount = 0.01;
    const won = Math.random() < 0.5; // basic 50/50 flip
    const streak = 1; // adjust if implementing double-or-nothing

    setStatus("Flipping...");

    try {
      const payment = await window.Pi.createPayment({
        amount: amount.toString(),
        memo: `Coin flip game`,
        metadata: { type: "coin_flip", won },
        to: "your-pi-wallet-username", // <-- replace with YOUR Pi username
      });

      if (payment.status === "COMPLETED") {
        // Notify your backend
        const response = await axios.post("/flip-result", {
          username: walletInfo.username,
          amount,
          won,
          streak,
        });

        setResult(response.data);
        setStatus("Flip complete.");
      } else {
        setStatus("Payment cancelled.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setStatus("Error during flip.");
    }
  };

  return (
    <div>
      <p>Status: {status}</p>
      <button onClick={flipCoin}>Flip Coin (0.01 π)</button>
      {result && (
        <p>
          {result.success
            ? `You ${result.payout > 0 ? "won" : "lost"} ${result.payout} π!`
            : "Flip failed."}
        </p>
      )}
    </div>
  );
};

export default CoinFlip;
