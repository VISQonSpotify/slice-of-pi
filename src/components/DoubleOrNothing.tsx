
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface DoubleOrNothingProps {
  user: any;
}

export const DoubleOrNothing = ({ user }: DoubleOrNothingProps) => {
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [round, setRound] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const maxRounds = 5;
  const baseWinning = 1;

  const startGame = () => {
    setGameActive(true);
    setCurrentWinnings(baseWinning);
    setRound(1);
  };

  const doubleOrNothing = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate game processing
    setTimeout(() => {
      const won = Math.random() > 0.5;
      
      if (won && round < maxRounds) {
        setCurrentWinnings(prev => prev * 2);
        setRound(prev => prev + 1);
      } else {
        // Lost or reached max rounds
        if (!won) {
          setCurrentWinnings(0);
        }
        setGameActive(false);
        setRound(0);
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  const cashOut = () => {
    // In a real app, this would award the winnings to the user
    console.log(`Player cashed out ${currentWinnings} π`);
    setGameActive(false);
    setCurrentWinnings(0);
    setRound(0);
  };

  const resetGame = () => {
    setGameActive(false);
    setCurrentWinnings(0);
    setRound(0);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎲 Double or Nothing
            <Badge variant="secondary">High Risk</Badge>
          </CardTitle>
          <CardDescription>
            Start with 1 π and double your winnings each round. Cash out anytime or risk it all!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!gameActive ? (
            <div className="text-center space-y-4">
              <div className="text-6xl">🎯</div>
              <p className="text-lg text-muted-foreground">Ready to take the risk?</p>
              <Button onClick={startGame} size="lg" className="bg-red-600 hover:bg-red-700">
                Start Game (1 π entry)
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-green-600">
                  {currentWinnings} π
                </div>
                <p className="text-muted-foreground">Current Winnings</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Round {round} of {maxRounds}</span>
                  <span>{((round / maxRounds) * 100).toFixed(0)}%</span>
                </div>
                <Progress value={(round / maxRounds) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={doubleOrNothing}
                  disabled={isProcessing || round >= maxRounds}
                  variant="destructive"
                  size="lg"
                  className="h-16"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Rolling...
                    </div>
                  ) : round >= maxRounds ? (
                    'Max Rounds Reached!'
                  ) : (
                    `Double to ${currentWinnings * 2} π`
                  )}
                </Button>
                
                <Button
                  onClick={cashOut}
                  disabled={isProcessing || currentWinnings === 0}
                  variant="default"
                  size="lg"
                  className="h-16 bg-green-600 hover:bg-green-700"
                >
                  Cash Out {currentWinnings} π
                </Button>
              </div>

              <div className="text-center">
                <Button onClick={resetGame} variant="ghost" size="sm">
                  Reset Game
                </Button>
              </div>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-semibold">How it works:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Start with 1 π entry fee</li>
              <li>• Each round, choose to double your winnings or cash out</li>
              <li>• 50% chance to win each round</li>
              <li>• Maximum 5 rounds ({Math.pow(2, maxRounds)} π max win)</li>
              <li>• Lose everything if you fail a round</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
