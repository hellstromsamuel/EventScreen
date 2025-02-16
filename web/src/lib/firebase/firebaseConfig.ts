import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0K28x4o_bDx94xcIiy2sdFRLQtY90ZqU",
  authDomain: "eventscreen-app.firebaseapp.com",
  projectId: "eventscreen-app",
  storageBucket: "eventscreen-app.firebasestorage.app",
  messagingSenderId: "408325022659",
  appId: "1:408325022659:web:070798523a4b4a01a11376",
  measurementId: "G-PC9CRZD508",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
