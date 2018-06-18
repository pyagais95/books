var express = require('express');
var router = express.Router();
var fs = require('fs')


module.exports = function(app, db) {

	router.get('/', function(req, res) {

		res.render('add', {})

	});

	router.post('/', function(req, res) {
		var newBook = {}
		var count = 0

		fs.readFile('./db.json', function (err, data) {
			if(err) {
				res.send({
					message: "can't read file",
					status: false
				})
			} else {
				var json = JSON.parse(data).posts

				for(let elem of json){
					if (req.body.author == elem.author && req.body.title == elem.title) {
					res.send({
					message: "this book already exist",
					status: false
						})
					} else {
						count++
					}
				}

				newBook.id = count+1
				newBook.author = req.body.author
				newBook.title = req.body.title
				newBook.description = req.body.description
				json.push(newBook)

					fs.writeFile('./db.json', JSON.stringify(json), function(err, data) {
						if (err) {
							res.send({
								message: "can't add book",
								status: false
							})
						} else {
							res.send({
								message: "book added",
								status: true
						})
						
					};
					
				});

			}
		})
	})

	app.use('/add', router);
};