var express = require('express');
var router = express.Router();
var fs = require('fs')

module.exports = function(app, db) {

	router.get('/book/:id', function(req, res) {
		fs.readFile('./db.json', function(err, data) {
			if (err) {
				res.send({
					message: "Can not read file",
					status: false
				})
			} else {
				var json = JSON.parse(data).posts
				var newJson = {
					posts: []
				}
				for (let elem of json) {
					if(elem.id != req.params.id) {
						newJson.posts.push(elem)
				}
			}

			fs.writeFile('./db.json', JSON.stringify(newJson), function(err, data) {
				if (err) {
					res.send({
						message: "can't remove book",
						status: false
					})
				} else {
					res.send({
						message: "book removed",
						status: true
				})
				
			};
			
		});
	}
})
})
	app.use('/remove', router);
};