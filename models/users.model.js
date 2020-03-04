const mongoose = require('mongoose');

var userregisterSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'This field is required.'
    },
    lastname: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
    password: {
        type: String
    },
});

mongoose.model('Users', userregisterSchema);