const { validationResult, body } = require("express-validator");
const students = require('../Models/StudentSchemma');
const jwt = require("jsonwebtoken")
require("dotenv").config();

const getAlldstudent = (request, response, next) => {
    if (request.role == "admin" || request.role == "students") {

        if (request.role == "students") {
            students.findOne({ email: request.email })
                .then(data => {

                    response.status(200).json(data)
                })
                .catch(error => {
                    next(error)
                })

        } else {
            students.find({})
                .then(data => {
                    response.status(200).json(data)
                })

                .catch(error => {
                    next(error)
                })

        }
    } else {
        throw new Error("Not Allowed")


    }

}




const createStudent = (request, response, next) => {
    if (request.body.role == "students") {
        let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;

            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")

            throw error;

        }
        let object = new students({

            _id: request.body._id,
            fullName: request.body.fullName,
            email: request.body.email,
            password: request.body.password,
            role: request.body.role

        })

        object.save()
            .then(data => {
                let token = jwt.sign({
                    email: request.body.email,
                    role: request.body.role

                }, process.env.SECRET_KEY, { expiresIn: "1h" })

                response.status(201).json({ message: "Success", data, token })
            })
            .catch(error => next(error))


    } else {
        response.status(200).json({ massage: "insert right Data" })
    }
}

const updateStudents = (request, response) => {
    if (request.role == "students") {
        students.findByIdAndUpdate({ email: request.body.email }, {
            $set: {
                fullName: request.body.fullName,
                password: request.body.password,
            }
        })
            .then(data => {
                response.status(200).json({ massage: "update", data })
            })
            .catch(error => next(error))
    } else {
        throw new Error("Not Allowed")
    }


}

const deletestudents = (request, response) => {
    if (request.role == "students") {

        speakers.findOneAndDelete({ email: request.body.email })
            .then(data => {
                if (data == null) throw new Error("student Is not Found!")
                response.status(200).json({ message: "deleted" })

            })
            .catch(error => next(error))
    } else {

        throw new Error("not Allowed")
    }

}

module.exports = {

    getAlldstudent,
    updateStudents,
    createStudent,
    deletestudents,

}