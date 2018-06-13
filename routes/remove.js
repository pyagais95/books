const express = require('express');
const router = express.Router();
var fs = require('fs')

module.exports = function(app){
	router.get('/:id', function(req, res){
		fs.readFile('db.json', function(err, data){
			if(err){
				res.send({
					"message": "can't read file",
					"status": "fail"
				})
			}
			var json = JSON.parse(data)
			var found = false
			for(let elem of json) {
				if(elem.id == req.params.id){
					found = true
					elem.status = "succes"
					delete json[req.params.id-1]
				}
			}
			if(!found){
				res.send({
					"message": "no such id",
					"status": "fail"
				})
			}
		})
	});
	app.use('/remove', router)
};