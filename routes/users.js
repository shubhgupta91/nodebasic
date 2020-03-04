var express = require('express');
var router = express.Router();
// Require controller modules.
var user_controller = require('../controllers/userController');

// User listing
router.get('/listing', user_controller.userlisting);

// Login user
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login' });
});

// User registration
router.get('/register', function(req, res, next) {
  res.render('user/register', { title: 'Registration' });
});
router.post('/register', user_controller.register);


module.exports = router;