var express = require('express');
var router = express.Router();
// Require controller modules.
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login' });
});


router.get('/register', function(req, res, next) {
  res.render('user/register', { title: 'Registration' });
});

router.post('/register', user_controller.register);

module.exports = router;