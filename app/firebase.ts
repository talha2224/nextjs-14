"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const createFirebaseApp = () => {
  const clientCredentials = {
    apiKey: "AIzaSyCpcH84pZMsopqc6jSsWaUDiiMtK4E0Uwc",
    // authDomain: "kayyo-2378d.firebaseapp.com",
    authDomail:"https://next-app-14.netlify.app/",
    projectId: "kayyo-2378d",
    storageBucket: "kayyo-2378d.appspot.com",
    messagingSenderId: "438239183645",
    appId: "1:438239183645:web:2dbdae1d3856e0404b57f4",
    measurementId: "G-6KEH43Q0GF"
  };

  if (getApps().length <= 0) {
    const app = initializeApp(clientCredentials);
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== "undefined") {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      if ("measurementId" in clientCredentials) {
        getAnalytics();
      }
    }
    return app;
  }
};