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
	var callback = request.query.callback;
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
	var returnData = 		theory.noteToString(
			majorScale,
			noteInt
		);
	if(callback) {
			response.send(callback + '(' + JSON.stringify(returnData) + ')');
	} else {
		response.send(returnData);
	}
});

app.get('/chords/:chord', function(request, response) {
	var regex = /^([a-g](_sharp|_flat)?)(maj|min|aug|dim)?$/i;
	var match = regex.exec(request.params.chord);
	var callback = request.query.callback;
	if(!match) {
		response.send("Invalid Chord! Please check the documentation and try again.");
	}

	var returnData = theory.noteToString(
			theory.chord(theory.stringToNote(match[1]), match[3]), 
			theory.stringToNote(match[1])
		);

	if(callback) {
			response.send(callback + '(' + JSON.stringify(returnData) + ')');
	} else {
		response.send(returnData);
	}
});

app.listen(8080);
console.log("Listening on Port 8080");
