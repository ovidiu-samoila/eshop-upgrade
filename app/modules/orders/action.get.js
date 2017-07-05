var Repository = require('./repository');


module.exports = function(req, res) {
    Repository.getAll(req.body).then(function (Orders) {
        res.json({
            success: true,
            data: Orders
        });
    })
};
