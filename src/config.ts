declare global {
  interface Window {
    env?: NodeJS.ProcessEnv;
  }
}
const env = window.env ?? ({} as any as NodeJS.ProcessEnv);

const config = {
  routerBaseName: env.FEATURE_CONTEXT ?? process.env.FEATURE_CONTEXT,
  version: VERSION,
  isSnapping: navigator.userAgent === "ReactSnap",
  firebaseConfig: {
    apiKey: env.FIREBASE_API_KEY ?? process.env.FIREBASE_API_KEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN ?? process.env.FIREBASE_AUTH_DOMAIN,
    projectId: env.FIREBASE_PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID,
    messagingSenderId:
      env.FIREBASE_MESSAGE_SENER_ID ?? process.env.FIREBASE_MESSAGE_SENER_ID,
    appId: env.FIREBASE_APP_ID ?? process.env.FIREBASE_APP_ID,
    measurementId:
      env.FIREBASE_MEASUREMENT_ID ?? process.env.FIREBASE_MEASUREMENT_ID,
  },
};

export default config;
