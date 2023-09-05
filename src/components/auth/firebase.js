// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add this import


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW3M7NnNBnuJYcyrFJKYVE7snWdxXSmHA",
  authDomain: "enceptics-react.firebaseapp.com",
  projectId: "enceptics-react",
  storageBucket: "enceptics-react.appspot.com",
  messagingSenderId: "521081000587",
  appId: "1:521081000587:web:4d2e31d90838e37414fa8e",
  measurementId: "G-PPCH8F6WW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the 'auth' object


export { auth };