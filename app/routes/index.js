var express    = require('express');
var router = express.Router();
var OrdersModule = require('./orders');
var CategoryModule = require('./categories');
var ProductsModule = require('./products');
var ClientsModule = require('./clients');

router.route('/').get(function (req, resp) {
    resp.json({success: true});
});

router.use('/orders', OrdersModule);
router.use('/category', CategoryModule);
router.use('/products', ProductsModule);
router.use('/clients', ClientsModule);

module.exports = router;