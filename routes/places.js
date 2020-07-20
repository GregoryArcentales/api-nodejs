const PlacesController = require("../controllers/PlacesController");
const express = require("express");
const authtenticateOwner = require("../middlewares/authtenticateOwner");

const router = express.Router();

router
  .route("/")
  .get(PlacesController.index)
  .post(
    PlacesController.multerMiddleware(), 
    PlacesController.create,
    PlacesController.saveImage
    );

router
  .route("/:id")
  .get(PlacesController.find, PlacesController.show)
  .put(PlacesController.find, authtenticateOwner, PlacesController.update)
  .delete(PlacesController.find, authtenticateOwner, PlacesController.destroy);

module.exports = router;
