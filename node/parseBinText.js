var fs = require("fs");
var Lazy = require("lazy");

var args = process.argv.slice(2);

if(args.length < 2)
{
	console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " inFile outFile");
	return;
}

var inFile = new Lazy(fs.createReadStream(args[0]));
var outFile = fs.createWriteStream(args[1]);


inFile.lines.forEach(function(buffer){
	var line = buffer.toString();	
	
	const buf2 = new Buffer(line.split(' ').join(''), 'hex');

	outFile.write(buf2);
});
