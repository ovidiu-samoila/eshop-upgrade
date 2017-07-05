var Order     = require('../../models/order');

module.exports = function (req, res) {
    Order.find({
        "date": {$gte: req.params.my_date}
    }, function (Orders) {
        res.json({
            success: true,
            data: Orders
        });
    });
};