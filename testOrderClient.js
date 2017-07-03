    var express    = require('express');
    var app        = express();
    var bodyParser = require('body-parser');
    var Promise = require("bluebird");

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost:27017/test';

    var mongoose   = require('mongoose');
    var Product = require('./app/models/product');
    var Client = require('./app/models/client');
    var Order = require('./app/models/order');
    var Category = require('./app/models/category');


/*


    var cat1 = new Category({
        Name       : "MyCategoryForTesting",
        description: "My Products description",
    });


    var prod1 = new Product({
        title      :"myProduct",
        price      : 800,
        description: "This is a description",
        category   :cat1._id
    });


    var prod2 = new Product ({
        title      : "myProduct2",
        price      :900,
        description: "This is second description",
        category   :cat1._id
    });


    var client1 = new Client({
        firstname : "Joe",
        lastname  : "Doe",
        email     : "Joe@gmail.com",
    });


    var ord1 = new Order({
        client    :client1.id,
        date      : 12-12-2017,
        delivery  : "Zambilelor nr. 24",
        products  : [
            prod1._id,
            prod2._id
        ],
        payment   : 1000
    });
*/


    //conexiunea
    var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

    var mongodbUri = 'mongodb://localhost/local';


    mongoose.connect(mongodbUri, options);
    var conn = mongoose.connection;

    conn.on('error', console.error.bind(console, 'connection error:'));

    conn.once('open', function() {


/*
            cat1.save().then(function (result) {
                console.log("Category ", result)
            });


            prod1.save().then(function (result) {
                console.log("Product ", result)
            });


            prod2.save().then(function(result){
                console.log("Product2", result)
            });


            client1.save().then(function(result){
                console.log("Client:", result)
            });*/

/*
        Product
            .find({title: 'myProduct'})
            .populate('category');*/




/*
        ord1.save(function(err){
            if(err) handleError(err) ;
*/

console.log("My log");


        var client1 = new Client({
            firstname : "Joe",
            lastname  : "Doe",
            email     : "Joe@gmail.com",
        });

        // console.log("client: ", client1);

        var prod1 = new Product({
            title      :"myProduct",
            price      : 800,
            description: "This is a description",
        });


        var prod2 = new Product ({
            title      : "myProduct2",
            price      :900,
            description: "This is second description",
        });



    /*        prod1.save().then(function (saved) {
            console.log("saved", saved);
        });

          prod2.save().then(function (saved) {
              console.log("saved", saved);
          });
*/


        var ord1 = new Order({
            client    : "5956797474d853102f71431a",
            date      : 12-12-2017,
            delivery  : "Zambilelor nr. 24",
            products  : [
                "5956807f7edaf8159a15fdad",
                "5956807f7edaf8159a15fdae"
            ],
            payment   : 1000
        });

        ord1.save().then(function () {

            Order.find({}).populate('client').populate('products').then(function (orders) {
                //console.log("my orders", orders)
                orders.forEach(function (_order) {
                    console.log("Order:", _order.date, _order.products)
                });
            }).catch(function (error) {
                console.log("error:", error);
            })

        });





/*
            Order
                .find({delivery: '/Zambilelor/i'})
                .select('-_id products')
                .populate('products')
                .then(function (err, ord1) {
                    if(!err){
                        console.log(ord1.products);

                    }
                })
*/


        // });
//22


      /* ord1.save().then(function(result) {
                console.log("Order1: ", result)

           Order.find({order:ord1._id})
                 .populate([
                            'products',
                            'client'
                        ])
                 .then(function (err, ord1) {
                            if (err)
                                res.send(err);
                            console.log('Order succesfylly');
                        })

        });*/
//22

        /*Client
            .find({firstname:'joe'})
            .populate('orders')
            .exec(function(err,client1){
                if(err) handleError(err)
                console.log('Succesful')
            })
*/


    });


    return false;











