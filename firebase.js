import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDWimQdJxZzSBSrSwb-4emU9pCbVQepRK0",
    authDomain: "thecookingbot.firebaseapp.com",
    databaseURL: "https://thecookingbot.firebaseio.com",
    projectId: "thecookingbot",
    storageBucket: "thecookingbot.appspot.com",
    messagingSenderId: "864527142396",
    appId: "1:864527142396:web:d4ad0cc7c4f0bb5a11f679",
    measurementId: "G-GKWWG5DPY4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;



