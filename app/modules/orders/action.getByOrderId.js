var Repository = require('./repository');


module.exports = function(req, res) {
    Repository.getAllForOrder(req.param('order_id')).then(function (allOrders) {
        res.json({
            success: true,
            data: allOrders
        });
    });
};
