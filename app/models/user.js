    // load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var userArray = new Array();

// define the schema for our user model
var userSchema = mongoose.Schema({

    // local            : {
    //     email        : String,
    //     password     : String
    // },
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // },
    firstName: String,
    lastName: String,
    userid: String,
    username: String,
    address :String,
    country :String,
    zip:     String,
    email:  String,
    msex :String,
    fsex:String


});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
