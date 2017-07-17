var express    = require('express');
var router = express.Router();
var CreateClient = require('../modules/clients/action.create');
var GetClients = require('../modules/clients/action.get');
var Repository = require('../modules/orders/repository');



router.route('/')
    .get(Repository.ensureAuthenticated,GetClients)
    .put(Repository.ensureAuthenticated,CreateClient);





module.exports = router;
