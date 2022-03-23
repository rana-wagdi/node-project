const express = require('express')
const router = express.Router()
const { body, query, param } = require("express-validator")
const controller = require("../controllers/controller")
// var bcrypt   = require('bcrypt-nodejs'); 


router.post("/login", [
  body("email").isEmail().withMessage("should be email"),
  body('password').isLength({ min: 5 }),
  body('role').isIn(['speakers', 'students', 'admin'])
], (controller.login))



router.post('/register', [
  body("name").isAlpha().withMessage("insert string"),
  body("email").isEmail().withMessage("insert email"),
  body("image").isString().optional().withMessage("should be String"),
  body('password').isLength({ min: 5 }),
  body('role').isIn(['speakers', 'students']),
  body("address").isString().optional()
], controller.createAccount)


module.exports = router