var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// Include User model
var User = require('../models/user');

// Include Student model
var Student = require('../models/student');

// Include Instructor model
var Instructor = require('../models/instructor');

router.get('/signup', function(req, res, next) {
    res.render('users/signup');
});

router.post('/signup', function(req, res, next) {
    // Get form values
    var first_name      = req.body.first_name;
    var last_name       = req.body.last_name;
    var street_address  = req.body.street_address;
    var city            = req.body.city;
    var state           = req.body.state;
    var zip             = req.body.zip;
    var email           = req.body.email;
    var username        = req.body.username;
    var password        = req.body.password;
    var password2       = req.body.password2;
    var type            = req.body.type;
    
    // Form field validation
    req.checkBody('first_name', 'First name field is required').notEmpty();
    req.checkBody('last_name', 'Last name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();
    
    if(errors){
        res.render('users/signup', {
            errors: errors,
            first_name: first_name,
            last_name: last_name,
            street_address: street_address,
            city: city,
            state: state,
            zip: zip,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {
        var newUser = new User({
            email: email,
            username: username,
            password: password,
            type: type
        });
        
        var newStudent = new Student({
            first_name: first_name,
            last_name: last_name,
            address: [{
                street_address: street_address,
                city: city,
                state: state,
                zip: zip
            }],
            email: email,
            username: username
        });
        console.log('ready to save');
        if (type == 'student') {
            User.saveStudent(newUser, newStudent, function(err, user){
                console.log('Student created');                
            });
        } else { // instructor
            User.saveInstructor(newUser, newInstructor, function(err, user){
                console.log('Instructor created');                
            });
        }
        
        req.flash('success', 'User added');
        res.redirect('/');
    }
});

module.exports = router;
