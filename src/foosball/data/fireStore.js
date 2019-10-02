const firebase = require("firebase");
require("firebase/firestore");

const FIREBASE_CONFIG = JSON.parse(process.env.REACT_APP_FIREBASE)

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

export default db;
