var dbRef;
var errorCode = "";
window.onload = function() {
  var config = {
  apiKey: "AIzaSyB3IgkjXuZNJUDVkgZAxQf3HUGW8EOS6fI",
  authDomain: "stanley-test-907bc.firebaseapp.com",
  databaseURL: "https://stanley-test-907bc.firebaseio.com",
  projectId: "stanley-test-907bc",
  storageBucket: "stanley-test-907bc.appspot.com",
  messagingSenderId: "555842685294"
  };
  firebase.initializeApp(config);
  dbRef = firebase.database();
}

//event handlers
$('#login').on('click', validateUser);
$('#addNew').on('click', addNewUser);

function addNewUser() {
  var email = $('#email').val();
  var password = $('#password').val();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/*firebase has something built in so that if there is an error, nothing else after the else is executed. The statements after .catch will only run if there is no error*/
/*firebase.catch() will throw an exception when there is an error caught which means that if will exit if there is an error*/
function validateUser() {
  //get the email and password
  var email = $('#email').val();
  var password = $('#password').val();
  //firebase validation
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function (FirebaseUser) {
    window.location.href = "newMember.html";
  })
  .catch(function(error) {
      // Handle Errors here.
      errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
  });
}

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
