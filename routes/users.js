var express = require('express');
var router = express.Router();
var userModel = require('../models/users.model');
// Require controller modules.
var user_controller = require('../controllers/userController');

// User listing
router.get('/user/listing', user_controller.userlisting);

// Login user
router.get('/user/login', function(req, res, next) {
  res.render('user/login', { title: 'Login' });
});

// User registration
router.get('/user/register', function(req, res, next) {
  res.render('user/register', { title: 'Registration' });
});
router.post('/user/register', user_controller.register);

// User registration
router.get('/profile/:id/edit', function(req, res, next) {
  var id = req.params.id;
  console.log(id);
  /*
  edit.exec(function(err,data){
    if(err) throw err;
    res.render('user/profile_update', { title: 'Update Account', records:data });
  });
  */
  res.render('user/profile_update', { title: 'Update Account' });
});

module.exports = router;