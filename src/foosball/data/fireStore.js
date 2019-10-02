const firebase = require("firebase");
require("firebase/firestore");

const FIREBASE_CONFIG = null;
//replace with FIREBASE_CONFIG found on confluence

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

export default db;
