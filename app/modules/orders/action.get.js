var Repository = require('./repository');

module.exports = function(req, res) {
    console.log(req.body);
    if(typeof req.body == 'undefined' || typeof req.body.client == 'undefined') {
        return res.status(400).json({
            success: false,
            data: "Specify a client id"
        });
    }

    Repository.getAllForClient(req.body).then(function (allOrders) {
        res.json({
            success: true,
            data: allOrders
        });
    });


    Repository.getAll(req.body).then(function (Orders) {
        res.json({
            success: true,
            data: Orders
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};