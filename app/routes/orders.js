var express    = require('express');
var router = express.Router();
var CreateOrder = require('../modules/orders/action.create');
var GetOrders = require('../modules/orders/action.get');
var DeleteOrderById = require('../modules/orders/action.deleteOrderById');
var EditOrder = require('../modules/orders/action.editOrder');
var Repository = require('../modules/orders/repository');



router.route('/')
    .put(Repository.ensureAuthenticated,CreateOrder)
    .get(Repository.ensureAuthenticated,GetOrders)
    .post(Repository.ensureAuthenticated,EditOrder);

router.route('/:order_id')
    .delete(DeleteOrderById);



/*router.route('/edit/:order_id').post(EditOrder);*/

module.exports = router;