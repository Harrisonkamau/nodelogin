var express = require('express');
var router = express.Router();

// Register route
router.get('/register', function(req, res){
    res.render('register');
});

// Login route
router.get('/login', function(req, res){
    res.render('login');
});

// Register user
router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    // console.log(username);

    // Form validation
    req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    var errors  = req.validationErrors();

    if(errors){

    }

});


module.exports = router;