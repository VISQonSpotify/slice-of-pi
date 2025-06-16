
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Loader2 } from "lucide-react";

interface PiAuthProps {
  onAuth: (userData: any) => void;
}

export const PiAuth = ({ onAuth }: PiAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [piSDKReady, setPiSDKReady] = useState(false);

  useEffect(() => {
    // Check if Pi SDK is loaded
    const checkPiSDK = () => {
      if (typeof window !== 'undefined' && (window as any).Pi) {
        setPiSDKReady(true);
        console.log('Pi SDK is ready');
      } else {
        console.log('Pi SDK not found, using mock authentication');
        setPiSDKReady(false);
      }
    };

    checkPiSDK();
    
    // If SDK isn't ready, check periodically
    const interval = setInterval(() => {
      if (!(window as any).Pi) {
        checkPiSDK();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePiAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (piSDKReady && (window as any).Pi) {
        // Real Pi Network authentication
        const scopes = ['username', 'payments'];
        
        const authResult = await (window as any).Pi.authenticate(scopes, {
          onIncompletePaymentFound: (payment: any) => {
            console.log('Incomplete payment found:', payment);
          }
        });

        console.log('Pi authentication successful:', authResult);
        
        onAuth({
          uid: authResult.user.uid,
          username: authResult.user.username,
          accessToken: authResult.accessToken,
          piNetwork: true
        });
      } else {
        // Mock authentication for development/testing
        console.log('Using mock Pi authentication');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockUser = {
          uid: 'mock_' + Math.random().toString(36).substr(2, 9),
          username: 'TestPiUser' + Math.floor(Math.random() * 1000),
          accessToken: 'mock_token_' + Date.now(),
          piNetwork: false // Indicate this is mock auth
        };

        onAuth(mockUser);
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="text-6xl">🥧</div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome to Slice of Pi
          </CardTitle>
          <CardDescription className="text-base">
            Flip a coin. Win Pi. Simple.
          </CardDescription>
          
          <div className="flex justify-center">
            {piSDKReady ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                🟢 Pi Network Connected
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                🟡 Demo Mode (Pi SDK not detected)
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <span className="text-lg">🪙</span>
              <span>Simple coin flip games</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🏆</span>
              <span>Compete on leaderboards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">💰</span>
              <span>Win real Pi cryptocurrency</span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handlePiAuth}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {piSDKReady ? 'Connecting to Pi...' : 'Starting Demo...'}
              </>
            ) : (
              <>
                {piSDKReady ? '🥧 Sign in with Pi Network' : '🎮 Try Demo Mode'}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            {piSDKReady 
              ? 'Secure authentication through Pi Network'
              : 'Pi Network SDK not detected. Running in demo mode for testing.'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
