import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBFsW2hEycxHES446gWvryOzdxdxG1KZ-c",
    authDomain: "buenvecino-a8a48.firebaseapp.com",
    databaseURL: "https://buenvecino-a8a48.firebaseio.com",
    projectId: "buenvecino-a8a48",
    storageBucket: "buenvecino-a8a48.appspot.com",
    messagingSenderId: "836679119674",
    appId: "1:836679119674:web:d7095120745b1f805d9603"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)

const db = fb.firestore()
const auth = fb.auth()

export {db, auth}