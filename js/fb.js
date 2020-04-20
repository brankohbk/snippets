
  var firebaseConfig = {
    apiKey: "AIzaSyDULDYB6Z0jUE8ZBmxnlY_MrDNTWiNljps",
    authDomain: "mindhub-snippets.firebaseapp.com",
    databaseURL: "https://mindhub-snippets.firebaseio.com",
    projectId: "mindhub-snippets",
    storageBucket: "mindhub-snippets.appspot.com",
    messagingSenderId: "50406861782",
    appId: "1:50406861782:web:1e9d7afb6bf161eaaf1277"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    // References
    const auth = firebase.auth();
    const functions = firebase.functions();
    const db = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref();
