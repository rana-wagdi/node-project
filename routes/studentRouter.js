
const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
isAuth = require('../Middleware/authMW')

const studentController = require("../controllers/studentController")


router.route('/student/:id?')

    .get(isAuth, studentController.getAlldstudent)
    .post([
        body("id").isInt().withMessage("insertid"),
        body("fullName").isAlpha().withMessage("insert FullName"),
        body("password").isLength({ min: 5 }),
        body("email").isEmail().withMessage("insert right email"),
        body("role").isAlpha().withMessage("isern role"),

    ], isAuth, studentController.createStudent)

    .put([body("id").isInt().withMessage("insertId"),

    ], isAuth, studentController.updateStudents)

    .delete([body("id").isInt().withMessage("insertId"),

    ], isAuth, studentController.deletestudents);


module.exports = router;