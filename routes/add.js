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

			json.push({
				"id": req.query.id,
				"title": req.query.title,
				"author": req.query.author,
				"description": req.query.description
			})
			console.log(req.body)
			fs.writeFile('db.json', JSON.stringify(json), function(err) {
				res.send({
					"message": "data added",
					"status": "success"
				})
			})
			
		})
	});
	app.use('/add', router)
};