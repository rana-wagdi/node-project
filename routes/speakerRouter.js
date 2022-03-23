// const { request, response } = require("express");
const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
 isAut = require('../Middleware/authMW')
const speakerController = require("../controllers/speakerController")


router.route('/speaker/:id?')



    .get(isAut,speakerController.getAllSpeakers)
    .post([
        body("name").isAlpha().withMessage("insert FullName"),
      
        body("password").isLength({ min: 5 }),
        body("email").isEmail().withMessage("insert right email"),
        body("image").isString().withMessage("insertImage"),
        body("role").isAlpha().withMessage("isern role"),
        body("address").isString().withMessage("insertAddress")
    ],speakerController.createSpraker)

    .put([
        body("email").isInt().withMessage("insert_Email")              //edite
    ],isAut,speakerController.updateSpeakers)

    .delete([
        body("email").isInt().withMessage("insert_Email")              //edite
    ],isAut,speakerController.deleteSpeakers);

////
module.exports = router;