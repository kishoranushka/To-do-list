// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjhKgF91q02M40LLYKJmoXIQhNOmVb09o",
  authDomain: "to-do-list-64147.firebaseapp.com",
  projectId: "to-do-list-64147",
  storageBucket: "to-do-list-64147.appspot.com",
  messagingSenderId: "607595474666",
  appId: "1:607595474666:web:2d0dbe73fb7baedfabf193",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

