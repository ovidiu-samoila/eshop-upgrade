var Order     = require('../../models/order');
var Client     = require('../../models/client');

module.exports = {
    create: function (payload) {
        var savedClient = null;
        return (new Client(payload)).save()
            .then(function (client) {
                savedClient = client;
                return savedClient;
            })
            .then(function () {
                return Order.findById(savedClient.order)
            })
            .then(function () {
                return savedClient;
            })
            ;
    },

    getAllForOrder: function (orderId) {
        return Client.find({order: orderId})
    },

    getAll: function (filter) {
        return Client.find(filter)
    }

    //getById:

};
