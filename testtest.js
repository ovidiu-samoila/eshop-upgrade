var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var promise = require('bluebird');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var mongoose   = require('mongoose');
var Client     = require('./app/models/client');
var Order     = require('./app/models/order');


//conexiunea

mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');

//var query = someModel.find(queryObject);
/*var promise = query.exec();*/


var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }, promiseLibrary: require('bluebird') };

var mongodbUri = 'mongodb://localhost/local';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {


    var aaron = new Client({
        firstname: 'Aaron',
        lastname: 'Joe',
        email: 'joe@gmail.com'
    });


    aaron.save(function (err) {
        if (err) return handleError(err);




        var ord1 = new Order({
            date: 12-12-2017,
            delivery: 'panselutelor',
            payment:  1000,
            client:aaron._id
        });


        ord1.save(function (err) {
            if (err) return handleError(err);
        });
    });


    Order.
    findOne({client:aaron._id}).
    select('client').
    populate('client').
    then(function (err, order) {
        if (err) return handleError(err);
        console.log('Order 1: %s', order.client.firstname);
    });



    });


return false;











