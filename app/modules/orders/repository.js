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
            /*.then(function (client) {
                //send email to client obj
                return emailSender(client.email, client.firstname, savedOrder);
            })*/.then(function () {
                return savedOrder;
            })
            ;
    },

    getAllForClient: function (clientId) {
        return Order.find({client: clientId})
    },

    getAll: function (filter) {
        return Order.find(filter)
    },

    getById: function(req, res) {
        Order.findById(req.params.clientId)
            .populate('client')
            .exec(function (err, order) {
                if (err)
                    res.send(err);
                res.json(order);
            })
    }








};
