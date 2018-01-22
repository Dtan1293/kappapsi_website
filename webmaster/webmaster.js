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
    updateChapterInfo();
    //AddNewChapter("stanley's_chapter");
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

function AddNewChapter() {
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link');
    contactsRef.push({
        chapter: "David_Tan",
        email: "yellow@gmail.com", 
        link : "Northeast_Province/Beta_Omicron/Roster"
    });
}

function updateChapterInfo() {
     //referencing the unique child id for updating / deleting
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/-KyyaGWp4O3YVIcwhEhb');
    contactsRef.update({
        email: "Dtan1293@gmail.com"
    });
}

//this will permanently delete a chapter! Only to be used incase created by mistake!
function removeChapterInfo() {

}

//declares the chapter inactive
//this will display on the html active or inactive
function moveChapterInactive() {

}

//declares chapter active
//this will display on the html active
function moveChapterActive() {

}