
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminSettings {
  defaultBetAmount: number;
  payoutMultiplier: number;
  maxDoubleRounds: number;
  platformFeePercentage: number;
  revenueAdminSplit: number;
  revenueDeveloperSplit: number;
}

interface AdminStats {
  totalPlayers: number;
  totalFlips: number;
  totalRevenue: number;
  liquidityPool: number;
  dailyPlayers: number;
}

interface AdminDashboardProps {
  settings: AdminSettings;
  stats: AdminStats;
  onUpdateSettings: (settings: AdminSettings) => void;
  onRefillPool: (amount: number) => void;
  onWithdrawPool: (amount: number) => void;
}

const AdminDashboard = ({ 
  settings, 
  stats, 
  onUpdateSettings, 
  onRefillPool, 
  onWithdrawPool 
}: AdminDashboardProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [poolAmount, setPoolAmount] = useState(1.0);

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">⚙️</div>
        <h2 className="text-2xl font-bold text-yellow-400">Admin Dashboard</h2>
        <p className="text-gray-300">Configure game settings and monitor performance</p>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Live Players</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-400">{stats.dailyPlayers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Total Flips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-400">{stats.totalFlips}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Platform Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-400">{stats.totalRevenue.toFixed(3)}π</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Liquidity Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-400">{stats.liquidityPool.toFixed(2)}π</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{stats.totalPlayers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Game Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">Game Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Default Bet (π)</label>
              <input
                type="number"
                step="0.1"
                value={localSettings.defaultBetAmount}
                onChange={(e) => setLocalSettings({...localSettings, defaultBetAmount: parseFloat(e.target.value) || 1})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Payout Multiplier</label>
              <input
                type="number"
                step="0.1"
                value={localSettings.payoutMultiplier}
                onChange={(e) => setLocalSettings({...localSettings, payoutMultiplier: parseFloat(e.target.value) || 1.9})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Max Double Rounds</label>
              <input
                type="number"
                min="1"
                max="10"
                value={localSettings.maxDoubleRounds}
                onChange={(e) => setLocalSettings({...localSettings, maxDoubleRounds: parseInt(e.target.value) || 5})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Platform Fee (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={localSettings.platformFeePercentage}
                onChange={(e) => setLocalSettings({...localSettings, platformFeePercentage: parseFloat(e.target.value) || 0.5})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
          </div>
          
          <Button onClick={handleSaveSettings} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
            💾 Save Settings
          </Button>
        </CardContent>
      </Card>

      {/* Liquidity Management */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">Liquidity Pool Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount (π)</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={poolAmount}
              onChange={(e) => setPoolAmount(parseFloat(e.target.value) || 1)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => onRefillPool(poolAmount)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              ➕ Refill Pool
            </Button>
            <Button 
              onClick={() => onWithdrawPool(poolAmount)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              ➖ Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
