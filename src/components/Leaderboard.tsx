
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Leaderboard = () => {
  const mockLeaders = [
    { rank: 1, username: "PiMaster", balance: 1000 },
    { rank: 2, username: "CoinFliper", balance: 750 },
    { rank: 3, username: "LuckyPlayer", balance: 500 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>🏆 Leaderboard</CardTitle>
        <CardDescription>
          Top players this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLeaders.map((leader) => (
            <div key={leader.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">#{leader.rank}</span>
                <span className="font-medium">{leader.username}</span>
              </div>
              <span className="font-semibold text-purple-600">
                {leader.balance} π
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
