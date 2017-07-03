var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var appRoutes = require('./routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose   = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// var mongodbUri = 'mongodb://florin:faroMedia~@ds133922.mlab.com:33922/florin';
var mongodbUri = 'mongodb://localhost/local';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {

    app.use('/api', appRoutes);

    var port = 3000;

    app.listen(port, function () {
        console.log('Magic happens on port ' + port);
    });



});