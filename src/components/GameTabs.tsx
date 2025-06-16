
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameTabsProps {
  activeTab: 'game' | 'leaderboard' | 'admin';
  onTabChange: (tab: 'game' | 'leaderboard' | 'admin') => void;
  isAdmin?: boolean;
}

const GameTabs = ({ activeTab, onTabChange, isAdmin = false }: GameTabsProps) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-1 flex space-x-1 shadow-sm border border-stone-200">
        <Button
          onClick={() => onTabChange('game')}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'game' 
              ? 'bg-stone-800 text-white shadow-sm' 
              : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-800'
          }`}
          variant="ghost"
        >
          game
        </Button>
        
        <Button
          onClick={() => onTabChange('leaderboard')}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'leaderboard' 
              ? 'bg-stone-800 text-white shadow-sm' 
              : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-800'
          }`}
          variant="ghost"
        >
          leaderboard
        </Button>
        
        {isAdmin && (
          <Button
            onClick={() => onTabChange('admin')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'admin' 
                ? 'bg-stone-800 text-white shadow-sm' 
                : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-800'
            }`}
            variant="ghost"
          >
            admin
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameTabs;
