
/*var Repository  = require('./repository');*/

var Order     = require('../../models/order');

/*module.exports = function (req, res) {
   Repository.deleteOrderById(req.param('order_id')).then(function (err, order) {
        if (err) return res.send(err);
        res.json({
            message: 'Order successfully deleted.'
        });
    });
};*/


module.exports = function (req, res) {
    Order.remove({
        _id: req.params.order_id
    }, function (err, order) {
        if (err) return res.send(err);
        res.json({ message: 'Order successfully deleted.' });
    });
};
