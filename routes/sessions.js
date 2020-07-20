const express = require('express')
const SessionsController = require('../controllers/SessionsController')

const router = express.Router()

router.route('/')
    .post(
        SessionsController.authenticate,
        SessionsController.generateToken,
        SessionsController.sendToken)

module.exports = router