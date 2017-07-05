var express    = require('express');
var router = express.Router();
var CreateOrder = require('../modules/orders/action.create');
var GetOrders = require('../modules/orders/action.get');
var GetOrdersByClientId = require('../modules/orders/action.getById');
var GetOrdersById = require('../modules/orders/action.getByOrderId');


router.route('/').put(CreateOrder).get(GetOrders);
router.route('/:client_id').get(GetOrdersByClientId);
router.route('/order/:order_id').get(GetOrdersById);




module.exports = router;