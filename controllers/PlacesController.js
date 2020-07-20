const Place = require("../models/Place");
const upload = require("../config/upload");
const helpers = require("./helpers");

const validParams = [
  "title",
  "description",
  "address",
  "openHour",
  "closeHour",
  "acceptsCreditCard",
];

function find(req, res, next) {
  Place.findOne({ slug: req.params.id })
    .then((place) => {
      req.place = place
      req.mainObj = place
      next();
    })
    .catch((err) => {
      next(err);
    });
}

function index(req, res) {
  //ver todos
  Place.paginate({}, { page: req.query.page || 1, limit: 8, sort: { _id: -1 } })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
}

function show(req, res) {
  //busqueda individual
  res.json(req.place);
}

function create(req, res, next) {
  /**crear un recurso */
  const params = helpers.builderParams(validParams, req.body)
  params['_user'] = req.user.id
  Place.create(params)
    .then((doc) => {
      req.place = doc;
      res.json(doc);
      next();
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
}

function update(req, res) {
  //actualizar recurso
  const params = helpers.builderParams(validParams, req.body)
  req.place = Object.assign(req.place, params);
  req.place
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
}

function destroy(req, res) {
  //eliminar recurso
  req.place
    .remove()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
}

function multerMiddleware() {
  return upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]);
}

function saveImage(req, res) {
  if (req.place) {
    const files = ["avatar", "cover"];
    const promises = [];

    files.forEach((imageType) => {
      if (req.files && req.files[imageType]) {
        const path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path, imageType));
      }
    });

    Promise.all(promises)
      .then((result) => {
        console.log(result);
        res.json(req.place);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } else {
    res.status(422).json({
      error: req.error || "Cloud no save place",
    });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  find,
  multerMiddleware,
  saveImage,
};
