var userModel = require('../models/users.model');
mongoose = require('mongoose'), //mongo connection

// Create user in mongodb database
exports.authentication = function(req, res) {
  var email = req.body.email;
  var password = req.body.psw;
  console.log(email);

	if (email && password) {
    mongoose.model('Users').findOne({email: email}, function (err, results) {      
      if(err){
        console.log(err);
      } else {
        if (results) {
          req.session.loggedin = true;
          req.session.email = results.email;
          res.redirect('/');
        } else {
          res.send('Incorrect Username and/or Password!');
        }			
        res.end();        
      }      
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}



  /*
  mongoose.model('Users').create({
    firstname : firstname,
    lastname : lastname,
    email : email,
    mobile : mobile,
    city : city,
    password : password
  }, function (err, user) {
    if (err) {
      res.send("There was a problem adding user into the database.");
    } else {
      var username = 'User '+user.firstname+' '+user.lastname+' created successfully!';
      req.flash('success', username);
      res.redirect("/user/listing");
    }
  });  
  */
};



// Create user in mongodb database
exports.register = function(req, res) {
  var email = req.body.email;
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var mobile = req.body.mobile;
  var city = req.body.city;
  var password = req.body.psw;
  mongoose.model('Users').create({
    firstname : firstname,
    lastname : lastname,
    email : email,
    mobile : mobile,
    city : city,
    password : password
  }, function (err, user) {
    if (err) {
      res.send("There was a problem adding user into the database.");
    } else {
      var username = 'User '+user.firstname+' '+user.lastname+' created successfully!';
      req.flash('success', username);
      res.redirect("/user/listing");
    }
  });  
};

// Fetch users from mongodb database
exports.userlisting = function(req, res) {
  mongoose.model('Users').find({}, function (err, users) {
    if(err){
      return console.error(err);
    } else {
      res.format({ 
        html: function(){
          res.render('user/userlisting', {
            title: 'Users',
            "users" : users
          });
        },
        json: function(){
          res.json(users);
        }
      });
    }
  });
}; 