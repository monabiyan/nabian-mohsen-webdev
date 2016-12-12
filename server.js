var express = require('express');
var app = express();


//bodyParser configuration codes (3 lines)
var bodyParser = require('body-parser');


///////////////////////////////  Passport parts
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');


app.use(cookieParser());
app.use(session({ secret: "582392369aaf1e9a024cac1b077812f9" }));
app.use(passport.initialize());
app.use(passport.session());



///////////////////////////////  Passport parts




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);


//access to app.js in the assignment file which handles server services.
require("./assignment/app.js")(app);


app.set('ipaddress',(process.env.IP));
app.set('port',(process.env.PORT||3000));
app.listen(app.get('port'),app.get('ipaddress'));
