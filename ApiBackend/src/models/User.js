const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

// User Schema 
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    text :{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
    },
    job :{
        type: String
    }
});

UserSchema.plugin(uniqueValidator);

const Userregister = module.exports = mongoose.model('Userregister', UserSchema);

// Find the user by ID
module.exports.getUserById = function (id, callback) {
    Userregister.findById(id, callback);
}

// Find the user by Its username
module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    }
    Userregister.findOne(query, callback);
}
  
// to Register the user
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// Compare Password
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}