
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Trophy, Medal, Award } from "lucide-react";

export const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, username: "PiKing", winnings: 1250.5, games: 89, winRate: 67 },
    { rank: 2, username: "CoinMaster", winnings: 890.2, games: 156, winRate: 58 },
    { rank: 3, username: "LuckyPlayer", winnings: 675.8, games: 234, winRate: 52 },
    { rank: 4, username: "FlipMaster", winnings: 445.3, games: 78, winRate: 71 },
    { rank: 5, username: "PiGambler", winnings: 389.1, games: 145, winRate: 49 },
    { rank: 6, username: "CoinFlapper", winnings: 287.6, games: 92, winRate: 55 },
    { rank: 7, username: "HeadsOrTails", winnings: 245.9, games: 167, winRate: 48 },
    { rank: 8, username: "PiFlipper", winnings: 198.4, games: 83, winRate: 60 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 60) return "bg-green-100 text-green-800";
    if (winRate >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 Leaderboard
        </CardTitle>
        <CardDescription>
          Top players by total winnings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {leaderboardData.map((player) => (
              <div
                key={player.rank}
                className={`p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getRankIcon(player.rank)}
                    <div>
                      <p className="font-semibold text-sm">{player.username}</p>
                      <p className="text-xs text-muted-foreground">{player.games} games played</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{player.winnings} π</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getWinRateColor(player.winRate)}`}
                    >
                      {player.winRate}% win rate
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Rankings update every hour. Play more games to climb the leaderboard! 🚀
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
