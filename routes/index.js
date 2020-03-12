var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: process.env.Main_Content,loggedin:req.session.loggedin });
});

module.exports = router;
