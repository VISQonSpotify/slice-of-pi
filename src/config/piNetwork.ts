
// Pi Network Configuration
// Update these values when you get your real App ID from develop.pi

export interface PiNetworkConfig {
  appId: string;
  sandbox: boolean;
  version: string;
}

// Environment configurations
export const PI_CONFIG = {
  // Sandbox configuration (for testing)
  sandbox: {
    appId: 'your-real-app-id-here', // Replace with your actual App ID from develop.pi
    sandbox: true,
    version: '2.0'
  } as PiNetworkConfig,
  
  // Production configuration (for live app)
  production: {
    appId: 'your-real-app-id-here', // Replace with your actual App ID from develop.pi
    sandbox: false,
    version: '2.0'
  } as PiNetworkConfig
};

// Current environment - change this to switch between sandbox and production
// Set to 'sandbox' for testing, 'production' for live app
export const CURRENT_ENV: 'sandbox' | 'production' = 'sandbox';

// Get current configuration
export const getCurrentPiConfig = (): PiNetworkConfig => {
  return PI_CONFIG[CURRENT_ENV];
};

// Helper to check if we're in sandbox mode
export const isSandboxMode = (): boolean => {
  return getCurrentPiConfig().sandbox;
};
