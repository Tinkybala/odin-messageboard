var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

//GET signup form
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Sign Up' });
  });

//POST submit form
router.post('/', [

    body("username")
        .trim()
        .custom(async (value) => {
            const exist = await User.findOne({username: value});
            if(exist) {
                return Promise.reject();
            }
        })
        .withMessage("Username already exists. Try another one."),

    body("password")
        .isLength({ min: 7 })
        .withMessage("Password must be at least 7 characters long")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/)
        .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character")
        .custom((password, {req}) => {
            const match = password === req.body.password2;
            return match;
        })
        .withMessage("Passwords do not match"),


    body("first_name")
        .trim(),

    body("last_name")
        .trim(),
    
    asyncHandler(async function(req, res, next) {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            console.log(errors)
            res.render("signup", {
                title: "Sign Up",
                errors: errors.array()
            })
        } else {
            await bcrypt.hash(req.body.password, 10, async (e, hashedPassword) => {
                //create User document based on form parameters
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name
                });
    
                //add user to database
                await user.save();
                res.redirect("/")
            })
        }
    })
])


module.exports = router;