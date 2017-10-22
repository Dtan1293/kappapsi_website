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

//var email = "teiyuri.aoshima@gmail.com";
//var password = "firebase123";
//var wrong_password = "davidtansucks";

//event handlers
$('#login').on('click', loginHandler);
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
    // [END_EXCLUDE]
  });
}

function loginHandler() {
  validateUser();
  setTimeout(function() {
    if (errorCode == "") {
      alert("success");
    }
  }, 500);
}

/*firebase has something built in so that if there is an error, nothing else after the else is executed. The statements after .catch will only run if there is no error*/
/*firebase.catch() will throw an exception when there is an error caught which means that if will exit if there is an error*/
function validateUser() {
  //get the email and password
  alert("entered");
  var email = $('#email').val();
  var password = $('#password').val();
  //firebase validation
  firebase.auth().signInWithEmailAndPassword(email, password).catch(
    function(error) {
      // Handle Errors here.
      errorCode = error.code;
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

//alert("Done creating reference in firebase!");
