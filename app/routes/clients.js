var express    = require('express');
var router = express.Router();
var CreateClient = require('../modules/clients/action.create');
var GetClients = require('../modules/clients/action.get');

router.route('/')
    .get(GetClients)
    .put(CreateClient);





module.exports = router;
