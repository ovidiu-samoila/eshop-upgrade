var Repository = require('./repository');

module.exports = function(req, res) {

    console.log(req.body);
    if(typeof req.body == 'undefined' || typeof req.body.client == 'undefined') {
        return res.status(400).json({
            success: false,
            data: "Specify a client id"
        });
    }


    Repository.getById(req.body).then(function (Order) {
        res.json({
            success: true,
            data:Order
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};