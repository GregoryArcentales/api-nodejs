const express = require('express')
const router = express.Router()
const FavoritesController = require('../controllers/FavoritesController')
const authtenticateOwner = require('../middlewares/authtenticateOwner')
const expressJwt = require('express-jwt')
const secrets = require('../config/secrets')

router.route('/')
    .get(expressJwt({secret:secrets.jwtSecret}), FavoritesController.index)
    .post(FavoritesController.create)

router.route('/:id')
    .delete(FavoritesController.find, authtenticateOwner, FavoritesController.destroy)

module.exports = router