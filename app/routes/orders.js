var express    = require('express');
var router = express.Router();
var CreateOrder = require('../modules/orders/action.create');
var GetOrders = require('../modules/orders/action.get');
var GetOrdersById = require('../modules/orders/action.getById');


router.route('/')
    .get(GetOrders);
router.route('/order')
    .put(CreateOrder);

router.route('/:clientId')
    .get(GetOrdersById);




module.exports = router;