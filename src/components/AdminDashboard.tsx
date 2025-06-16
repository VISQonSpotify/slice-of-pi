
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface AdminDashboardProps {
  onSignOut: () => void;
}

export const AdminDashboard = ({ onSignOut }: AdminDashboardProps) => {
  const [gameStats] = useState({
    totalGames: 1247,
    totalWinnings: 892.5,
    activeUsers: 156,
    totalUsers: 2341
  });

  const [recentGames] = useState([
    { id: 1, user: "PiUser123", game: "Coin Flip", bet: 5, result: "Win", payout: 10, timestamp: "2 mins ago" },
    { id: 2, user: "CryptoFan", game: "Double or Nothing", bet: 20, result: "Loss", payout: 0, timestamp: "5 mins ago" },
    { id: 3, user: "LuckyPlayer", game: "Coin Flip", bet: 2, result: "Win", payout: 4, timestamp: "8 mins ago" },
  ]);

  const [systemHealth] = useState({
    piNetwork: "Connected",
    database: "Healthy",
    gameEngine: "Running",
    paymentSystem: "Active"
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <Button onClick={onSignOut} variant="outline">
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gameStats.totalGames}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Winnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gameStats.totalWinnings} π</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gameStats.activeUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gameStats.totalUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="games">Recent Games</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>
        
        <TabsContent value="games" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Game Activity</CardTitle>
              <CardDescription>Latest games played on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {recentGames.map((game) => (
                    <div key={game.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{game.user}</p>
                        <p className="text-sm text-muted-foreground">{game.game} • {game.timestamp}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">{game.bet} π bet</p>
                        <Badge variant={game.result === "Win" ? "default" : "destructive"}>
                          {game.result} • {game.payout} π
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor system components and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(systemHealth).map(([service, status]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span className="font-medium capitalize">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <Badge variant={status === "Connected" || status === "Healthy" || status === "Running" || status === "Active" ? "default" : "destructive"}>
                      {status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
