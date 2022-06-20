import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "task-managerrr.firebaseapp.com",
  projectId: "task-managerrr",
  storageBucket: "task-managerrr.appspot.com",
  messagingSenderId: "536142694939",
  appId: "1:536142694939:web:e499bc81c56445a93ec6be",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
