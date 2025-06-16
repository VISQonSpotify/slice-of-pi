
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const Leaderboard = () => {
  const mockLeaderboard = [
    { rank: 1, username: "PiMaster", winnings: "125.50" },
    { rank: 2, username: "CoinFlipper", winnings: "98.75" },
    { rank: 3, username: "LuckyPlayer", winnings: "87.25" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>🏆 Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLeaderboard.map((player) => (
            <div key={player.rank} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-bold text-purple-600">#{player.rank}</span>
                <span className="font-medium">{player.username}</span>
              </div>
              <span className="text-green-600 font-semibold">{player.winnings} π</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
