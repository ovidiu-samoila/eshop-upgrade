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
var Category = require('./app/models/category');
var Product = require('./app/models/product');


var cat1 = new Category({
    Name: "MyCategory for testing",
    description: "My Products description",



});



var prod1 = new Product({
    title: "myProduct",
    price: 800,
    description: "This is a description",
    category: cat1._id
});


/*
var prod2 = new Product ({
    title: "myProduct2",
    price:900,
    description: "description 2"
});
*/


//conexiunea

mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');

var query = someModel.find(queryObject);
var promise = query.exec();


var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }, promiseLibrary: require('bluebird') };

var mongodbUri = 'mongodb://localhost/local';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {

    cat1.save().then(function (result) {
        console.log("Category ", result)
    });


    prod1.save().then(function (result) {
        console.log("Product ", result)
    });


 /*   prod2.save().then(function(result){
        console.log("Product2", result)
    });*/


        Product
            .findOne({title: 'myProduct'})
            .populate({path:'category', select: 'Name'})
            .then(function(err,product){
                if(err) handleError(err)
                console.log(product)
            })

});


return false;











