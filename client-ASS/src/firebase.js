import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmvhDECVkdAI_vhJ_HABvPYqQAuiYPsBY",
  authDomain: "auth-ca34f.firebaseapp.com",
  projectId: "auth-ca34f",
  storageBucket: "auth-ca34f.appspot.com",
  messagingSenderId: "569552189061",
  appId: "1:569552189061:web:66ae95a5f8e0052bcf5bec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
