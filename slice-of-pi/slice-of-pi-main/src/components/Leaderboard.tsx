
import React from 'react';
import { Trophy, TrendingUp, Zap } from 'lucide-react';

interface LeaderboardEntry {
  username: string;
  value: number;
  piDomain?: string;
}

interface LeaderboardProps {
  dailyWinners: LeaderboardEntry[];
  longestStreaks: LeaderboardEntry[];
  mostFlips: LeaderboardEntry[];
}

const Leaderboard = ({ dailyWinners, longestStreaks, mostFlips }: LeaderboardProps) => {
  const renderLeaderboard = (title: string, data: LeaderboardEntry[], icon: React.ReactNode, suffix: string, bgColor: string) => (
    <div className={`${bgColor} rounded-3xl p-6 shadow-lg border border-orange-200`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="font-bold text-orange-900 ml-3 text-lg">{title}</h3>
      </div>
      <div className="space-y-3">
        {data.slice(0, 5).map((entry, index) => (
          <div key={`${title}-${index}`} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center">
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm mr-4
                ${index === 0 ? 'bg-yellow-400 text-orange-900' : 
                  index === 1 ? 'bg-gray-300 text-gray-700' : 
                  index === 2 ? 'bg-orange-400 text-white' : 
                  'bg-orange-100 text-orange-700'}
              `}>
                {index === 0 ? '🥧' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </div>
              <div>
                <p className="font-bold text-orange-900">
                  {entry.piDomain ? (
                    <span className="text-purple-600">@{entry.piDomain}</span>
                  ) : (
                    entry.username
                  )}
                </p>
              </div>
            </div>
            <p className="font-bold text-orange-900 text-lg">
              {entry.value.toFixed(suffix === 'π' ? 2 : 0)}{suffix}
            </p>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-orange-600 text-center py-6 bg-white/40 rounded-2xl">No data yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🏆</div>
        <h2 className="text-3xl font-bold text-orange-900">Pi Champions</h2>
        <p className="text-orange-700 text-lg">Top performers in the Slice of Pi arena</p>
      </div>

      {renderLeaderboard(
        "Daily Winners", 
        dailyWinners, 
        <Trophy className="w-6 h-6 text-yellow-600" />, 
        'π',
        'bg-gradient-to-br from-yellow-100 to-yellow-50'
      )}

      {renderLeaderboard(
        "Longest Streaks", 
        longestStreaks, 
        <TrendingUp className="w-6 h-6 text-green-600" />, 
        ' wins',
        'bg-gradient-to-br from-green-100 to-green-50'
      )}

      {renderLeaderboard(
        "Most Flips", 
        mostFlips, 
        <Zap className="w-6 h-6 text-blue-600" />, 
        ' flips',
        'bg-gradient-to-br from-blue-100 to-blue-50'
      )}
    </div>
  );
};

export default Leaderboard;
