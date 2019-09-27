const firebase = require('firebase');

require('firebase/firestore');

const FIREBASE_CONFIG = {};

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

export default db;
