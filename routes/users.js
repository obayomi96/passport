var express = require('express');
var router = express.Router();

// Login page - GET request
router.get('/login', function(req, res){
    res.send('LOGIN PAGE');
});

// Register page - POST request
router.get('/register', function(req, res){
    res.send('REGISTER PAGE');
});

module.exports = router;