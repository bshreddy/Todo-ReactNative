export default {
  name: 'Todo',
  version: '1.0.0',
  slug: "TodoReactApp",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  userInterfaceStyle: "light",
  ios: {
    bundleIdentifier: "com.shbr.todo-expo",
    supportsTablet: true,
    config: {
      googleSignIn: {
        reservedClientId: "###RESERVED_CLIENT_ID###",
      }
    },
    googleServicesFile: "./config/GoogleService-Info.plist"
  },
  android: {
    package: "com.shbr.todo_expo",
    googleServicesFile: "./config/google-services.json"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    apiKey: "###API_KEY###",
    authDomain: "###AUTH_DOMAIN###",
    databaseURL: "###DATABASE_URL###",
    projectId: "###PROJECT_ID###",
    storageBucket: "###STORAGE_BUCKET###",
    messagingSenderId: "###MESSAGING_SENDER_ID###",
    appId: "###APP_ID###",
    clientId: "###CLIENT_ID###",
    defaultColor: {
      systemBlue: 'rgba(0, 122, 255, 1)',
      systemGreen: 'rgba(52, 199, 89, 1)',
      systemIndigo: 'rgba(88, 86, 214, 1)',
      systemOrange: 'rgba(255, 149, 0, 1)',
      systemPink: 'rgba(255, 45, 85, 1)',
      systemPurple: 'rgba(175, 82, 222, 1)',
      systemRed: 'rgba(255, 59, 48, 1)',
      systemTeal: 'rgba(90, 200, 250, 1)',
      systemYellow: 'rgba(255, 204, 0, 1)',
      systemGray: 'rgba(142, 142, 147, 1)',
      systemGray2: 'rgba(174, 174, 178, 1)',
      systemGray3: 'rgba(199, 199, 204, 1)',
      systemGray4: 'rgba(209, 209, 214, 1)',
      systemGray5: 'rgba(229, 229 ,234, 1)',
      systemGray6: 'rgba(242, 242, 247, 1)',
      label: 'rgba(0.0, 0.0, 0.0, 1.0)',
      secondaryLabel: 'rgba(60.0, 60.0, 67.0, 0.6)',
      tertiaryLabel: 'rgba(60.0, 60.0, 67.0, 0.3)',
      quaternaryLabel: 'rgba(60.0, 60.0, 67.0, 0.18)',
      systemFill: 'rgba(120.0, 120.0, 128.0, 0.2)',
      secondarySystemFill: 'rgba(120.0, 120.0, 128.0, 0.16)',
      tertiarySystemFill: 'rgba(118.0, 118.0, 128.0, 0.12)',
      quaternarySystemFill: 'rgba(116.0, 116.0, 128.0, 0.08)',
      placeholderText: 'rgba(60.0, 60.0, 67.0, 0.3)',
      systemBackground: 'rgba(255.0, 255.0, 255.0, 1.0)',
      secondarySystemBackground: 'rgba(242.0, 242.0, 247.0, 1.0)',
      tertiarySystemBackground: 'rgba(255.0, 255.0, 255.0, 1.0)',
      systemGroupedBackground: 'rgba(242.0, 242.0, 247.0, 1.0)',
      secondarySystemGroupedBackground: 'rgba(255.0, 255.0, 255.0, 1.0)',
      tertiarySystemGroupedBackground: 'rgba(242.0, 242.0, 247.0, 1.0)',
      separator: 'rgba(60.0, 60.0, 67.0, 0.29)',
      opaqueSeparator: 'rgba(198.0, 198.0, 200.0, 1.0)',
      link: 'rgba(0.0, 122.0, 255.0, 1.0)',
      darkText: 'rgba(0.0, 0.0, 0.0, 1.0)',
      lightText: 'rgba(255.0, 255.0, 255.0, 0.6)',
    }
  },
};

