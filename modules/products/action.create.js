var Repository = require('./productsRepo');

module.exports = function(req, res) {

   /* if(typeof req.body == 'undefined' || Object.keys(req.body).length == 0) {
        return res.status(400).json({
            success: false,
            data: {message: "Invalid input"}
        });
    }*/

    Repository.create({
        title: req.body.title || new Date(),
        category: req.body.category ,
        _order: req.body._order || [],
        price: req.body.price || "",
        description: req.body.description || ""
    }).then(function (productCreated) {
        res.json({
            success: true,
            data: productCreated
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};