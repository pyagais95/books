const express = require('express');
const router = express.Router();
var fs = require('fs')

module.exports = function(app){
	router.get('/', function(req, res) {
		fs.readFile('db.json', function(err, data) {
			if(err){
				res.send({
					"message": "no books in database",
					"status": "false"
				})
			}
			var json = JSON.parse(data)
			res.send(json)
			
		})
	});
	app.use('/get/all', router);
};