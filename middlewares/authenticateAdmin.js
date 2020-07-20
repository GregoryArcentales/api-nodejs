const User = require('../models/User')

module.exports = function(req,res,next){
    if(req.fullUser && req.fullUser.admin )return next()

    next( new Error('you have not permissions to be here'))
}