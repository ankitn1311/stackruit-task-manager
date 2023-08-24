import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB0weX89xReeAqyduHNMfUB5lD8F5eSz8",
  authDomain: "stackruit-task-manager.firebaseapp.com",
  projectId: "stackruit-task-manager",
  storageBucket: "stackruit-task-manager.appspot.com",
  messagingSenderId: "570384182071",
  appId: "1:570384182071:web:cc019e2305682a351a08b2",
  measurementId: "G-LVLZR0DTG7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();
const db = getDatabase();

export { app, auth, firestore, db };
