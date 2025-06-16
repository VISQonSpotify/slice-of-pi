
// Pi Network SDK Configuration
export const PI_NETWORK_CONFIG = {
  // Sandbox environment for development
  sandbox: true,
  
  // Required scopes for the application
  scopes: ['username', 'payments'],
  
  // App-specific configuration
  app: {
    name: 'Slice of Pi',
    description: 'Coin flip game with Pi cryptocurrency',
    version: '1.0.0'
  }
};

// Pi Network API endpoints
export const PI_API_ENDPOINTS = {
  sandbox: 'https://api.minepi.com/v2',
  production: 'https://api.minepi.com/v2'
};

// Game configuration
export const GAME_CONFIG = {
  coinFlip: {
    minBet: 0.1,
    maxBet: 100,
    payoutMultiplier: 2
  },
  doubleOrNothing: {
    entryFee: 1,
    maxRounds: 5,
    winProbability: 0.5
  }
};

// Helper function to check if Pi SDK is available
export const isPiSDKAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!(window as any).Pi;
};

// Helper function to initialize Pi SDK
export const initializePiSDK = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isPiSDKAvailable()) {
      resolve(true);
      return;
    }

    // Wait for SDK to load
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max wait
    
    const checkSDK = setInterval(() => {
      attempts++;
      
      if (isPiSDKAvailable()) {
        clearInterval(checkSDK);
        resolve(true);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkSDK);
        resolve(false);
      }
    }, 1000);
  });
};
