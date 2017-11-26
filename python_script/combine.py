import sys

print "Hello World!";
if len(sys.argv) < 2:
	sys.exit("Please have html javascript at very least!")

html_file = ""; 
css_file = ""; 
javascript_file = "";

for x in range(1, len(sys.argv)):
	if ".html" in sys.argv[x]: 
		html_file = sys.argv[x]
	elif ".css" in sys.argv[x]:
		css_file = sys.argv[x]
	elif ".js" in sys.argv[x]: 
		javascript_file = sys.argv[x];

print("The html file is: " + html_file);
print("The css file is: " + css_file);
print("The javascript file is " + javascript_file);

print(len(html_file));
print(len(javascript_file));
if(len(html_file) > 0 and len(javascript_file) > 0) :
	print("Writing new file!");
	html_file_handler = open(html_file,"r");
	javascript_file_handler = open(javascript_file, "r");
	combined_new_file = open("combine.txt", "w"); 
	combined_new_file.write(html_file_handler.read());
	combined_new_file.write("\n" + "<script>");
	combined_new_file.write(javascript_file_handler.read());
	combined_new_file.write("</script>");
	combined_new_file.close();
	html_file_handler.close();
	javascript_file_handler.close();
