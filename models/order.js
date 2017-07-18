
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    date: Date,
    delivery: {
        type: String,
        required: true
    },
    payment:  { type: Number, min: 100, max: 1000, required: false },
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    client:  {type: Schema.Types.ObjectId, ref: 'Client'}
});

module.exports = mongoose.model('Order', OrderSchema);
