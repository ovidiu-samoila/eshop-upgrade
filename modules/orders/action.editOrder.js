var Order     = require('../../models/order');


module.exports = function (req, res) {

var filter = {};


    if(req.query) {
        if (typeof req.query.order != 'undefined') {
            filter.order = req.query.order;
        }
    }

        Order.findByIdAndUpdate(filter, {$set:
            {
                date: req.body.date,
                delivery: req.body.delivery,
                payment: req.body.payment,
                products: req.body.products,
                client: req.body.client
            }}, {new: true}, function (order) {

            res.status(200).send(order);
        });



};
