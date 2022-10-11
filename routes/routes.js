const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModel')

router.post('/signup', (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        gender: request.body.gender,
        name: {
            title: request.body.title,
            first: request.body.first,
            last: request.body.last,
        },
        location: {
            city: request.body.city,
            state: request.body.state,
            country: request.body.country,
            postcode: request.body.postcode,
        },
        email: request.body.email,
        login: {
            username: request.body.username,
            password: request.body.password,
        },
        dob: {
            date: request.body.date,
            age: request.body.age,
        },
        phone: request.body.phone,
        picture: request.body.picture,

    })
    signedUpUser.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

router.post('/search', async (request, response) => {
    let type = request.body.type.trim();
    let search = request.body.payload.trim();
    if (type == "name") {
        let users = await signUpTemplateCopy.find({ "name.first": {$regex: new RegExp('^'+search+'.*', 'i')} }).exec();
        response.send({ result: users })
    }
    if (type == "email") {
        let users = await signUpTemplateCopy.find({ email: {$regex: new RegExp('^'+search+'.*', 'i')} }).exec();
        response.send({ result: users })
    }
    if (type == "phone") {
        let users = await signUpTemplateCopy.find({ phone: {$regex: new RegExp('^'+search+'.*', 'i')} }).exec();
        response.send({ result: users })
    }
    if (type == "gender") {
        let users = await signUpTemplateCopy.find({ gender: {$regex: new RegExp('^'+search+'.*', 'i')} }).exec();
        response.send({ result: users })
    }
    if (type == "location") {
        let users = await signUpTemplateCopy.find({ "location.postcode": {$regex: new RegExp('^'+search+'.*', 'i')} }).exec();
        response.send({ result: users })
    }
    if (type == "address") {
        let users = await signUpTemplateCopy.find({ "location.city": {$regex: new RegExp('^'+search+'.*', 'i')} }).exec();
        response.send({ result: users })
    }
    if (type == "dob") {
        let users = await signUpTemplateCopy.find({ "dob.date": {$regex: new RegExp('^'+search+'.*', 'i')} }).exec();
        response.send({ result: users })
    }
})

router.patch('/update/:id', async (request, response) => {
    let id = request.params.id;
    let updatedData = request.body;
    signUpTemplateCopy.findByIdAndUpdate(id, { $set: updatedData }).exec();
    response.send({ status: "Success" })
})

router.delete('/delete/:id', async (request, response) => {
    const user = await signUpTemplateCopy.findById(request.params.id);
    await user.remove();
    response.send({ status: "Success" })
})
module.exports = router