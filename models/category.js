
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CategorySchema   = new Schema({
    Name: String,
    description: String,
    products : [{ type: Schema.ObjectId, ref: 'Product' }]
});

  module.exports = mongoose.model('Category', CategorySchema);
