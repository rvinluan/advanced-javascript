var exp = require('express'),
	app = exp(),
	fs = require('fs'),
	theory = require('./theory.js');

app.get('/', function(request, response){
	fs.readFile('index.html', 'utf-8', function(err, file){
		response.send(file);
	})
});

app.get('/scales/:note', function(request, response){
	var noteInt = theory.stringToNote(request.params.note);
	var scale;
	if(request.query.scale) {
		switch(request.query.scale) {
			case "major":
				scale = "major";
			break;
			case "minor":
				scale = "minor";
			break;
			default:
				scale = "major";
			break;
		}
	} else {
		scale = "major";
	}
	var majorScale = theory.key(noteInt, scale);
	response.send(theory.noteToString(majorScale));
});

app.get('/chords/:chord', function(request, response) {
	var regex = /^([a-g](_sharp|_flat)?)(maj|min|aug|dim)?$/i;
	var match = regex.exec(request.params.chord);
	if(!match) {
		response.send("Invalid Chord! Please check the documentation and try again.");
	}
	//console.log(match);
	response.send(theory.noteToString(theory.chord(match[1], match[3])));
});

app.listen(8080);
console.log("Listening on Port 8080");
