var Repository = require('./repository');


module.exports = function(req, res) {
    Repository.getAllForClient(req.param('client_id')).then(function (allOrders) {
        res.json({
            success: true,
            data: allOrders
        });
    });
};
