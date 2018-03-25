//please read https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference
//for more information about object arrays! The reference is pass by value, but content can be changed!

var email_array = [];

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

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
        drawChart(0, 0)
    });
    //removeNode("Chapter_Email_To_Database_Link");
    loadMCardTable();
    //updateChapterInfo();
    //addNewChapter("stanley's_chapter", "1234@gmail.com", "/hello/world/dawg", "active");
    $('#button_test').on('click', displayIdEmailArray);
    $('#file').bind('change', ReadFile);
    $('#upload_chapter_emails').bind('change', ParseEmailToChapter);
    //TODO: create a on click event for creating a new chapter    
  }

//_______________________________________________________Load Page With Data_________________________________________________________//
function loadMCardTable() {
    var memID;
    var memEmail; 
    var memLink;
    var memChapter;
    var tbody = $('#chapterBody');
    tbody.html("");
    var tr;
    var td;
    var graduate;
    var undergraduate;
    var count = 0;
    //load the page with firebase data
    firebase.database().ref("Chapter_Email_To_Database_Link").once('value').then(function(rootnode) {
      rootnode.forEach(function(province) {
        province.forEach(function(chapter) {
            //console.log(chapter.key); //printing out the unique key per child
            memChapter = chapter.key;
            memEmail = chapter.val().email; 
            memLink = chapter.val().link;
            memStatus = chapter.val().status;

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
            td = $('<td>').text(memChapter.replace("_", " "));
            tr.append(td);
            td = $('<td>').text(memEmail);
            tr.append(td);
            td = $('<td>').text(memLink);
            tr.append(td);
            td = $('<td>').text(memID);
            tr.append(td);
            tbody.append(tr);
            count++;
            drawChart(count, 0)
        });
      });
    });
}
//_______________________________________________________________Chart Drawing___________________________________________________________//

