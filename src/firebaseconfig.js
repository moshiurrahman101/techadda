import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCduSB3-lH8gtyIb71NE96yAHY6t_WeVg4",
  authDomain: "techadda-74b39.firebaseapp.com",
  databaseURL: "https://techadda-74b39-default-rtdb.firebaseio.com/",
  projectId: "techadda-74b39",
  storageBucket: "techadda-74b39.appspot.com",
  messagingSenderId: "683371156431",
  appId: "1:683371156431:web:d1c8d27f9609db0f4438ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getDatabase(app);
export default firebaseConfig;