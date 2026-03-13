import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBQ1p5cEps1djhS6XKJs-PnTbUiL0xz6g",
  authDomain: "questionnaire-fce29.firebaseapp.com",
  projectId: "questionnaire-fce29",
  storageBucket: "questionnaire-fce29.firebasestorage.app",
  messagingSenderId: "873910184985",
  appId: "1:873910184985:web:299651dba41a5287414e88",
  measurementId: "G-DL18740BKT",
  // Realtime Database URL (Firebase 콘솔 → Realtime Database에서 확인)
  databaseURL: "https://questionnaire-fce29-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getConfig() {
  const snap = await get(ref(db, "config"));
  return snap.exists() ? snap.val() : null;
}

export async function setConfig(data) {
  await set(ref(db, "config"), data);
}
