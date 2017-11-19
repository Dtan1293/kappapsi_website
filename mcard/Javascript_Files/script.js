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
      //injectFireaseCode();
      
}

//event handlers
$('#login').on('click', validateUser);
$('#addNew').on('click', addNewUser);
$('#google_login').on('click', googleSignIn);


//injecting database initial entries

function injectFireaseCode() {
  var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link');
  contactsRef.push({
    email: "yellow@gmail.com", 
    link : "Northeast_Province/Beta_Omicron/Roster"
  });

    contactsRef.push({
    email: "blue@gmail.com", 
    link : "Southwest_Province/Zillow/Roster"
  });

  //   contactsRef.push({
  //   name: "Northeast_Province",
  //   phone: "206-832-5599",
  //   email: "Dtan1293@gmail.com", 
  //   grad: "20183",
  //   school: "Hot stuff",
  //   chapter: "hot girls"
  // });



}

//only works if you are running XAMPP or it's on a legit webserver!
function googleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  console.log("Scope alredy added!");
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    window.location.href = "newMember.html";
    // ...
  }).catch(function(error) {
    console.log("errors happend!");
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

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
    //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
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
