import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvEntrUXsRf2wYv6PumFO5Q_k3LQhq3uc",
  authDomain: "school-gallery-ca850.firebaseapp.com",
  projectId: "school-gallery-ca850",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
