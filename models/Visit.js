const mongoose = require('mongoose')
const mongoosePaginateV2 = require('mongoose-paginate-v2')

const REACTIONS = ['like','love','disppointment','yummy','anger','disgust']

let visitSchema = new mongoose.Schema({
    _user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    reaction:{
        type:String,
        enum:REACTIONS
    },
    observation:String
})

mongoose.plugin(mongoosePaginateV2)

const Visit = mongoose.model('Visit', visitSchema)

visitSchema.statics.forUser = function(userId, page){
    return Visit.paginate({_user: userId}, {page:page, limit:5, sort:{_id:-1}})
}

module.exports = Visit;