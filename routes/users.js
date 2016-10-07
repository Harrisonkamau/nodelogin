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
    
    console.log(username);

});


module.exports = router;