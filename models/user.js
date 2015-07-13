// User model
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
//var async = require('async');

// User schema
var userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    },
    email: {
        type: String
    },
    type: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', userSchema);

// Fetch user by id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

// Fetch user by username
module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

// Save student
module.exports.saveStudent = function(newUser, newStudent, callback) {
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err
        // Set hash
        newUser.password = hash;
        console.log('New student is being saved');
        // Update User and Student collection at the same time
        async.parallel([
            newUser.save,
            newStudent.save
        ], callback);
    });
}

// Save instructor
module.exports.saveInstructor = function(newUser, newInstructor, callback) {
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err
        // Set hash
        newUser.password = hash;
        console.log('New instructor is being saved');
        // Update User and Student collection at the same time
        async.parallel([
            newUser.save,
            newInstructor.save
        ], callback);
    });
}