var email_array = [];
var ID_array = [];
var count = 0;

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
    loadMCardTable();
    //injectNewChapterCode();
    //updateChapterInfo();
    //addNewChapter("stanley's_chapter", "1234@gmail.com", "/hello/world/dawg");
  }

  function syncChanges(list, ref) {
    ref.on('child_added', function _add(snap, prevChild) {
      var data = snap.val();
      data.$id = snap.key(); // assumes data is always an object
      var pos = positionAfter(list, prevChild);
      list.splice(pos, 0, data);
    });
  }

function loadMCardTable() {
    //load the page with firebase data
    firebase.database().ref("Chapter_Email_To_Database_Link").on('value', function(rootnode) {
      var memID;
      var memEmail; 
      var memLink; 
      var memChapter;
      var tbody = $('#chapterBody');
      tbody.html("");
      var tr;
      var td;
      rootnode.forEach(function(childnode) {
        //console.log(childnode.key); //printing out the unique key per child
        memID = childnode.key;
        memChapter = childnode.val().chapter;
        memEmail = childnode.val().email; 
        memLink = childnode.val().link;

        //add it to our "hashtable"
        //console.log(memEmail);
        //console.log("1");
        //email_array.push(memEmail);
        email_array[memID] = memEmail;
        //ID_array[count++] = memID;
        //console.log(count);

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
      console.log("Done loading!" + email_array);
      for(var i in email_array) {
          console.log(i + email_array[i])
      }
      //displaytest();
    });
  }

function addNewChapter(chapter_name, email_address, link_string) {
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link');
    contactsRef.push({
        chapter: chapter_name,
        email: email_address, 
        link : link_string
    });
}

function updateChapterInfo(id) {
     //referencing the unique child id for updating / deleting
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/' + id);
    contactsRef.update({
        email: "Dtan1293@gmail.com"
    });
}

//this will permanently delete a chapter! Only to be used incase created by mistake!
function removeChapterInfoByEmail(email_address) {
    var adaRef = firebase.database().ref('users/ada');
    adaRef.remove()
    .then(function() {
        console.log("Remove succeeded.")
    })
    .catch(function(error) {
        console.log("Remove failed: " + error.message)
    });
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

//declares the chapter inactive
//this will display on the html active or inactive
function moveChapterInactive() {

}

//declares chapter active
//this will display on the html active
function moveChapterActive() {

}

function displaytest() {
    console.log(email_array[0]);
}