const express = require('express')
const router = express.Router()

const VisitsController = require('../controllers/VisitsController')
const authtenticateOwner = require('../middlewares/authtenticateOwner')

const expressJwt = require('express-jwt')
const secrets = require('../config/secrets')

router.route('/')
    .get(expressJwt({secret:secrets.jwtSecret}), VisitsController.index)
    .post(VisitsController.create)

router.route('/:visit_id')
    .delete(VisitsController.find, authtenticateOwner, VisitsController.destroy)

module.exports = router