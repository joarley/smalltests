var fs = require("fs");
var Lazy = require("lazy");

var args = process.argv.slice(2);

if(args.length < 2)
{
	console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " inFile outFile [filter1 filter2 ...filterN]");
	return;
}

var inFile = new Lazy(fs.createReadStream(args[0]));
var outFile = fs.createWriteStream(args[1]);


inFile.lines.forEach(function(buffer){
	var line = buffer.toString();	
	for(var i = 2; i < args.length; i++)
		if(line.indexOf(args[i]) == -1)
			return;

	outFile.write(line);
});
