var Repository = require('./categoriesRepo');

module.exports = function(req, res) {

  /*  if(typeof req.body == 'undefined' || Object.keys(req.body).length == 0) {
        return res.status(400).json({
            success: false,
            data: {message: "Invalid input"}
        });
    }*/

    Repository.create({
        Name: req.body.Name || new Name(),
        description: req.body.description,
        products: req.body.products || []

    }).then(function (categoryCreated) {
        res.json({
            success: true,
            data: categoryCreated
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};