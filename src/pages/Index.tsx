import { useState } from "react";
import { PiAuth } from "../components/PiAuth";
import { GameTabs } from "../components/GameTabs";
import { Leaderboard } from "../components/Leaderboard";
import { AdminDashboard } from "../components/AdminDashboard";

const Index = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAuth = (userData) => {
    setUser(userData);
    // Check if user is admin (you might want to implement proper admin check)
    setIsAdmin(userData?.uid === "admin");
  };

  const handleSignOut = () => {
    setUser(null);
    setIsAdmin(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <PiAuth onAuth={handleAuth} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🥧 Slice of Pi</h1>
          <p className="text-gray-600">Welcome back, {user.username}!</p>
        </header>

        {isAdmin ? (
          <AdminDashboard onSignOut={handleSignOut} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <GameTabs user={user} />
            </div>
            <div>
              <Leaderboard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
