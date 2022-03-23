const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
isAuth = require('../Middleware/authMW')

const eventController = require("../controllers/eventController")


router.route('/event/:id?')

    .get(isAuth,eventController.getAllEvents)
    .post([
        body("id").isInt().withMessage("insert ID"),
        body("title").isAlpha().withMessage("Titleshould be string"),
        body("eventDate").isDate().withMessage("Insert Date"),
        body("main_speaker").isInt().withMessage("insert Main_Speaker "),
        body("speakers").isArray().withMessage("insert_speakers"),
        body("students").isArray().withMessage("Insert Student")
    ],isAuth,eventController.createEvent)

    .put([
        body("id").isInt().withMessage("insert ID")],isAuth,(eventController.updateEvent))

    .delete([
        body("id").isInt().withMessage("insert ID")],isAuth,(eventController.deleteEvent));


module.exports = router;