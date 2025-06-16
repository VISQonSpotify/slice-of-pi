import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import CoinFlip from '@/components/CoinFlip';
import PiAuth from '@/components/PiAuth';
import DoubleOrNothing from '@/components/DoubleOrNothing';
import Leaderboard from '@/components/Leaderboard';
import AdminDashboard from '@/components/AdminDashboard';
import GameTabs from '@/components/GameTabs';

declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox: boolean }) => Promise<void>;
      authenticate: (scopes?: string[], config?: any) => Promise<any>;
      openChannel: () => Promise<any>;
      createPayment: (payment: any) => Promise<any>;
    };
  }
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastResult, setLastResult] = useState<'heads' | 'tails' | null>(null);
  const [piBalance, setPiBalance] = useState(0);
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard' | 'admin'>('game');
  
  // Double or Nothing state
  const [showDoubleOrNothing, setShowDoubleOrNothing] = useState(false);
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [doubleRound, setDoubleRound] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(0);
  
  // Admin settings
  const [adminSettings, setAdminSettings] = useState({
    defaultBetAmount: 1.0,
    payoutMultiplier: 1.9,
    maxDoubleRounds: 5,
    platformFeePercentage: 0.5,
    revenueAdminSplit: 70,
    revenueDeveloperSplit: 30,
  });

  // Game stats
  const [gameStats, setGameStats] = useState({
    totalFlips: 0,
    totalWins: 0,
    totalLosses: 0,
    totalPiEarned: 0,
    totalPiLost: 0,
    houseProfit: 0,
    longestStreak: 0,
    currentStreak: 0,
  });

  // Admin stats
  const [adminStats, setAdminStats] = useState({
    totalPlayers: 1,
    totalFlips: 0,
    totalRevenue: 0,
    liquidityPool: 100.0,
    dailyPlayers: 1,
  });

  // Leaderboard data
  const [leaderboardData, setLeaderboardData] = useState({
    dailyWinners: [] as Array<{username: string, value: number, piDomain?: string}>,
    longestStreaks: [] as Array<{username: string, value: number, piDomain?: string}>,
    mostFlips: [] as Array<{username: string, value: number, piDomain?: string}>,
  });

  // Check Pi Browser - Modified to allow testing in regular browsers
  useEffect(() => {
    const checkPiBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isPi = userAgent.includes('pi browser') || window.Pi !== undefined;
      
      // For development/testing purposes, always allow access
      // In production, you might want to enforce Pi Browser only
      setIsPiBrowser(true);
      
      if (!isPi) {
        console.log('Not in Pi Browser - using mock mode for development');
      }
    };

    checkPiBrowser();
  }, []);

  const handleAuthentication = async (userData: any) => {
    console.log('handleAuthentication called with:', userData);
    setIsAuthenticated(true);
    setUser(userData);
    setPiBalance(10.0);
    
    // Check if user is admin (for demo purposes)
    const isAdmin = userData.username === 'admin' || userData.username === 'TestPiUser';
    
    console.log('Authentication successful, user set to:', userData);
    
    toast({
      title: "welcome to slice of pi! 🥧",
      description: `hello ${userData.username}! ready to flip for pi?`,
    });
  };

  const handleCoinFlip = async () => {
    if (!isAuthenticated) {
      toast({
        title: "authentication required",
        description: "please sign in with pi network to play",
        variant: "destructive",
      });
      return;
    }

    if (piBalance < adminSettings.defaultBetAmount) {
      toast({
        title: "insufficient balance",
        description: `you need at least ${adminSettings.defaultBetAmount} pi to play`,
        variant: "destructive",
      });
      return;
    }

    setIsFlipping(true);
    
    try {
      // Deduct bet amount
      setPiBalance(prev => prev - adminSettings.defaultBetAmount);
      
      // Platform fee calculation
      const platformFee = adminSettings.defaultBetAmount * (adminSettings.platformFeePercentage / 100);
      
      setTimeout(async () => {
        try {
          const result = Math.random() < 0.5 ? 'heads' : 'tails';
          setLastResult(result);
          setIsFlipping(false);
          
          if (result === 'heads') {
            // User wins
            const payout = adminSettings.defaultBetAmount * adminSettings.payoutMultiplier;
            const netGain = payout - adminSettings.defaultBetAmount;
            
            setPiBalance(prev => prev + payout);
            setCurrentWinnings(payout);
            setCurrentStreak(prev => prev + 1);
            
            // Update stats
            setGameStats(prev => ({
              ...prev,
              totalFlips: prev.totalFlips + 1,
              totalWins: prev.totalWins + 1,
              totalPiEarned: prev.totalPiEarned + netGain,
              houseProfit: prev.houseProfit - netGain + platformFee,
              currentStreak: prev.currentStreak + 1,
              longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
            }));

            // Update admin stats
            setAdminStats(prev => ({
              ...prev,
              totalFlips: prev.totalFlips + 1,
              totalRevenue: prev.totalRevenue + platformFee,
              liquidityPool: prev.liquidityPool - netGain,
            }));
            
            toast({
              title: "🎉 you won!",
              description: `heads! you won ${payout.toFixed(2)} pi!`,
            });

            // Show Double or Nothing if max rounds not reached
            if (doubleRound <= adminSettings.maxDoubleRounds) {
              setTimeout(() => setShowDoubleOrNothing(true), 1000);
            }
            
          } else {
            // User loses
            setCurrentStreak(0);
            
            setGameStats(prev => ({
              ...prev,
              totalFlips: prev.totalFlips + 1,
              totalLosses: prev.totalLosses + 1,
              totalPiLost: prev.totalPiLost + adminSettings.defaultBetAmount,
              houseProfit: prev.houseProfit + adminSettings.defaultBetAmount,
              currentStreak: 0,
            }));

            setAdminStats(prev => ({
              ...prev,
              totalFlips: prev.totalFlips + 1,
              totalRevenue: prev.totalRevenue + platformFee,
              liquidityPool: prev.liquidityPool + (adminSettings.defaultBetAmount - platformFee),
            }));
            
            toast({
              title: "better luck next time! 💔",
              description: `tails! you lost ${adminSettings.defaultBetAmount} pi`,
              variant: "destructive",
            });
          }
          
        } catch (error) {
          console.error('Game processing error:', error);
          setPiBalance(prev => prev + adminSettings.defaultBetAmount);
          toast({
            title: "game error",
            description: "something went wrong. your bet has been refunded.",
            variant: "destructive",
          });
          setIsFlipping(false);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Coin flip error:', error);
      setPiBalance(prev => prev + adminSettings.defaultBetAmount);
      setIsFlipping(false);
      toast({
        title: "payment failed",
        description: "could not process your bet. please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDoubleOrNothing = async () => {
    setIsFlipping(true);
    
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      setLastResult(result);
      setIsFlipping(false);
      
      if (result === 'heads') {
        // Win - multiply winnings
        const newWinnings = currentWinnings * adminSettings.payoutMultiplier;
        setCurrentWinnings(newWinnings);
        setDoubleRound(prev => prev + 1);
        setCurrentStreak(prev => prev + 1);
        
        const netGain = newWinnings - currentWinnings;
        setPiBalance(prev => prev + netGain);
        
        setGameStats(prev => ({
          ...prev,
          totalWins: prev.totalWins + 1,
          totalPiEarned: prev.totalPiEarned + netGain,
          currentStreak: prev.currentStreak + 1,
          longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
        }));
        
        toast({
          title: "🚀 double win!",
          description: `amazing! your winnings are now ${newWinnings.toFixed(2)} pi!`,
        });

        // Continue if max rounds not reached
        if (doubleRound < adminSettings.maxDoubleRounds) {
          setTimeout(() => setShowDoubleOrNothing(true), 1000);
        } else {
          toast({
            title: "maximum rounds reached!",
            description: "congratulations! you've reached the maximum double rounds.",
          });
          handleCashOut();
        }
        
      } else {
        // Lose - lose all winnings
        setPiBalance(prev => prev - currentWinnings);
        setCurrentStreak(0);
        
        setGameStats(prev => ({
          ...prev,
          totalLosses: prev.totalLosses + 1,
          totalPiLost: prev.totalPiLost + currentWinnings,
          houseProfit: prev.houseProfit + currentWinnings,
          currentStreak: 0,
        }));
        
        toast({
          title: "💔 all or nothing!",
          description: `tails! you lost all ${currentWinnings.toFixed(2)} pi winnings.`,
          variant: "destructive",
        });
        
        resetDoubleOrNothing();
      }
    }, 2000);
  };

  const handleCashOut = () => {
    toast({
      title: "💰 cashed out!",
      description: `smart choice! you secured ${currentWinnings.toFixed(2)} pi!`,
    });
    resetDoubleOrNothing();
  };

  const resetDoubleOrNothing = () => {
    setShowDoubleOrNothing(false);
    setCurrentWinnings(0);
    setDoubleRound(1);
  };

  const handleUpdateAdminSettings = (settings: typeof adminSettings) => {
    setAdminSettings(settings);
    toast({
      title: "settings updated",
      description: "admin settings have been saved successfully.",
    });
  };

  const handleRefillPool = (amount: number) => {
    setAdminStats(prev => ({
      ...prev,
      liquidityPool: prev.liquidityPool + amount,
    }));
    toast({
      title: "pool refilled",
      description: `added ${amount} pi to liquidity pool.`,
    });
  };

  const handleWithdrawPool = (amount: number) => {
    if (adminStats.liquidityPool >= amount) {
      setAdminStats(prev => ({
        ...prev,
        liquidityPool: prev.liquidityPool - amount,
      }));
      toast({
        title: "withdrawal successful",
        description: `withdrew ${amount} pi from liquidity pool.`,
      });
    } else {
      toast({
        title: "insufficient liquidity",
        description: "not enough pi in the liquidity pool.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        
        {!isAuthenticated ? (
          <div className="text-center space-y-12">
            {/* Logo Header */}
            <div className="flex flex-col items-center space-y-4">
              <img 
                src="/lovable-uploads/bb6cb286-a393-4001-a185-df803348acda.png" 
                alt="slice of pi logo" 
                className="w-32 h-32 object-contain"
              />
              <div>
                <p className="text-amber-700 text-lg">flip a coin. win pi. simple.</p>
              </div>
            </div>
            
            <PiAuth onAuthenticate={handleAuthentication} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Clean Header with Logo */}
            <div className="text-center flex flex-col items-center space-y-6">
              <img 
                src="/lovable-uploads/bb6cb286-a393-4001-a185-df803348acda.png" 
                alt="slice of pi logo" 
                className="w-24 h-24 object-contain"
              />
              
              {/* Balance Display */}
              <div className="inline-block bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-sm border border-amber-200">
                <p className="text-amber-700 text-sm uppercase tracking-wider mb-1">balance</p>
                <p className="text-amber-900 font-medium text-2xl">{piBalance.toFixed(2)} π</p>
                {currentStreak > 0 && (
                  <p className="text-emerald-600 text-sm font-medium mt-1">
                    🔥 {currentStreak} win streak
                  </p>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <GameTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              isAdmin={user?.username === 'admin' || user?.username === 'TestPiUser'} 
            />

            {/* Game Content */}
            {activeTab === 'game' && (
              <div className="max-w-sm mx-auto space-y-8">
                <CoinFlip 
                  isFlipping={isFlipping}
                  lastResult={lastResult}
                  onFlip={handleCoinFlip}
                  betAmount={adminSettings.defaultBetAmount}
                  payout={adminSettings.defaultBetAmount * adminSettings.payoutMultiplier}
                />

                {/* Simple Stats Grid */}
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-amber-200">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <p className="text-amber-600 text-xs uppercase tracking-wider mb-2">total flips</p>
                      <p className="text-amber-900 font-semibold text-xl">{gameStats.totalFlips}</p>
                    </div>
                    <div>
                      <p className="text-amber-600 text-xs uppercase tracking-wider mb-2">win rate</p>
                      <p className="text-amber-900 font-semibold text-xl">
                        {gameStats.totalFlips > 0 ? ((gameStats.totalWins / gameStats.totalFlips) * 100).toFixed(0) : 0}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-amber-200">
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <p className="text-emerald-600 text-xs uppercase tracking-wider mb-2">pi earned</p>
                        <p className="text-emerald-700 font-semibold text-lg">+{gameStats.totalPiEarned.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-red-500 text-xs uppercase tracking-wider mb-2">pi lost</p>
                        <p className="text-red-600 font-semibold text-lg">-{gameStats.totalPiLost.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard 
                dailyWinners={leaderboardData.dailyWinners}
                longestStreaks={leaderboardData.longestStreaks}
                mostFlips={leaderboardData.mostFlips}
              />
            )}

            {activeTab === 'admin' && (user?.username === 'admin' || user?.username === 'TestPiUser') && (
              <AdminDashboard
                settings={adminSettings}
                stats={adminStats}
                onUpdateSettings={handleUpdateAdminSettings}
                onRefillPool={handleRefillPool}
                onWithdrawPool={handleWithdrawPool}
              />
            )}
          </div>
        )}

        {/* Double or Nothing Modal */}
        {showDoubleOrNothing && (
          <DoubleOrNothing
            currentWinnings={currentWinnings}
            round={doubleRound}
            onDouble={handleDoubleOrNothing}
            onCashOut={handleCashOut}
            onCancel={resetDoubleOrNothing}
            isFlipping={isFlipping}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
