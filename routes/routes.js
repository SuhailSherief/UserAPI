const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModel')

router.post('/signup', (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        gender:request.body.gender,
        name: {
        title:request.body.title,
        first:request.body.first,
        last:request.body.last,
        },
        location: {
        city:request.body.city,
        state:request.body.state,
        country:request.body.country,
        postcode:request.body.postcode,
        },
        email:request.body.email,
        login: {
        username:request.body.username,
        password:request.body.password,
        },
        dob: {
            date:request.body.date,
            age:request.body.age,
        },
        phone:request.body.phone,
        picture:request.body.picture,

    })
    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    } )
})

module.exports = router