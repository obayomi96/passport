var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('passportapp', ['users']);
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Login page - GET request
router.get('/login', function(req, res){
    res.render('login');
});

// Register page - GET request
router.get('/register', function(req, res){
    res.render('register');
});

// Register - POST request
router.post('/register', function(req, res){
    // get form values
    const name      = req.body.name;
    const email     = req.body.email;
    const username  = req.body.username;
    const password  = req.body.password;
    const password2 = req.body.password2;

    // validation
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Please use a valid email address').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    // Check for errors
    var errors = req.validationErrors();

    if(errors){
        console.log('Form has errors...');
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {
        const newUser = {
            name: name,
            email: email,
            username: username,
            password: password
        }       
        db.users.insert(newUser, function(err, doc){
            if(err){
                res.send(err);
            } else{
                console.log('User Added...');

                // Success message
                req.flash('Success', 'You are registered and can now log in');

                // Redirect after register
                res.location('/');
                res.redirect('/');
            }
        });
    }
});

module.exports = router;