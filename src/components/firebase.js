

// import { initializeApp } from 'firebase/app';
// import { getAuth , signInWithEmailAndPassword} from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyA6WBS0RYkTd1RdLL84ODpd1Lee9jDSnao",
//   authDomain:  "you-tube-clonne.firebaseapp.com",
//   projectId: "you-tube-clonne",
//   storageBucket: "you-tube-clonne.appspot.com",
//   messagingSenderId: "225799617199",
//   appId: "1:225799617199:web:b160c097b41e82c2df325a",
//   measurementId: "G-CDF8QHEF4G"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // const app = initializeApp(firebaseConfig);

// // const auth = getAuth(app);



// export { auth};
// export default app;
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth} from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyA6WBS0RYkTd1RdLL84ODpd1Lee9jDSnao",
//   authDomain: "you-tube-clonne.firebaseapp.com",
//   projectId: "you-tube-clonne",
//   storageBucket: "you-tube-clonne.appspot.com",
//   messagingSenderId: "225799617199",
//   appId: "1:225799617199:web:b160c097b41e82c2df325a",
//   measurementId: "G-CDF8QHEF4G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const database = getAuth(app)
// const auth = getAuth(app);

// export { auth };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6WBS0RYkTd1RdLL84ODpd1Lee9jDSnao",
  authDomain: "you-tube-clonne.firebaseapp.com",
  projectId: "you-tube-clonne",
  storageBucket: "you-tube-clonne.appspot.com",
  messagingSenderId: "225799617199",
  appId: "1:225799617199:web:b160c097b41e82c2df325a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db }; // Export your Firebase app instance, auth, and db
