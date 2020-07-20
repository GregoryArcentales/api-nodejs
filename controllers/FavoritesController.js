const FavoritePlace = require('../models/FavoritePlace')
const builderParams = require('./helpers').builderParams
const User = require('../models/User')

const validParams = ['_place']

function find(req,res,next) {
    FavoritePlace.findById(req.params.id).then( fav => {
        req.mainObj = fav
        req.favorite = fav
        next()
    }).catch(next)
}

function index(req,res) {
    User.findOne({_id:req.user.id}).then( user => {
        user.favorites.then( favorites => {
            res.json(favorites)
        })
    }).catch( err => {
        console.log(err);
        res.json(err)
    })
}

function create(req,res) {
    let params = builderParams(validParams, req.body)
    params['_user'] = req.user.id
    FavoritePlace.create(params)
        .then( fav => {
            res.json(fav)
        }).catch( error => {
            res.status(422).json({error})
        })
}

function destroy(req,res) {
    req.favorite.remove().then( doc => {
        res.json({})
    }).catch( error => {
        res.status(500).json({error})
    })
}

module.exports = {
    find,
    index,
    create,
    destroy
}