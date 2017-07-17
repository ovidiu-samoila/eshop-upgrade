
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


var ClientSchema   = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],


    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        username        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

ClientSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


ClientSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);

};


module.exports = mongoose.model('Client', ClientSchema);


