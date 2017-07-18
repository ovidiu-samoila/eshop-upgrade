var Category     = require('../../models/category');
var Products     = require('../../models/product');

module.exports = {
    create: function (payload) {
        var savedCategory = null;
        return (new Category(payload)).save()
            .then(function (category) {
                savedCategory = category;
                return savedCategory;
            })
            .then(function () {
                return Products.findById(savedCategory.products)
            })
            .then(function () {
                return savedCategory;
            })
            ;
    },

    getAllForProducts: function (productsId) {
        return Category.find({products: productsId})
    },

    getAll: function (filter) {
        return Category.find(filter)
    }

    //getById:

};
