var express = require('express');
var router = express.Router();

// Login page - GET request
router.get('/login', function(req, res){
    res.render('login');
});

// Register page - POST request
router.get('/register', function(req, res){
    res.render('register');
});

module.exports = router;