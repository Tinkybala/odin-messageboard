var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

router.get('/', (req, res, next) => {
    res.render('account', {title: "Account Details", user: req.user});
});

//submit VIP form
router.post('/', asyncHandler(async (req, res, next) => {
    if(req.body.vip === process.env.MEMBER_PW) {
        const userID = req.user._id;
        await User.findByIdAndUpdate(userID, {status: "VIP"});
        res.redirect('/account');
    }
    res.redirect('/account');
}));


module.exports = router;