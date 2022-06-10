
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBwc3G1mGBZsNoRuGO4U2-mFfOIodSHjzM",
    authDomain: "table-c7572.firebaseapp.com",
    projectId: "table-c7572",
    storageBucket: "table-c7572.appspot.com",
    messagingSenderId: "821022895140",
    appId: "1:821022895140:web:c0750932cd863e6ee07cb1"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);