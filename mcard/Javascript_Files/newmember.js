//temporarily holds the members before sending them
//to firebase
var memberArray = [];

//initialize firebase
var dbRef;
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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var email = firebase.auth().currentUser.email;
      firebase.database().ref("Chapter_Email_To_Database_Link").once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key; //unique id
          var childDataemail = childSnapshot.val().email;
          var childDatalink = childSnapshot.val().link;
          //TODO: store all email addresses lowercase
          if(childDataemail == email) {
            loadMCardTable(childDatalink)
            return true; //stop searching through the data 
          }
        });
      });
    } else {
      // No user is signed in.
      console.log("user not signed in!");
    }
  });
}

//handler for add new member button
$("#addNewMember").on('click', revealMemberForm);
//handler for cancel button
$('#cancel').on('click', revealMemberList);
//handler for submit
$('#submit').on('click', addNewMember);
//handler for logout button
$('#logout').on('click', logOut);

function loadMCardTable(link) {
  //load the page with firebase data
  firebase.database().ref(link).on('value', function(rootnode) {
    var memName;
    var memPhone;
    var memEmaill; 
    var memGradYear; 
    var memSchool;
    var memChapter;
    var tbody = $('#memberBody');
    tbody.html("");
    var tr;
    var td;
    rootnode.forEach(function(childnode) {
      memName = childnode.val().name;
      memPhone = childnode.val().phone;
      memEmail = childnode.val().email; 
      memGradYear = childnode.val().grad; 
      memSchool = childnode.val().school;
      memChapter = childnode.val().chapter;
      //adding data to the tabel on the page    
      //create a new row
      tr = $('<tr>');
      //create columns to append to row
      td = $('<td>').text(memName);
      tr.append(td);
      td = $('<td>').text(memPhone);
      tr.append(td);
      td = $('<td>').text(memEmaill);
      tr.append(td);
      td = $('<td>').text(memGradYear);
      tr.append(td);
      td = $('<td>').text(memSchool);
      tr.append(td);
      td = $('<td>').text(memChapter);
      tr.append(td);
      tbody.append(tr);
    });
  });
}

//reveal the new member form when user clicks 
//add new member
function revealMemberForm() {
  $('#curMemHeading').css('display', 'none');
  $('#memberList').css('display', 'none');
  $('#newMemForm').css('display', 'block');
  $('#newMemHeading').css('display', 'block');
}

//when user clicks cancel on the new member form
//reveal the member list
function revealMemberList() {
  $('#curMemHeading').css('display', 'block');
  $('#memberList').css('display', 'block');
  $('#newMemForm').css('display', 'none');
  $('#newMemHeading').css('display', 'none');
}

//function to process new members
function addNewMember() {
  //get the values user entered into form
  var name = $('#name').val();
  var phone = $('#phone').val();
  var email = $('#memEmail').val();
  var gradYear = $('#gradYear').val();
  var school = $('#school').val();
  var chapter = $('#chapter').val();

  //reveal the member list and hide the new mem registration form
  revealMemberList();
  
  //clear the entries
  $('#name').val("");
  $('#phone').val("");
  $('#memEmail').val("");
  $('#gradYear').val("");
  $('#school').val("");
  $('#chapter').val("");
  
  //add data to firebase
  var contactsRef = firebase.database().ref('Northwest_Province/Beta_Omicron/Roster');
  contactsRef.push({
    name: name,
    phone: phone,
    email: email, 
    grad: gradYear,
    school: school,
    chapter: chapter
  });
}

function logOut() {
  firebase.auth().signOut().then(function() {
    window.location.href = "index.html";
  }, function(error) {
    alert(error.message);
  }); 
}
