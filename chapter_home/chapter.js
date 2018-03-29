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

    // we can graph whatever in the future for statistical purposes
    // google.charts.load('current', {'packages':['corechart']});
    // google.charts.setOnLoadCallback(function() {
    //     drawChart(0, 0)
    // });
    console.log("Firebase init!");
    var gotUserPromise = getCurrentUserInfo();
    getCurrentUserInfo(gotUserPromise);

    setUpButtonTriggers();
}

function getCurrentUserInfo() {
    var name, email, photoUrl, uid, emailVerified;
    return new Promise(function(resolve, reject) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                            // this value to authenticate with your backend server, if
                            // you have one. Use User.getToken() instead.
                resolve(email);
            } else {
            // No user is signed in.
            //redirect to the main user page!
            console.log("No one is logged in!");
            reject("Failed to get user information!");
            }
        }); 
    });
}

function referenceEmailToChapterLink(userPromise) {
    UserPromise.then(function(result) {
        console.log(result);
        firebase.ref()
    }).catch(function(result) {
        console.log(result)
    });
}

function setUpButtonTriggers() {
    $('add_new_position').click(function() {

    });
}