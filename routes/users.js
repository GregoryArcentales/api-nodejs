const express = require('express')
const UsersController = require('../controllers/UsersController')
const SessionsController = require('../controllers/SessionsController')
const expressJwt = require('express-jwt')
const secrets = require('../config/secrets')

const router = express.Router()

router.route('/')
    .post(
        UsersController.create,
        SessionsController.generateToken,
        SessionsController.sendToken)

router.route('/places')
    .get(expressJwt({secret:secrets.jwtSecret}), UsersController.myPlaces)

module.exports = router