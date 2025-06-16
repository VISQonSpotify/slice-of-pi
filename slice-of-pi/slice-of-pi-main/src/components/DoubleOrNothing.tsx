
import React from 'react';
import { Button } from '@/components/ui/button';

interface DoubleOrNothingProps {
  currentWinnings: number;
  round: number;
  onDouble: () => void;
  onCashOut: () => void;
  onCancel: () => void;
  isFlipping: boolean;
}

const DoubleOrNothing = ({ 
  currentWinnings, 
  round, 
  onDouble, 
  onCashOut, 
  onCancel,
  isFlipping 
}: DoubleOrNothingProps) => {
  const nextWinnings = currentWinnings * 1.9;
  const winChance = Math.pow(0.5, round);
  const winPercentage = (winChance * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border-2 border-orange-200 animate-scale-in">
        {/* Animated pie banner */}
        <div className="text-6xl mb-4 animate-bounce">🥧</div>
        
        <h2 className="text-2xl font-bold text-orange-900 mb-4">
          sweet victory! 🎉
        </h2>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-orange-200">
          <p className="text-orange-900 font-bold text-xl mb-2">
            current winnings: {currentWinnings.toFixed(2)} π
          </p>
          <p className="text-orange-700 text-sm">
            round {round} • win chance: {winPercentage}%
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-orange-900 mb-3">
            🎲 risk it all to double your pi?
          </h3>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-orange-200">
            <p className="text-orange-900 font-bold text-lg">
              next win: {nextWinnings.toFixed(2)} π
            </p>
            <p className="text-red-600 text-sm font-medium">
              lose: everything (0 π)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onDouble}
            disabled={isFlipping}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 text-lg rounded-full shadow-lg"
          >
            {isFlipping ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                flipping...
              </div>
            ) : (
              `double or nothing!`
            )}
          </Button>
          
          <Button
            onClick={onCashOut}
            disabled={isFlipping}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 text-lg rounded-full shadow-lg"
          >
            💰 cash out {currentWinnings.toFixed(2)} π
          </Button>
          
          <Button
            onClick={onCancel}
            disabled={isFlipping}
            className="w-full bg-white/70 backdrop-blur-sm border-2 border-orange-300 text-orange-700 hover:bg-orange-100 font-bold py-3 rounded-full"
            variant="outline"
          >
            ✖️ cancel
          </Button>
        </div>

        <p className="text-xs text-orange-600 mt-4">
          each round gets riskier! play responsibly 🥧
        </p>
      </div>
    </div>
  );
};

export default DoubleOrNothing;
