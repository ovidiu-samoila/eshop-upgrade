var Repository = require('./productsRepo');

module.exports = function(req, res) {

/*
    if(typeof req.body == 'undefined' || typeof req.body.category == 'undefined') {
        return res.status(400).json({
            success: false,
            data: "Specify a product id"
        });
    }
*/

    Repository.getAllForCategory(req.body.category).then(function (allProducts) {
        res.json({
            success: true,
            data: allProducts
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};