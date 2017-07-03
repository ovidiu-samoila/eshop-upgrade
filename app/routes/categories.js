var express    = require('express');
var router = express.Router();
var CreateCategory = require('../modules/categories/action.create');
var GetCategories = require('../modules/categories/action.get');


router.route('/')

    .put(CreateCategory)

    .get(GetCategories);


module.exports = router;
