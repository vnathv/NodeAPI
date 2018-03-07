const Mongoose = require("mongoose")

const UserSchema = Mongoose.Schema({

    Name: String,
    Email: String,
    Password: String

});

Mongoose.model('User',UserSchema);

module.exports = Mongoose.model('User');