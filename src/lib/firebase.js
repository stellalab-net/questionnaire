import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBQ1p5cEps1djhS6XKJs-PnTbUiL0xz6g",
  authDomain: "questionnaire-fce29.firebaseapp.com",
  projectId: "questionnaire-fce29",
  storageBucket: "questionnaire-fce29.firebasestorage.app",
  messagingSenderId: "873910184985",
  appId: "1:873910184985:web:ad42b4fa8c999780414e88",
  measurementId: "G-HCYC11P9R0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getConfig() {
  const snap = await getDoc(doc(db, "settings", "config"));
  return snap.exists() ? snap.data() : null;
}

export async function setConfig(data) {
  await setDoc(doc(db, "settings", "config"), data);
}
