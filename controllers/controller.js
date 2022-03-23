
const createSpraker = require('./speakerController')
const createStudent = require('./studentController')
const user = require('../Models/SpeakerSchema')
const students = require('../Models/StudentSchemma')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const createAccount = (request, response, next) => {

    if (request.body.role == "speakers") {
        createSpraker.createSpraker()
    }
    if (request.body.role == "students") {
        createStudent.createStudent()
    }
    response.status(201).json({ data: "added", BODY: request.body })
    next()
}

const login = (request, response, next) => {
    let userEmail = request.body.email
    let userPassword = request.body.password
    let userRole = request.body.role
    if (userRole == "speakers" || userRole == "admin") {
        user.findOne({ email: userEmail })
            .then(data => {
                if (!data)
                    if (!data) next(new Error("username or password incorrect"));
                let matched = bcrypt.compare(userPassword, data.password)
                if (matched) {

                    let token = jwt.sign({
                        email: request.body.email,
                        role: request.body.role

                    }, process.env.SECRET_KEY, { expiresIn: "1h" })
                    response.status(201).json({ message: "Correct", data, token })
                } else {
                    next("password is wrong are you want to update it?")

                }

            }).catch(error => {

                next(error)
            })

    }

    else if (userRole == "students" || userRole == "admin") {

        students.findOne({ email: userEmail })
            .then(data => {
                if (!data)
                    if (!data) next(new Error("username or password incorrect"));
                let matched = bcrypt.compare(userPassword, data.password)
                if (matched) {

                    let token = jwt.sign({
                        Email: request.body.Email,
                        role: request.body.role

                    }, process.env.SECRET_KEY, { expiresIn: "1h" })
                    response.status(201).json({ message: "Correct", data, token })
                } else {
                    next("password is wrong are you want to update it?")

                }
            }).catch(error => {

                next(error)
            })

    } else {
        response.json({
            message: "not found"
        })
    }

}

module.exports = {
    login,
    createAccount
}