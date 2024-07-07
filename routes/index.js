var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const Message = require('../models/message');



/* GET home page. */
router.get('/', asyncHandler( async function(req, res, next) {
  const messages = await Message.find().sort({date: 1});
  console.log(messages);
  res.render('index', { title: 'Messageboard', user: req.user, messages: messages });
}));

//POST Log In request
router.post('/', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
}));

//GET Log Out request
router.get('/log-out', (req, res, next) => {
  req.logout((e) => {
    if(e) return next(e);

    res.redirect('/');
  })
});

//delete button
router.post('/delete/:id', asyncHandler( async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id)
  res.redirect('/');
}))




module.exports = router;
