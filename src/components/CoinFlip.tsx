
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface CoinFlipProps {
  isFlipping: boolean;
  lastResult: 'heads' | 'tails' | null;
  onFlip: () => void;
  betAmount: number;
  payout: number;
}

const CoinFlip = ({ isFlipping, lastResult, onFlip, betAmount, payout }: CoinFlipProps) => {
  const profit = payout - betAmount;
  const coinFlipAudioRef = useRef<HTMLAudioElement>(null);
  const winAudioRef = useRef<HTMLAudioElement>(null);
  const loseAudioRef = useRef<HTMLAudioElement>(null);

  // Play sound effects
  useEffect(() => {
    if (isFlipping && coinFlipAudioRef.current) {
      coinFlipAudioRef.current.currentTime = 0;
      coinFlipAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  }, [isFlipping]);

  useEffect(() => {
    if (lastResult && !isFlipping) {
      if (lastResult === 'heads' && winAudioRef.current) {
        winAudioRef.current.currentTime = 0;
        winAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else if (lastResult === 'tails' && loseAudioRef.current) {
        loseAudioRef.current.currentTime = 0;
        loseAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  }, [lastResult, isFlipping]);

  return (
    <div className="text-center space-y-8">
      {/* Audio elements */}
      <audio ref={coinFlipAudioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBjeT2e/deSUFLIHU8+CSOAYWaq3r5Z1LDAxQqO/zxmwgBjK14vHuixAHLIHZ9OWgKgcZcbnr7JpKCQxPqPEOz20wBjW64vHxlA4IKH3O8+6jTwIMTrz17aVWEQp9zf3l3mcJA22++/bmlA8IMfL46rhDCgU5e9nz9pp1Ew7q4YfB4XLMCgb1+LD5CAED4HbfRgAAAPb4sv0IA3o3AfKANQADAKABAADIAbw5fAH4DAAD6d+z7wAGfAIA9P0AAA==" type="audio/wav" />
      </audio>
      <audio ref={winAudioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBjeT2e/deSUFLIHU8+CSOAYWaq3r5Z1LDAxQqO/zxmwgBjK14vHuixAHLIHZ9OWgKgcZcbnr7JpKCQxPqPEOz20wBjW64vHxlA4IKH3O8+6jTwIMTrz17aVWEQp9zf3l3mcJA22++/bmlA8IMfL46rhDCgU5e9nz9pp1Ew7q4YfB4XLMCgb1+LD5CAED4HbfRgAAAPb4sv0IA3o3AfKANQADAKABAADIAbw5fAH4DAAD6d+z7wAGfAIA9P0AAA==" type="audio/wav" />
      </audio>
      <audio ref={loseAudioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBjeT2e/deSUFLIHU8+CSOAYWaq3r5Z1LDAxQqO/zxmwgBjK14vHuixAHLIHZ9OWgKgcZcbnr7JpKCQxPqPEOz20wBjW64vHxlA4IKH3O8+6jTwIMTrz17aVWEQp9zf3l3mcJA22++/bmlA8IMfL46rhDCgU5e9nz9pp1Ew7q4YfB4XLMCgb1+LD5CAED4HbfRgAAAPb4sv0IA3o3AfKANQADAKABAADIAbw5fAH4DAAD6d+z7wAGfAIA9P0AAA==" type="audio/wav" />
      </audio>

      {/* Minimalist Coin */}
      <div className="flex flex-col items-center space-y-6">
        <div 
          className={`
            w-32 h-32 rounded-full cursor-pointer
            flex items-center justify-center text-4xl font-light
            transition-all duration-500 transform
            ${isFlipping ? 'animate-spin scale-110' : 'hover:scale-105 active:scale-95'}
            ${lastResult === 'heads' 
              ? 'bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 text-amber-900 shadow-xl shadow-amber-400/30' 
              : lastResult === 'tails' 
              ? 'bg-gradient-to-br from-stone-300 via-stone-400 to-stone-500 text-white shadow-xl shadow-stone-500/30' 
              : 'bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 text-amber-900 shadow-xl shadow-amber-400/30 hover:shadow-amber-400/40'
            }
            border border-stone-200
          `}
          onClick={onFlip}
          style={{ 
            background: isFlipping 
              ? 'conic-gradient(from 0deg, #fcd34d, #f59e0b, #d97706, #92400e, #fcd34d)' 
              : lastResult === 'heads'
              ? 'radial-gradient(circle at 30% 30%, #fde047, #facc15, #eab308)'
              : lastResult === 'tails'
              ? 'radial-gradient(circle at 30% 30%, #a8a29e, #78716c, #57534e)'
              : 'radial-gradient(circle at 30% 30%, #fde047, #facc15, #eab308)'
          }}
        >
          {isFlipping ? (
            '?'
          ) : lastResult === 'heads' ? (
            'π'
          ) : lastResult === 'tails' ? (
            'π'
          ) : (
            'π'
          )}
        </div>
        
        {/* Action Button */}
        <Button
          onClick={onFlip}
          disabled={isFlipping}
          className="bg-stone-800 hover:bg-stone-700 text-white font-medium px-8 py-3 rounded-xl text-lg transition-all duration-200 shadow-lg"
        >
          {isFlipping ? 'flipping...' : 'flip coin'}
        </Button>
        
        {/* Tip Jar Display */}
        <div className="text-stone-600 text-sm text-center">
          <p>tip jar: {betAmount} π</p>
        </div>
      </div>
      
      {/* Result Display */}
      {lastResult && !isFlipping && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-stone-200">
          <p className="text-xl font-medium text-stone-800 capitalize mb-2">
            {lastResult === 'heads' ? '🎉 heads!' : '💔 tails!'}
          </p>
          <p className="text-stone-600">
            {lastResult === 'heads' ? 
              `you won ${payout} π! (+${profit.toFixed(1)} π profit)` : 
              `you lost ${betAmount} π`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CoinFlip;
