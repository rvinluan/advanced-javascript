//Theory is a module for creating JSON objects about music theory.
//Get information about chords, keys, and notes.
//Robert Vinluan, 2013
//Documentation is fun.

var notes = {
	C_FLAT: 12,
	C: 1,
	C_SHARP: 2,
	D_FLAT: 2,
	D: 3,
	D_SHARP: 4,
	E_FLAT: 4,
	E: 5,
	E_SHARP: 6,
	F_FLAT: 5,
	F: 6,
	F_SHARP: 7,
	G_FLAT: 7,
	G: 8,
	G_SHARP: 9,
	A_FLAT: 9,
	A: 10,
	A_SHARP: 11,
	B_FLAT: 11,
	B: 12,
	B_SHARP: 1,
}

module.exports = {
	allNotes: notes,
	/* stringToNote
	*
	* takes a query string and parses it to find out an (integer) note.
	* accepted syntaxes (with C# as an example)
	* (note how the chord letter is capitalized)
	* 1. c_sharp
	* 2. d_flat
	*
	* more syntaxes to come.
	*/
	stringToNote: function(str) {
		var cleanStr = str.replace(/\s/,'');
		var regex = /^([abcdefg])(_sharp|_flat)?$/i;
		var match = regex.exec(str);
		if(match) {
			return notes[ match[0].toUpperCase() ];
		} else {
			return -1;
		}
	},
	/* noteToString
	*
	* takes an (integer) note and returns a string of the note name.
	* for enharmonic equivalents, an optional root parameter can be given.
	* otherwise, notes will default to being sharp.
	*
	* Although root isn't implemented right now.
	*/
	noteToString: function(note, root) {
		var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
		if(Object.prototype.toString.call( note ) === '[object Array]') {
			//then this is an array
			return note.map( function(elem) { return this.noteToString(elem) }, this);
		}
		if(note == -1) {
			return "Invalid Note";
		} else {
			return notes[note-1];
		}
	},
	/* key
	*
	* takes an (integer) note and returns the notes in the provided scale.
	* accpeted scales:
	* 1. major (default if scale is not provided)
	* 2. minor
	* 
	*
	* more scales to come.
	*/
	key: function(note, scale) {
		var a = [];
		switch(scale) {
			default:
			case "major":
				var currentNote = note;
				a.push(currentNote);
				for(var i = 1; i < 7; i++) {
					if(i == 3 || i == 7) {
						currentNote += 1;
					} else {
						currentNote += 2;
					}
					if(currentNote >= 13) {
						currentNote = currentNote - 12;
					}
					a.push(currentNote);
				}
			break;
			case "minor":
				var currentNote = note;
				a.push(currentNote);
				for(var i = 1; i < 7; i++) {
					if(i == 2 || i == 5) {
						currentNote += 1;
					} else {
						currentNote += 2;
					}
					if(currentNote >= 13) {
						currentNote = currentNote - 12;
					}
					a.push(currentNote);
				}
			break;
		}
		return a;
	},
	/* chord
	*
	* given an (integer) note and sound, returns a triad of notes in the chord.
	* accepted sounds:
	* 1. maj (default if sound is not provided)
	* 2. min
	* 3. aug
	* 4. dim
	*
	* more sounds to come.
	*/
	chord: function(note, sound) {
		var scale = this.key( this.stringToNote(note) , "major");
		var triad = [];
		switch(sound) {
			default:
			case "maj":
				triad.push( scale[0] );
				triad.push( scale[2] );
				triad.push( scale[4] );
			break;
			case "min":
				triad.push( scale[0] );
				triad.push( scale[2] - 1 );
				triad.push( scale[4] );
			break;
			case "aug":
				triad.push( scale[0] );
				triad.push( scale[2] );
				triad.push( scale[4] + 1 );
			break;
			case "dim":
				triad.push( scale[0] );
				triad.push( scale[2] - 1 );
				triad.push( scale[4] - 1 );
			break;
		}
		for(var i in triad) {
			var n = triad[i];
			if(n >= 13) {
				n = n - 12;
			}
		}

		return triad;
	}
}