const express = require('express')
const router = express.Router()

const applicationsController = require('../controllers/ApplicationsController')
const authenticateAdmin = require('../middlewares/authenticateAdmin')
const findUser = require('../middlewares/findUser')

const expressJwt = require('express-jwt')
const secrets = require('../config/secrets')

router.all('*', expressJwt({secret:secrets.jwtSecret}), findUser, authenticateAdmin)

router.route('/')
    .get(applicationsController.index)
    .post(applicationsController.create)

router.route('/:id')
    .delete(applicationsController.find, applicationsController.destroy)

module.exports = router