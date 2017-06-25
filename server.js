

//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname+'/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/assignment'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// require('./assignment/undergrad/app');
require("./assignment/services/app.js")(app);
// require("./public_two/serverExample/server_side/app.js")(app);

