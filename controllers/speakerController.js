
const { validationResult } = require("express-validator");
const speakers = require('../Models/SpeakerSchema');
const jwt = require("jsonwebtoken")
require("dotenv").config();

const getAllSpeakers = (request, response, next) => {
    if (request.role == "admin" || request.role == "speakers") {
        if (request.role == "speakers") {
            speakers.findOne({ email: request.email })
                .then(data => {

                    response.status(200).json(data)
                })
                .catch(error => {
                    next(error)
                })



        } else {
            speakers.find({})
                .then(data => {
                    response.status(200).json(data)
                })

                .catch(error => {
                    next(error)
                })

        }

    }
}



const createSpraker = (request, response, next) => {

    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;

        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")

        throw error;

    }

    let object = new speakers({

        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        image: request.body.image,
        address: request.body.address,
        role: request.body.role

    })

    // request.body.forEach((obj) => {
    //     console.log("param: ", obj.role);
    //   });
    object.save()
        .then(data => {
            let token = jwt.sign({
                email: request.body.email,
                role: request.body.role

            }, process.env.SECRET_KEY, { expiresIn: "1h" })

            response.status(201).json({ message: "Success", data, token })
        })
        .catch(error => next(error))
}




const updateSpeakers = (request, response) => {
    if (request.body.role == "speakers" && request.email == request.body.email) {
        speakers.findByIdAndUpdate({ email: request.body.email }, {
            $set: {
                fullName: request.body.fullName,
                password: request.body.password,
                address: request.body.address
            }
        })

            .then(data => {


                response.status(200).json({ massage: "update", data })
            })
            .catch(error => next(error))
    } else {
        throw new Error("Speakers Is not Found")
    }


}



const deleteSpeakers = (request, response) => {
    if (request.body.role == "speakers" || request.body.role == "admin") {

        speakers.findOneAndDelete({ email: request.body.email })
            .then(data => {
                if (data == null) throw new Error("speaker Is not Found!")
                response.status(200).json({ message: "deleted" })

            })
            .catch(error => next(error))
    } else {

        throw new Error("Speakers Is not Found")
    }

}


module.exports = {

    getAllSpeakers,
    updateSpeakers,
    createSpraker,
    deleteSpeakers,

}