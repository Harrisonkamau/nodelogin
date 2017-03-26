var express = require('express');
var router = express.Router();
var numbers = require('../controllers/numbers.js'); 
// var app = express();

// Get homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

// load the coupon page
router.get('/coupon', ensureAuthenticated, function(req, res){
	res.render('coupon');
})

// GET todos Page
router.get('/todos', ensureAuthenticated, function(req, res){
	res.render('todo');
})

// POST todos Page
router.post('/todos', ensureAuthenticated, function(req, res){
	res.render('todo');
})

// add the invite code
router.post('/coupon', ensureAuthenticated, numbers.add);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		// req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
module.exports = router;