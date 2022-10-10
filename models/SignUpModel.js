const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    gender: String,
    name: {
        title: String,
        first: String,
        last: String,
    },
    location: {
        city: String,
        state: String,
        country: String,
        postcode: String,
    },
    email: String,
    login: {
        username: String,
        password: String,
    },
    dob: {
        date: String,
        age: Number,
    },
    phone: String,
    picture: String,
});

module.exports = mongoose.model('UserDetails', signUpTemplate)