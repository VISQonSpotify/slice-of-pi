
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GameTabsProps {
  user: any;
}

export const GameTabs = ({ user }: GameTabsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🎮 Games</CardTitle>
          <CardDescription>
            Choose your game and start playing!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">🪙 Coin Flip</h3>
              <p className="text-sm text-gray-600">
                Simple heads or tails game
              </p>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">💰 Double or Nothing</h3>
              <p className="text-sm text-gray-600">
                Risk it all for double rewards
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
