//please read https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference
//for more information about object arrays! The reference is pass by value, but content can be changed!

var email_array = [];

var options = {
    keys: ['email'],
    threshold: 0.3
}

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
    
    loadMCardTable();
    //updateChapterInfo();
    //addNewChapter("stanley's_chapter", "1234@gmail.com", "/hello/world/dawg", "active");
    $('#button_test').on('click', displayIdEmailArray);
  }

function loadMCardTable() {
    var memID;
    var memEmail; 
    var memLink; 
    var memChapter;
    var tbody = $('#chapterBody');
    tbody.html("");
    var tr;
    var td;
    //load the page with firebase data
    firebase.database().ref("Chapter_Email_To_Database_Link").on('value', function(rootnode) {
      rootnode.forEach(function(childnode) {
        //console.log(childnode.key); //printing out the unique key per child
        memID = childnode.key;
        memChapter = childnode.val().chapter;
        memEmail = childnode.val().email; 
        memLink = childnode.val().link;

        //add it to our "hashtable"
        var item = {};
        item ["id"] = memID;
        item ["email"] = memEmail;
        email_array.push(item);

        //adding data to the tabel on the page    
        //create a new row
        tr = $('<tr>');
        //create columns to append to row
        //TODO: let's create a function for this
        td = $('<td>').text(memChapter);
        tr.append(td);
        td = $('<td>').text(memEmail);
        tr.append(td);
        td = $('<td>').text(memLink);
        tr.append(td);
        td = $('<td>').text(memID);
        tr.append(td);
        tbody.append(tr);
      });
    });
  }

  //adding a new chapter to the database
function addNewChapter(chapter_name, email_address, link_string) {
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link');
    contactsRef.push({
        chapter: chapter_name,
        email: email_address, 
        link : link_string,
        active : true
    });
}

//updating the chapter info for all fields
function updateChapterInfo(id, name, email_address, link_address, status) {
     //referencing the unique child id for updating / deleting
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/' + id);
    contactsRef.update({
        chapter: name,
        email: email_address,
        link : link_address,
        active : status
    });
}

//updating just the chapter's email
function updateChapterEmail(id, email) {
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/' + id);
    contactsRef.update({
        email: "Dtan1293@gmail.com"
    });
}

//updating just the chapter's name
//caution: this may cause issues down the road...
function updateChapterName(id, chapter_name) {
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/' + id);
    contactsRef.update({
        chapter: chapter_name
    });
}

//updating the chapter's link
function updateChapterLink(id, link_url) {
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/' + id);
    contactsRef.update({
        link: link_url
    });
}

//updating the chapters's status
function updateChapterStatus(id, status) {
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/' + id);
    contactsRef.update({
        active: status
    });
}

//this will permanently delete a chapter! Only to be used incase created by mistake!
function removeChapterInfoByEmail(email_address) {
    var options = {
        keys: ['email'],
        threshold: 0.3
    }
    var fuse = new Fuse(email_array, options);
    var results = fuse.search(email_address);
    //somehow display the results to the user, and then they can choose which best result!
    if(results != NULL) {
        $.each(results, function(index, element) {
            console.log(element.email + " " + element.id); //display the result email address matches!
        });
        //after user picks, then pass the ID to the function below!
        removeChapterInfoByID(id);
        return true;
    }  else {
        //say how no matches occured?
        return false;
    }
}

function removeChapterInfoByID(id) {
    var deletenode = firebase.database().ref('Chapter_Email_To_Database_Link/' + id);
    deletenode.remove()
    .then(function() {
        console.log("Remove succeeded.")
    })
    .catch(function(error) {
        console.log("Remove failed: " + error.message)
    });
}

function displayIdEmailArray() {
    console.log("Display Test!");
    console.log(JSON.stringify(email_array)); //printing out the object array in JSON format


    // $.each(email_array, function(index, element) { //using a foreach loop to iterate through the object
    //     console.log(element.email + " " + index); 
    // });

    var fuse = new Fuse(email_array, options);
    var results = fuse.search("Dtan1293@gmail.com");
    console.log(results);
}