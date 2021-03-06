var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Todo = require('../models/todo');

/*
=============================================
      User Routes
=============================================
*/

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
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			// console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}

});

// authenticate login using passport
  passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

/*
=============================================
      Todos Routes
=============================================
*/

// GET todos Page
router.get('/todos',function(req, res){
  // Todo.find({title: 'hello'}, (err, todos) => {
  //   if(err) throw err;
  //   res.render('todo');
  // });
  res.render('todo');
})

// Create new Todo
router.get('/todos/new', (req, res) => {
  res.render('newtodo');
})
// POST 
router.post('/todos', function(req, res){ 
  var todoTitle = req.body.newTodo;
  var todo = new Todo({
    title: todoTitle
  });

  // to integrate with back-end soon
  // Todo.create(todo, (err, todos) => {
  //   if(err) throw err;

  //   req.flash('success_msg', 'Todo successfully created!');
  //   res.redirect('/users/todos');
  // })

})

module.exports = router;