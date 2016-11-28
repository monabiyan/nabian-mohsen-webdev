var express = require('express');
var app = express();


//bodyParser configuration codes (3 lines)
var bodyParser = require('body-parser');
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
