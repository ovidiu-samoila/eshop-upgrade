var Repository = require('./clientsRepo');

module.exports = function(req, res) {

    if(typeof req.body == 'undefined' || Object.keys(req.body).length == 0) {
        return res.status(400).json({
            success: false,
            data: {message: "Invalid input"}
        });
    }

    Repository.create({
        firstname: req.body.firstname || new Date(),
        lastname: req.body.lastname || [],
        email: req.body.email,
        orders: req.body.orders || ""
    }).then(function (clientCreated) {
        res.json({
            success: true,
            data: clientCreated
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};