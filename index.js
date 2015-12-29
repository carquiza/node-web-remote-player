var express = require('express');
var walk = require('walk');
var path = require('path');
var app = express();
var dir = "/Library/WebServer/Documents/Random/s2/alt/Movies";

var allowed_extensions = ['.mp3','.mp4','.mkv','.avi'];

app.use('/static', express.static('static'));

function getFileList(full_path)
{
	var promise = new Promise(function(resolve, reject){
		var files = [];
		walker = walk.walk(dir, {followLinks: false});
		walker.on('file', function(root, stat, next){
			var ext = path.extname(stat.name);
			if ( allowed_extensions.indexOf(ext) >= 0 )
			{
				if (full_path)
				{
					files.push(root+'/'+stat.name);
				}
				else
				{
					files.push(stat.name);
				}
			}
			next();
		});
		walker.on('end', function(){
			resolve(files);
	//		res.send(JSON.stringify(files));
		});
	});
	return promise;
}

app.get('/files', function (req, res) {
	getFileList(false).then(function(files) {
		res.send(JSON.stringify(files));
	});
});

app.get('/play', function(req, res) {
	var index = req.query.f;
	getFileList(true).then(function(files){
		var filename = files[index];
		var ext = path.extname(filename);
		res.send(filename);
	});
});

var server = app.listen(1090, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on at http://%s:%s', host, port);
});
