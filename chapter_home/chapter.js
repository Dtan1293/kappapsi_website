(function() {
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
        
        //var gotUserPromise = getCurrentUserInfo();
        //getCurrentUserInfo(gotUserPromise);

        setUpButtonTriggers();
        
        //check to see if database link was stored in the session storage, if not store it!
        if(!resolveDatabaseLink()) {
            getCurrentUserInfo().then(function(resolve){
                referenceEmailToChapterLink(resolve);
            }).catch(function(reject){
                //TODO : insert javascript function that blacks out the webpage background!
                alert("Couldn't find you in the database! Please contact webmaster!");
                error_function() //this is hack to ensure js script won't continue
            });
        }
        //
        populatePage();
    }

    function populatePage() {
        var link = sessionStorage.databaselink;
        firebase.database().ref(link + "/" + chapterName).once("value").then(function(result) {
            //grab DOM element and update
        });
    }

    //use as a backup if the session storage came up empty!
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
            firebase.database().ref("Chapter_Email_To_Database_Link").once('value').then(function(rootnode) {
                rootnode.forEach(function(province) {
                province.forEach(function(chapter) {
                    //console.log(chapter.key); //printing out the unique key per child
                    memChapter = chapter.key;
                    memEmail = chapter.val().email; 
                    memLink = chapter.val().link;
                    memStatus = chapter.val().status;
                    if(memEmail === result) {
                        //set the session storage again!
                        sessionStorage.databaseLink = memEmail;
                    }
                });
                });
            });
        }).catch(function(result) {
            console.log(result)
        });
    }

    function setUpButtonTriggers() {
        $("#add_new_position").click(addNewPosition);
        $("#add_new_brother").click(addNewBrother);
    }

    function addNewBrother() {
        //dynamically change the page, 
        // first hide the table, 
        //pop up the add new brother form
        //fill out, grab, and update the info
        firebase.da
    }

    function updateExistingBrotherInfo() {

    }

    function addNewPosition() {

    }

    function resolveDatabaseLink() {
        console.log("here!");
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            if(sessionStorage.databaselink) {
                console.log(sessionStorage.databaselink);
                return sessionStorage.databaselink;
            } else {
                return false;
            }
        } else {
            // Sorry! No Web Storage support..
            console.log("database not supported!");
        }
    }
})();