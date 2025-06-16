
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminDashboardProps {
  onSignOut: () => void;
}

export const AdminDashboard = ({ onSignOut }: AdminDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Button onClick={onSignOut} variant="outline">
          Sign Out
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Active players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Games Played</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5,678</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Pi Volume</CardTitle>
            <CardDescription>Wagered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,345 π</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
