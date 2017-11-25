if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log('The File APIs are fully supported in this browser.');
} else {
    console.log('The File APIs are not fully supported in this browser.');
}

//document.getElementById('file').addEventListener('change', readFile, false);

$("#file").bind("change", readFile);

function readFile (evt) {
   var files = evt.target.files;
   var file = files[0];           
   var reader = new FileReader();
   reader.onload = function(event) { 
     var lines = event.target.result.split('\n');
     var t0 = performance.now();
     processLines(lines);
     var t1 = performance.now();
     console.log("Call to processLines took " + (t1 - t0) + " milliseconds.");
   }
   reader.readAsText(file)
}

function processLines(lines) {
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
function numberOfFrontTab(line) {

}

