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

router.post('/search', async (request, response) => {
    let type = request.body.type.trim();
    let search = request.body.payload.trim();
    //console.log(type, search)
    if(type == "name")
    {
        let name = await signUpTemplateCopy.find({"name.first": search}).exec();
        response.send({search: name})
    }
    if(type == "email")
    {
        let email = await signUpTemplateCopy.find({email: search}).exec();
        response.send({search: email})
    }
    if(type == "phone")
    {
        let phone = await signUpTemplateCopy.find({phone: search}).exec();
        response.send({search: phone})
    }
    if(type == "gender")
    {
        let gender = await signUpTemplateCopy.find({gender: search}).exec();
        response.send({search: gender})
    }
    if(type == "location")
    {
        let postcode = await signUpTemplateCopy.find({"location.postcode": search}).exec();
        response.send({search: postcode})
    }
    if(type == "address")
    {
        let city = await signUpTemplateCopy.find({"location.city": search}).exec();
        response.send({search: city})
    }
    if(type == "dob")
    {
        let date = await signUpTemplateCopy.find({"dob.date": search}).exec();
        response.send({search: date})
    }
})

// router.put('/update', (request, response) => {

// })

module.exports = router