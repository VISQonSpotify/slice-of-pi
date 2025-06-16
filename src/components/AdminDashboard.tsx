
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

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
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Games Played</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5,678</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pi Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2,345.67 π</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
