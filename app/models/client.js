
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClientSchema   = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

module.exports = mongoose.model('Client', ClientSchema);


