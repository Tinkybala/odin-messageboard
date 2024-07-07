var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.render('create', {title: "Create New Post"});
});

router.post('/', [
    body("message")
        .isLength({min: 1})
        .withMessage("Cannot send empty message")
        .isLength({max: 300})
        .withMessage("Exceeded maximum character count of 300 characters"),

    body("title")
        .isLength({min: 1})
        .withMessage("Title required")
        .isLength({max: 50})
        .withMessage("Exceeded maximum title character count of 50 characters"),

    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            console.log(errors)
            res.render("create", {
                title: "Create New Post",
                errors: errors.array()
            })
        }
        const message = new Message({
            content: req.body.message,
            user: req.user.username,
            date: new Date(),
            title: req.body.title
        })
        await message.save();
        res.redirect('/');
    })
]);
module.exports = router;