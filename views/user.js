const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Register User
exports.register = function(req, res) {
    let { firstName, lastName, email, password } = req.body;

    // Validation
    let errors = [];

    if(!firstName || !lastName || !email || !password) {
        errors.push({ message: 'All fields are required.' })
    }

    if(email && !validateEmail(email)) {
        errors.push({ message: 'Email is not valid.' })
    }

    if(password && password.length < 8) {
        errors.push({ message: 'Password should be of minimum 8 characters.' })
    }

    if(errors.length > 0) {
        console.log("Error registration: ", errors)
        res.send({
            errors,
            type: 'error'
        })
    } else {
        // Save user
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // User already exists with this email
                    errors.push({ message: 'Email already registered.' })
                    console.log("Email already registered")
                    res.send({
                        errors,
                        type: 'error'
                    })
                } else {
                    let user = new User({
                        firstName,
                        lastName,
                        email,
                        password
                    })

                    bcrypt.genSalt(10, (hash, salt) => 
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if(err) throw err;
                            
                            user.password = hash;

                            //save user to db
                            user.save()
                                .then(user => {
                                    res.send({
                                        errors: [],
                                        type: 'success',
                                        message: 'You are registered successfully.'
                                    })
                                })
                                .catch(err => console.log(err))
                        })
                    )
                }
            })
    }
}

// Login User
exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        let errors = [];
        if(err) {
            console.log("err loging in:", err)
            errors.push(err)
            res.send({
                errors,
                type: 'error'
            })
            next()
        }

        if(info) {
            console.log("info: ", info)
            errors.push(info)
            res.send({
                errors,
                type: 'error'
            })
            next()
        }

        if(user) {
            req.logIn(user, function(err) {
                if(err) {
                    console.log("err logging in:", err)
                    errors.push(err)
                    res.send({
                        errors,
                        type: 'error'
                    })
                    next()
                } else {
                    console.log("user: ", user)
                    res.send({
                        user: {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        },
                        errors: [],
                        type: 'success',
                        message: 'You are logged in successfully.'
                    })
                    next()
                }
            });
        }
    })(req, res,next)
}

// Get Current User Details
exports.getCurrentUser = function(req, res) {
    res.send({
        user: {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            createdAt: req.user.createdAt
        }
    })
}

// Logout User
exports.logout = function(req, res) {
    req.logOut();
    res.send({
        errors: [],
        type: 'success',
        message: 'You are logged out successfully.'
    })
}