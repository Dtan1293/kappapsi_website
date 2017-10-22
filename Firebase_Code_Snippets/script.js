var config = {
apiKey: "AIzaSyB3IgkjXuZNJUDVkgZAxQf3HUGW8EOS6fI",
authDomain: "stanley-test-907bc.firebaseapp.com",
databaseURL: "https://stanley-test-907bc.firebaseio.com",
projectId: "stanley-test-907bc",
storageBucket: "stanley-test-907bc.appspot.com",
messagingSenderId: "555842685294"
};
firebase.initializeApp(config);

var dbRef = firebase.database();

var email = "Teiyuri.Aoshima@gmail.com";
var password = "firebase123";
var wrong_password = "davidtansucks";
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// 	// Handle Errors here.
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	// [START_EXCLUDE]
// 	if (errorCode == 'auth/weak-password') {
// 	  alert('The password is too weak.');
// 	} else {
// 	  alert(errorMessage);
// 	}
// 	console.log(error);
// 	// [END_EXCLUDE]
// });

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // [START_EXCLUDE]
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
  //document.getElementById('quickstart-sign-in').disabled = false;
  // [END_EXCLUDE]
});



//var contactsRef = dbRef.ref('honey');

// contactsRef.push({
//   name: 'Time to Hack',
//   email: 'thetime2hack@gmail.com',
//   location: {
//     city: 'The Internet',
//     state: 'The Internet',
//     zip: '127.0.0.1'
//   }
//});

alert("Done creating reference in firebase!");