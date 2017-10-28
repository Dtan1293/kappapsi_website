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

/*.then will excute if there were no errors. Else the error statement is executed*/
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
