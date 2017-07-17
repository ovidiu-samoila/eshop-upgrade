var Order     = require('../../models/order');
var Client     = require('../../models/client');
var emailSender  = require('../../modules/orders/action.sendMail');
module.exports = {
    create: function (payload) {
        var savedOrder = null;
        return (new Order(payload)).save()
            .then(function (order) {
                savedOrder = order;
                return savedOrder;
            })
            .then(function () {
                return Client.findById(savedOrder.client)
            })
            .then(function (client) {
                //send email to client obj
                return emailSender(client.email, client.firstname, savedOrder);
            })
            .then(function () {
                return savedOrder;
            })
            ;
    },

    getAllForClient: function (clientId) {
        return Order.find({client: clientId});
    },

    getAll: function (filter) {
        return Order.find(filter).populate('client').populate('products');
    },


    getAllForOrder: function (orderId) {
        return Order.find({_id: orderId}).populate('client').populate('products');
    },


    ensureAuthenticated: function ensureAuthenticated(req, res, next) {
        // console.log(req);
        if (req.isAuthenticated())
            return next();
        else{
            res.json('you are not logged in!')
        }
    }





    /*findByIdAndUpdate:  function (filter) {
        Order.findByIdAndUpdate(filter, {$set:
            {
                date: req.body.date,
                delivery: req.body.delivery,
                payment: req.body.payment,
                products: req.body.products,
                client: req.body.client
            }}, {new: true})}

*/



/*deleteOrderById: function(order_id){
    Order.remove({_id: req.params.order_id})
}*/
};
