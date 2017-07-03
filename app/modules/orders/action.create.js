module.exports = function(req, res) {

    if(typeof req.body == 'undefined' || Object.keys(req.body).length == 0) {
        return res.status(400).json({
            success: false,
            data: {message: "Invalid input"}
        });
    }

    Repository.create({
        date: req.body.date || new Date(),
        products: req.body.products || [],
        delivery: req.body.delivery,
        payment: req.body.payment || "",
        client: req.body.client
    }).then(function (orderCreated) {
        res.json({
            success: true,
            data: orderCreated
        });
    }).catch(function (error) {
        res.status(400).json({
            success: false,
            data: error
        });
    })

};