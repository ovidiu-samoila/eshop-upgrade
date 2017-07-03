// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

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
    // Wait for the database connection to establish, then start the app.


    var Category     = require('./app/models/category');
    var Client     = require('./app/models/client');
    var Order     = require('./app/models/order');
    var Product     = require('./app/models/product');

    var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
    var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

// more routes for our API will happen here


    router.route('/categories')

    // create a category
        .post(function(req, res) {

            var category = new Category();// create a new instance of the Bear model
            category.Name= req.body.Name;
            category.description = req.body.description;
            category.products = req.body.product
            // save the category and check for errors
            category.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Category created!' });
            });

        })

        // get all the category
        .get(function(req, res) {
            console.log("before getting data");
            Category.find(function(err, categories) {
                if (err)
                    res.send(err);

                res.json(categories);
            });
        })




    router.route('/categories/:category_id')

    // get the product with that id
        .get(function(req, res) {
            Category.findById(req.params.category_id)
                .populate('products')
                .exec(function(err, category) {
                if (err)
                    res.send(err);
                res.json(category);
            });
        })





        .put(function(req, res) {

            // use our category model to find the category we want
            Category.findById(req.params.category_id, function(err, category) {

                if (err)
                    res.send(err);

                category.namecat = req.body.namecat;  // update the category info
                category.description = req.body.description;

                // save the bear
                category.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Category updated!' });
                });

            });
        });


/////////////////////////////////


    router.route('/products')

    // create a product
        .post(function(req, res) {

            var product = new Product();      // create a new instance of the Product model
            product.title = req.body.title;
            product.price= req.body.price;
            product.description= req.body.description;
            product.category= req.body.category;
            product._order= req.body._order;


            // save the product and check for errors
            product.save(function(err) {
                if (err)
                    res.send(err);
                Category.findById(req.body.category, function(err, category) {
                    if (!err)
                        res.send(err);
                    category.push(product);
                    category.save();
                });
                res.json({ message: 'Product created!' });
            });

        })

        // get all the products
        .get(function(req, res) {
            console.log("before getting data");
            Product.find(function(err, products) {
                if (err)
                    res.send(err);

                res.json(products);
            });
        });




    router.route('/products/:products_id')


        .get(function(req, res) {
            Product.findById(req.params.products_id)
                .populate([
                    'category',
                    '_order'
                ])
                .exec(function(err, product) {
                if (err)
                    res.send(err);
                res.json(product);
            });
        })





        .put(function(req, res) {

            // use our product model to find the product we want
            Product.findById(req.params.producrts_id, function(err, product) {

                if (err)
                    res.send(err);

                product.title = req.body.title;
                product.category= req.body.category;
                product.price= req.body.price;
                product.description= req.body.description;

                // save the bear
                product.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Product updated!' });
                });

            });
        });



    /////////////////////////////////////////////////////////


    router.route('/orders')

        .post(function(req, res) {

            var order= new Order();      // create a new instance of the Order model
            order.date= req.body.date;
            order.product= req.body.product;
            order.delivery= req.body.delivery;
            order.payment= req.body.payment;
            order.client= req.body.client;


            order.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Order created!' });
            });

        })

        .get(function(req, res) {
            console.log("before getting data");
            Order.find(function(err, orders) {
                if (err)
                    res.send(err);

                res.json(orders);
            });
        })




    router.route('/orders/:orders_id')

        .get(function(req, res) {
            Order.findById(req.params.orders_id).populate('client')
                .exec(function(err, order) {
                    if (err)
                        res.send(err);
                    res.json(order);
                })
        })


       /* .get(function(req, res) {
            Order.findById(req.params.orders_id, function(err, order) {
                if (err)
                    res.send(err);
                res.json(order);
            });
        })*/





        .put(function(req, res) {

            // use our order model to find the order we want
            Order.findById(req.params.orders_id, function(err, order) {

                if (err)
                    res.send(err);

                order.date= req.body.date;
                order.client= req.body.client;
                order.product= req.body.product;
                order.delivery= req.body.delivery;
                order.payment= req.body.payment;


                order.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Order updated!' });
                });

            });
        });


//////////////////////////////////////////////





    router.route('/clients')

        .post(function(req, res) {

            var client= new Client();      // create a new instance of the client model
            client.firstname= req.body.firstname;
            client.lastname= req.body.lastname;
            client.email= req.body.email;



            client.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Client created!' });
            });

        })

        .get(function(req, res) {
            console.log("before getting data");
            Client.find(function(err, clients) {
                if (err)
                    res.send(err);

                res.json(clients);
            });
        })




    router.route('/clients/:clients_id')

        .get(function(req, res) {
            Client.findById(req.params.clients_id, function(err, client) {
                if (err)
                    res.send(err);
                res.json(client);
            }).populate('order');
        })





        .put(function(req, res) {

            // use our order model to find the order we want
            Client.findById(req.params.clients_id, function(err, client) {

                if (err)
                    res.send(err);

                client.firstname= req.body.firstname;
                client.lastname= req.body.lastname;
                client.email= req.body.email;


                client.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Client updated!' });
                });

            });
        });










// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /ap

// START THE SERVER
// =============================================================================
    app.listen(port);
    console.log('Magic happens on port ' + port);



});


