//TODO

//security note, test if a person can copy and paste stuff to manipulate with database through console of
//web broswer!

$(window).on("load", function () {
	$("#file").bind("change", ReadFile);
	$("#email_file").bind("change", ParseEmailToChapter);
});


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
		var columns = lines[0].split(",");
		console.log("Columns Presented: ");
		for(var i = 0; i < columns.length; i++) {
			console.log(columns[i]);
		}

		for(var i = 1; i < lines.length; i++) {
			var data = lines[i].split(",");
			var chapter = data[0];
			var university = data[1];
			var email = data[2];
			var type = data[3];
			var province = data[4];
			var link = province + "/" + chapter;
			console.log(link);

			//store this data to firebase!
		}
	}
	reader.readAsText(file)

	//testing git!
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
			temp_link += seperating_chapter_location[0].trim(); //first value will always be chapter
			for(var j = 1; j < seperating_chapter_location.length; j++) {
				if(seperating_chapter_location[j] != "") {
					var school_info = seperating_chapter_location[j].split("-");
					var school_name = school_info[0];
					var school_location = school_info[1];
					temp_link += "/" + school_name.trim();
				}
			}
			temp_link = temp_link.replace(/ /g, "_");
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

//determines the number of front tabs are present!
function NumberOfFrontTab(line) {

}

function StoreDataSetToFireBase(url, data) {

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