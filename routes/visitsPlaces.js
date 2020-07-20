const express = require('express')
const router = express.Router()

const VisitsController = require('../controllers/VisitsController')
const PlacesController = require('../controllers/PlacesController')
const authtenticateOwner = require('../middlewares/authtenticateOwner')

router.route('/:id/visits')
    .get(PlacesController.find, VisitsController.index)

router.route('/:id/visits/:visit_id')
    .delete(PlacesController.find, VisitsController.find, authtenticateOwner, VisitsController.destroy)

module.exports = router