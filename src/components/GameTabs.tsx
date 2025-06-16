
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CoinFlip from "./CoinFlip";
import { DoubleOrNothing } from "./DoubleOrNothing";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface GameTabsProps {
  user: any;
}

export const GameTabs = ({ user }: GameTabsProps) => {
  const [balance] = useState(100); // Mock balance
  const [betAmount, setBetAmount] = useState(5);
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastResult, setLastResult] = useState<'heads' | 'tails' | null>(null);

  const handleFlip = async () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setLastResult(null);
    
    // Simulate coin flip delay
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'heads' : 'tails';
      setLastResult(result);
      setIsFlipping(false);
    }, 2000);
  };

  const payout = lastResult === 'heads' ? betAmount * 2 : 0;

  return (
    <div className="w-full">
      <Tabs defaultValue="coinflip" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="coinflip">🪙 Coin Flip</TabsTrigger>
          <TabsTrigger value="doublenothing">🎲 Double or Nothing</TabsTrigger>
        </TabsList>

        <TabsContent value="coinflip" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coin Flip Game</CardTitle>
              <CardDescription>
                Flip a coin and win double your bet! Heads you win, tails you lose.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="bet-amount">Bet Amount</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="bet-amount"
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(Number(e.target.value))}
                      min={1}
                      max={balance}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">π</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="text-lg font-semibold">{balance} π</p>
                </div>
              </div>

              <CoinFlip
                isFlipping={isFlipping}
                lastResult={lastResult}
                onFlip={handleFlip}
                betAmount={betAmount}
                payout={payout}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doublenothing">
          <DoubleOrNothing user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
