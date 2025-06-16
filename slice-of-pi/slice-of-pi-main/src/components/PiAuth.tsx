
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getCurrentPiConfig, isSandboxMode } from '@/config/piNetwork';

interface PiAuthProps {
  onAuthenticate: (userData: any) => void;
}

const PiAuth = ({ onAuthenticate }: PiAuthProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [piSdkReady, setPiSdkReady] = useState(false);

  useEffect(() => {
    const initializePiSDK = async () => {
      console.log('Initializing Pi SDK...');
      const piConfig = getCurrentPiConfig();
      console.log('Using Pi config:', piConfig);
      
      if (window.Pi) {
        try {
          await window.Pi.init({
            version: piConfig.version,
            sandbox: piConfig.sandbox
          });
          setPiSdkReady(true);
          console.log(`Pi SDK initialized successfully (${isSandboxMode() ? 'SANDBOX' : 'PRODUCTION'} mode)`);
        } catch (error) {
          console.error('Failed to initialize Pi SDK:', error);
          toast({
            title: "pi sdk error",
            description: "failed to initialize pi sdk. please try refreshing the page.",
            variant: "destructive",
          });
        }
      } else {
        console.log('Pi SDK not available - must be in Pi Browser');
        toast({
          title: "pi browser required",
          description: "this app must be opened in pi browser to function properly.",
          variant: "destructive",
        });
      }
    };

    initializePiSDK();
  }, []);

  const handleSignIn = async () => {
    console.log('Sign in button clicked');
    if (!piSdkReady) {
      toast({
        title: "sdk not ready",
        description: "please wait for the pi sdk to initialize",
        variant: "destructive",
      });
      return;
    }

    if (!window.Pi) {
      toast({
        title: "pi browser required",
        description: "this app must be opened in pi browser",
        variant: "destructive",
      });
      return;
    }

    setIsAuthenticating(true);
    
    try {
      console.log(`Starting Pi Network authentication (${isSandboxMode() ? 'SANDBOX' : 'PRODUCTION'} mode)...`);
      const scopes = ['username', 'payments'];
      const auth = await window.Pi.authenticate(scopes, {
        onIncompletePaymentFound: (payment) => {
          console.log('Incomplete payment found:', payment);
        }
      });
      
      console.log('Pi authentication result:', auth);
      
      if (auth.accessToken) {
        console.log('Pi authentication successful, calling onAuthenticate...');
        onAuthenticate({
          username: auth.user.username,
          uid: auth.user.uid,
          accessToken: auth.accessToken,
        });
      } else {
        throw new Error('No access token received');
      }
      
    } catch (error) {
      console.error('Authentication failed:', error);
      toast({
        title: "authentication failed",
        description: "please try signing in again",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-3xl p-8 shadow-lg border-2 border-amber-300">
        <div className="mb-6">
          <div className="text-5xl mb-4">🥧</div>
          <h2 className="text-2xl font-bold mb-3 text-amber-900">ready to play?</h2>
          <p className="text-amber-700 leading-relaxed">
            sign in with your pi network account to start flipping coins and winning pi!
          </p>
          {/* Environment indicator */}
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              isSandboxMode() 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {isSandboxMode() ? '🧪 sandbox mode' : '🚀 production mode'}
            </span>
          </div>
        </div>
        
        <Button
          onClick={handleSignIn}
          disabled={isAuthenticating || !piSdkReady}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg border-2 border-amber-300 hover:border-amber-400 transition-all duration-200"
        >
          {isAuthenticating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              signing in...
            </div>
          ) : !piSdkReady ? (
            'loading pi sdk...'
          ) : (
            '🥧 sign in with pi'
          )}
        </Button>
        
        <p className="text-xs text-amber-600 mt-4">
          by signing in, you agree to play responsibly
        </p>
      </div>
    </div>
  );
};

export default PiAuth;
