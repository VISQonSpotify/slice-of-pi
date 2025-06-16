
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface GameTabsProps {
  user: any;
}

export const GameTabs = ({ user }: GameTabsProps) => {
  const [activeTab, setActiveTab] = useState("coinflip");

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button 
          variant={activeTab === "coinflip" ? "default" : "outline"}
          onClick={() => setActiveTab("coinflip")}
        >
          Coin Flip
        </Button>
        <Button 
          variant={activeTab === "double" ? "default" : "outline"}
          onClick={() => setActiveTab("double")}
        >
          Double or Nothing
        </Button>
      </div>

      {activeTab === "coinflip" && (
        <Card>
          <CardHeader>
            <CardTitle>Coin Flip Game</CardTitle>
            <CardDescription>Choose heads or tails and flip for Pi!</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Coin flip game coming soon...</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "double" && (
        <Card>
          <CardHeader>
            <CardTitle>Double or Nothing</CardTitle>
            <CardDescription>Risk it all for double the reward!</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Double or nothing game coming soon...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
