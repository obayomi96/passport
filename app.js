var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').strategy;
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var PORT = process.env.PORT || 3000;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express session middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// express validator middleware
app.use(expressValidator({
errorFormatter: function(param, msg, value){
    let namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
    
    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg   : msg,
        value : value
    };
  }
}));

// Connect-flash Middleware
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Define Routes
app.use('/', routes);
app.use('/users', users);

app.listen(PORT);
console.log('Server started Successfully');
