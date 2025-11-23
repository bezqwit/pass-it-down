import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAqBxGNMF1aPDBSSg0ie2L_O0OppU5Dztg",
  authDomain: "passitdown-343e3.firebaseapp.com",
  projectId: "passitdown-343e3",
  storageBucket: "passitdown-343e3.firebasestorage.app",
  messagingSenderId: "754725844458",
  appId: "1:754725844458:web:c7dbb3f31d498704216e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;