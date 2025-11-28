"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7u2G_zojPp52O7E2h44XU7KHKAFaKJmA",
  authDomain: "agri-sheild-1e049.firebaseapp.com",
  projectId: "agri-sheild-1e049",
  storageBucket: "agri-sheild-1e049.firebasestorage.app",
  messagingSenderId: "253747276132",
  appId: "1:253747276132:web:75f410823ea12d3a03f271",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
