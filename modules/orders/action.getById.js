var Repository = require('./repository');


module.exports = function(req, res) {
    switch (req.param('type')){
        case 'order_id':
            Repository.getAllForOrder(req.param('order_id')).then(function (allOrders) {
                res.json({
                    success: true,
                    data: allOrders
                });
            });
            break;
        case 'client_id':
            Repository.getAllForClient(req.param('id')).then(function (allOrders) {
                res.json({
                    success: true,
                    data: allOrders
                });

            });
            break;
        }
};
