const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uid: Number,
    username: String,
    password: String,
    email: String,
    role: String
});

var User = mongoose.model('User', userSchema);

module.exports = User