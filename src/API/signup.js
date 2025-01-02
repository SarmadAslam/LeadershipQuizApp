import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3i_FRVt8LSY6EH1fhmvXcCDgmQ8wM3_U",
  authDomain: "leadershipquiz.firebaseapp.com",
  projectId: "leadershipquiz",
  storageBucket: "leadershipquiz.firebasestorage.app",
  messagingSenderId: "790429261833",
  appId: "1:790429261833:web:9ae48fcbc2d25bfd6a58d8",
  measurementId: "G-8SD9YY90ZZ"
};

const app = firebase.initializeApp(firebaseConfig);
export const my_auth = getAuth(app);
export const db = getFirestore(app);