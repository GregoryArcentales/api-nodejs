const expressUnless = require('express-unless')
const Application = require('../models/Application')

 module.exports = function(options) {
    let authApp = function(req,res,next) {
        Application.countDocuments({}).then( appCount => {
            if(appCount > 0 && !req.application) return next( new Error('An application is required to consume this API'))
   
            //req.validApp = true
            if(!validRequest) return next(new Error('Origin Invalid'))
            next()
        }).catch(next)
    }

    authApp.unless = expressUnless

    return authApp

 }
 
 