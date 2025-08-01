import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d8688ba32bf74da58ff52b1e70c8ad80',
  appName: 'kpop-biz-tycoon',
  webDir: 'dist',
  server: {
    url: "https://d8688ba3-2bf7-4da5-8ff5-2b1e70c8ad80.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#251933",
      showSpinner: false
    }
  }
};

export default config;