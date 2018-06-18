var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

	router.get('/:id', function(req, res) {
		res.render('single', {})
	});

	app.use('/single', router);
};