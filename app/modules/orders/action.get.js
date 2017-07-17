var Repository = require('./repository');


module.exports = function(req, res) {

    var filters = {};

    console.log("body is", req.query);

    if(req.query) {
        if(typeof req.query.order != 'undefined') {
            filters.order = req.query.order;
        }


        if(typeof req.query.client != 'undefined') {
            filters.client = req.query.client;
        }



        if(typeof req.query.minDate != 'undefined' || typeof req.query.maxDate != 'undefined') {
            filters.date = {};
            if(typeof req.query.minDate != 'undefined'){
                filters.date['$gte'] = new Date(req.query.minDate);
            }
            if(typeof req.query.maxDate != 'undefined'){
                filters.date['$lt'] = new Date(req.query.maxDate);
            }
        }
    }

    console.log("filter is: ", filters);

    Repository.getAll(filters).then(function (Orders) {
        res.json({
            success: true,
            data: Orders
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })
};
