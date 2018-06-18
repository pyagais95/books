const express = require('express');
const router = express.Router();
var fs = require('fs')

module.exports = function(app){
	router.get('/:id', function(req, res){
		fs.readFile('db.json', function(err, data){
			if(err){
				res.send({
					"message": "can't read file",
					"status": "false"
				})
			}
			var json = JSON.parse(data)
			var found = false
			for(let elem of json) {
				if(elem.id == req.params.id){
					found = true
					elem.status = "succes"
					res.send(elem)
					
				}
			}
			if(!found){
				res.send({
					"message": "no such id",
					"status": "false"
				})
			}
		})
	});
	app.use('/get/book', router)
};