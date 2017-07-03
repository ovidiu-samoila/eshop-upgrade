var Product     = require('../../models/product');
var Category    = require('../../models/category');

module.exports = {
    create: function (payload) {
        var savedProduct = null;
        return (new Product(payload)).save()
            .then(function (product) {
                savedProduct= product;
                return savedProduct;
            })
            .then(function () {
                return Category.findById(savedProduct.category)
            })
            .then(function () {
                return savedProduct;
            })
            ;
    },

    getAllForCategory: function (categoryId) {
        return Product.find({category: categoryId})
    },

    getAll: function (filter) {
        return Category.find(filter)
    }

    //getById:

};
