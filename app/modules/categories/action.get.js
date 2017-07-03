var Repository = require('./categoriesRepo');

module.exports = function(req, res) {

    /*if(typeof req.body == 'undefined' || typeof req.body.Name == 'undefined') {
        return res.status(400).json({
            success: false,
            data: "Specify a category name"
        });
    }
*/
    Repository.getAllForProducts(req.body.products).then(function (allCategories) {
        res.json({
            success: true,
            data: allCategories
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};