var http = require('http'),
	fs = require('fs');

var posts = {
	content: [
		{
			hello: "sup there"
		},
		{
			hello: "sup there"
		},
		{
			hello: "sup there"
		}
	]
}

var users = {
	mike: [1,2,3],
	ally: [4,5,6]
}

var server = http.createServer(function(request, response){
	fs.readFile('index.html', 'utf-8', function(err, file) {
		file = file.replace('{{whatever}}', request.url);
		response.end(file);
	});
});

server.listen(8080);
