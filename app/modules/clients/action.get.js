var Repository = require('./clientsRepo');

module.exports = function(req, res) {

    /*if(typeof req.body == 'undefined' || typeof req.body.client == 'undefined') {
        return res.status(400).json({
            success: false,
            data: "Specify a client id"
        });
    }*/

    Repository.getAllForOrder(req.body.order).then(function (allClients) {
        res.json({
            success: true,
            data: allClients
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};