function drawChart(a, b) {
    var data = google.visualization.arrayToDataTable ([
        ['Degree', 'Number'],
        ['Collegiate', a],
        ['Graduate', b]
    ]);
    var options = {
        title: 'Collegiate vs. Graduate'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}

//___________________________________________________________________File I/O______________________________________________________________//
function ReadFile (evt) {
	var stopwatch = new PerformanceTime();
	var files = evt.target.files;
	var file = files[0];           
	var reader = new FileReader();
	reader.onload = function(event) { 
		var test = new PerformanceTime();
		var lines = event.target.result.split('\n');
		ProcessLines(lines);
		console.log(test.getTimeDiffString());
	}
	reader.readAsText(file)
	console.log(stopwatch.getTimeDiffString());
}

function ParseEmailToChapter(evt) {
	var files = evt.target.files;
	var file = files[0];           
	var reader = new FileReader();
	reader.onload = function(event) { 
		//create an enum to avoid confusion
		var lines = event.target.result.split('\n');
		 //using PerformanceTime()
		var stopwatch = new PerformanceTime();
		stopwatch.startTime();

		//first grab the general columns of the data in CSV format
		//var columns = lines[0].split(",");
		// console.log("Columns Presented: ");
		// for(var i = 0; i < columns.length; i++) {
		// 	console.log(columns[i]);
		// }

        var count = 0;
        
		for(var i = 1; i < lines.length; i++) {
			var data = lines[i].split(",");
			var chapter = data[0]; //Beta
			var university = data[1]; //UW
			var email = data[2]; 
			var degree = data[3]; //collegiate or graduate
            var province = data[4]; 
            var founded_year = data[5];
            var founded_year_two = data[6];
            var difference_in_date = data[7];
            var website = data[8];
            var status = data[9];
            var link = province + "/" + degree + "/" + chapter;
            console.log(link);
            count++;
            addNewChapter(province, chapter, email, link, status);
            //addNewChapterToDatabase();
        }
        console.log("Added " + count + " to the database!");
	}
    reader.readAsText(file);
}

function ProcessLines(lines) {
	var province_count = 0;
	var collegiate_chapter_count = 0;
	var graduate_chapter_count = 0;
	var link;
	var province;
	var graduate = false;

	for(var i = 0; i < lines.length; i++) {
		var line = lines[i];

		//if no tabs are detected
		if(line.indexOf('\t') == -1) {
			link = "";
			province = line.trim();
			province_count++;
			console.log(province + " Detected!");
		//if one tab is detected
		} else if(line.indexOf('\t\t') == -1) {
			console.log("Type of Chapter: " + line);
			link = province + "/" + line.trim() + "/";
			graduate = (line.trim().toLowerCase().split(" ")[0]  == "graduate") ? true : false;
		//if two tabs are detected
		} else if(line.indexOf('\t\t') != -1) {
			var temp_link = link;
			var seperating_chapter_location = line.trim().split('\t');
            var chapter_insert = seperating_chapter_location[0].trim(); //first value will always be chapter
			temp_link += chapter_insert;
			for(var j = 1; j < seperating_chapter_location.length; j++) {
				if(seperating_chapter_location[j] != "") {
					var school_info = seperating_chapter_location[j].split("-");
					var school_name = school_info[0];
					var school_location = school_info[1];
					temp_link += "/" + school_name.trim();
                    temp_link = temp_link.replace(/ /g, "_");
                    temp_link = temp_link.replace(",", "_");
                    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link');
                    contactsRef.push({
                        chapter: chapter_insert,
                        email: "", 
                        link : temp_link,
                        active : true
                    })
				}
			}
			console.log(temp_link);
			if(graduate) graduate_chapter_count++;
			else collegiate_chapter_count++;
		}
	}
	console.log("Total Provinces: " + province_count);
	console.log("Total Graduate Chapters :" + graduate_chapter_count);
	console.log("Total Collegiate Chapters:" + collegiate_chapter_count);
	console.log("Total Chapters: " + (graduate_chapter_count + collegiate_chapter_count));

}

//stopwatch type function accurate to the microseconds!
function PerformanceTime() {
	var t0 =  performance.now();
	var t1 = 0;

	this.startTime = function() {
		t0 = performance.now();
		t1 = 0;
	};
	this.stopTime = function() {
		t1 = performance.now();
	};
	this.getTimeDiff = function() {
		if(t1 === 0 && t0 != 0) {
			t1 = performance.now();
		} else if(t0 === 0) {
			return -1;
		}
		return t1 - t0;
	};
	this.getTimeDiffString = function() {
		return ("It took " + this.getTimeDiff() + " milliseconds!");
	};
}


function DetermineBrowserFileUploadSupport() {
	//basically add some kind of check to let the users know file uploading is not supported!
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log('The File APIs are fully supported in this browser.');
		return true;
	} else {
		console.log('The File APIs are not fully supported in this browser.');
		return false;
	}
}

//completely remove the node 
function removeNode(node_name) {
    var removal = firebase.database().ref(node_name);
    removal.remove();
}

//adding a new chapter to the database
function addNewChapter(province, chapter_name, email_address, link_string, active_status) {
    //perform some sanitation
    if(province == null || chapter_name == null || email_address == null || link_string == null || active_status == null) {
        return; 
    }

    province = province.replace(" ", "_");
    chapter_name = chapter_name.replace(" ", "_");
    link_string = link_string.replace(" ", "_");
    active_status = active_status.replace("\r", "");
    var contactsRef = firebase.database().ref('Chapter_Email_To_Database_Link/' + province + "/" + chapter_name);
    contactsRef.set({
        email: email_address, 
        link : link_string,
        active : active_status
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
}

//do something with the results
function searchBarClick(email) {
    var options = {
        keys: ['email'],
        threshold: 0.3
    }

    var fuse = new Fuse(email_array, options);
    var results = fuse.search(email);
    console.log(results);
}

function removeChildNode() {
    var deletenode = firebase.database().ref('Chapter_Email_To_Database_Link');
    deletenode.remove();
}