var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var passport = require('passport');
var appRoutes = require('./routes');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var mongoose   = require('mongoose');


// configure app to use bodyParser()
// this will let us get the data from a POST



var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// var mongodbUri = 'mongodb://florin:faroMedia~@ds133922.mlab.com:33922/florin';
var mongodbUri = 'mongodb://localhost/local';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {


    app.use(morgan('dev')); // log every request to the console
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json());

    app.set('view engine', 'ejs'); // set up ejs for templating

    app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session




    require('./config/passport')(passport);
    app.use('/api', appRoutes(passport));
    var port = 3000;

    app.listen(port, function () {
        console.log('Magic happens on port ' + port);
    });



});