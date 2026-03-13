import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, push, query, orderByChild } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBQ1p5cEps1djhS6XKJs-PnTbUiL0xz6g",
  authDomain: "questionnaire-fce29.firebaseapp.com",
  projectId: "questionnaire-fce29",
  storageBucket: "questionnaire-fce29.firebasestorage.app",
  messagingSenderId: "873910184985",
  appId: "1:873910184985:web:ad42b4fa8c999780414e88",
  measurementId: "G-HCYC11P9R0",
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

export async function saveResponse(data) {
  await push(ref(db, "responses"), { ...data, submittedAt: Date.now() });
}

export async function getResponses() {
  const snap = await get(query(ref(db, "responses"), orderByChild("submittedAt")));
  if (!snap.exists()) return [];
  const entries = [];
  snap.forEach(child => entries.push({ id: child.key, ...child.val() }));
  return entries.reverse(); // 최신순
}
