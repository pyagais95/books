const express = require('express');
const router = express.Router();
var fs = require('fs')

module.exports = function(app){
	router.get('/', function(req, res){
		fs.readFile('db.json', function(err, data){
			if(err){
				res.send({
					"message": "can't read file",
					"status": "false"
				})
			}
			var json = JSON.parse(data)
			if(req.query.key == 123) {
			json.push({
				"id": req.query.id,
				"title": req.query.title,
				"author": req.query.author,
				"description": req.query.description
			})
		} else {
			res.send({
					"message": "invalid key",
					"status": "false"
				})
		}
			fs.writeFile('db.json', JSON.stringify(json), function(err) {
				res.send({
					"message": "data added",
					"status": "true"
				})
			})
			
		})
	});
	app.use('/add', router)
};