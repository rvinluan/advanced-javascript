(function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	canvas.height = document.height;
	canvas.width = document.width;

	function toRad(deg) {
		return deg * (Math.PI / 180);
	}

	context.strokeStyle = '#e88940';
	context.lineWidth = 2;
	context.fillStyle = '#D56914';

	function spiral(x, y, radius, turnings, rotation) {
		var iterations = 360 * turnings;
		var spacing = iterations / radius;
		context.beginPath();
		for (var i = 0; i < iterations; i++) {
			context.arc(x, y, i/spacing, toRad(i - 1) - rotation, toRad(i) - rotation);
		};
		context.fill();
		context.stroke();
		context.closePath();
	}

	//fill with spirals
	var spiralWidth = 50;
	var numRows = (canvas.width / spiralWidth) + 1;
	var numCols = (canvas.height / spiralWidth) + 1;
	for(var i = 0; i < numRows; i++) {
		for(var j = 0; j < numCols; j++) {
			var offset = 0;
			if(j % 2 === 0) {
				offset = spiralWidth/2;
			}
			spiral( i*spiralWidth + offset, j*spiralWidth, spiralWidth * .85, 3, Math.PI);
		}
	}

	//gradient!
	var lingrad = context.createLinearGradient(0,0,0, canvas.height);
	lingrad.addColorStop(0, "rgba(255,255,255,0)");
	lingrad.addColorStop(1, "rgba(37,221,129,0.4)");
	context.fillStyle = lingrad;
	context.fillRect(0,0,canvas.width,canvas.height);

	//draw type!
	context.font = "italic 35pt Georgia";
	context.fillStyle = 'white';
	context.fillText("Javascript!", canvas.width/2 + 100, canvas.height/2);

	//image!
	var img = new Image();
	var imageLeft = canvas.width/2 - 406;
	var imageCenter = imageLeft + 153;
	img.onload = function() {
		//clip path
		context.save();
		context.beginPath();
		context.arc(imageCenter, canvas.height/2, 153, 0, Math.PI * 2);
		context.clip();
		context.drawImage(img, imageLeft, canvas.height/2 - 153);
		context.restore();
	}
	img.src = 'consulate.jpg';

	//lines!
	context.beginPath();
	var iterations = 150;
	var currentR = 470/2;
	for(var i = 0; i < iterations; i++) {
		var step = 360 / iterations;
		var icx = imageCenter,
			icy = canvas.height/2;
		if(Math.random() > 0.5) {
			currentR -= 5;
			if(currentR < 170) {
				currentR += 15;
			}
		} else {
			currentR += 5;
			if(currentR > 280) {
				currentR -= 15;
			}
		}
		context.moveTo(icx, icy);
		context.lineTo(icx + (currentR * Math.cos(toRad(step*i))),
			icy + (currentR * Math.sin(toRad(step*i))));
	}
	context.strokeStyle = "white";
	context.stroke();
	context.closePath();
})();
