const mongoose = require('mongoose')
const cryptoRandomString = require('crypto-random-string')

function assingUniqueRandomValue(app, field, next){
    const randomString = cryptoRandomString({length:20})

    searchCriteria = {}
    searchCriteria[field] = randomString
    Application.countDocuments(searchCriteria).then( doc => {
        if (doc > 0) 
            return assingUniqueRandomValue(app,field,next)
        app[field] = randomString
        next()
    })
}

let applicationSchema = new mongoose.Schema({
    applicationId: {
        type:String,
        required: true,
        unique: true
    },
    secret: {
        type:String,
        required: true,
        unique: true
    },
    origins: String,
    name: String
})

applicationSchema.pre('validate', function(next){
    assingUniqueRandomValue(this, 'applicationId', () => {
        assingUniqueRandomValue(this, 'secret', next)
    })
})

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application;