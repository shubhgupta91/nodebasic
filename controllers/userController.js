var User = require('../models/users.model');
mongoose = require('mongoose'), //mongo connection

// Handle book create on POST.
exports.register = function(req, res) {
  var email = req.body.email;
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var mobile = req.body.mobile;
  var city = req.body.city;
  var password = req.body.psw;

  //call the create function for our database
  mongoose.model('Userregister').create({
    firstname : firstname,
    lastname : lastname,
    email : email,
    mobile : mobile,
    city : city,
    password : password
  }, function (err, user) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      //User has been created
      console.log('POST creating new user: ' + user);
      res.format({
          //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
        html: function(){
          // If it worked, set the header so the address bar doesn't still say /adduser
          res.location("user/listing");
          // And forward to success page
          res.redirect("/user/listing");
        },
        //JSON response will show the newly created blob
        json: function(){
          res.json(user);
        }
      });
    }
  });
  
};