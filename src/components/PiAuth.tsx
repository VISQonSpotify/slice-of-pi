
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PiAuthProps {
  onAuth: (userData: any) => void;
}

export const PiAuth = ({ onAuth }: PiAuthProps) => {
  const handleSignIn = () => {
    // Mock authentication for now
    onAuth({
      uid: "user123",
      username: "Player",
      piBalance: 100
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🥧 Slice of Pi</CardTitle>
          <CardDescription>
            Connect with Pi Network to start playing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn} className="w-full">
            Sign In with Pi Network
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
