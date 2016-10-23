//server.js - I used expressjs to handle the routers.
var express = require('express');
var http = require('http'); 
var path = require('path');
var app = express();
var router = express.Router();
var request = require('request');

app.set('views', path.join(__dirname, './src/server/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './src/public')));

//This router load the index.ejs template. This contains the base html.
app.use(router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}));

app.use(router.post('/like/:mediaId/:accessToken', function(req, res, next) {
	
	var options = {
	    method: 'POST',
	    uri: 'https://api.instagram.com/v1/media/' + req.params.mediaId + '/likes?access_token=' + req.params.accessToken
	};

	request(options, function(error, response, body) {
	    console.log(body);
	    res.json({ media: req.params.mediaId });
	});

  
}));

app.use(router.delete('/like/:mediaId/:accessToken', function(req, res, next) {
	
	var options = {
	    method: 'DELETE',
	    uri: 'https://api.instagram.com/v1/media/' + req.params.mediaId + '/likes?access_token=' + req.params.accessToken
	};

	request(options, function(error, response, body) {
	    console.log(body);
	    res.json({ media: req.params.mediaId });
	});

  
}));

//This creates the server and start listen at port 3000
http.createServer(app).listen(3000, function() {
  console.log('\nDummy server listening on port 3000');
});

module.exports = app;