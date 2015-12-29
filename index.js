var express = require('express');
var walk = require('walk');
var path = require('path');
var app = express();
var dir = "/Library/WebServer/Documents/Random/s2/alt/Movies";

var allowed_extensions = ['.mp3','.mp4','.mkv','.avi'];

app.use('/static', express.static('static'));

app.get('/files', function (req, res) {
	files = [];
	walker = walk.walk(dir, {followLinks: false});
	walker.on('file', function(root, stat, next){
		var ext = path.extname(stat.name);
		if ( allowed_extensions.indexOf(ext) >= 0 )
		{
			files.push(stat.name);
		}
		next();
	});
	walker.on('end', function(){
		res.send(JSON.stringify(files));
	});
});

var server = app.listen(1090, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on at http://%s:%s', host, port);
});
