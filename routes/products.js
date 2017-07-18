var express = require('express');
var router = express.Router();
var CreateProduct = require("../modules/products/action.create")
var GetProducts = require("../modules/products/action.get")


router.route('/')

    .put(CreateProduct)
    .get(GetProducts);

module.exports = router;