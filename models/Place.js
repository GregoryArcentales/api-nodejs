const mongoose = require('mongoose')
const mongoosePaginateV2 = require('mongoose-paginate-v2')
const slugify = require('slugify')
const Uploader = require('./Uploader')
const Visit = require('./Visit')

const placeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type:String,
        unique:true 
    },
    address:String,
    description: String,
    acceptsCreditCard:{
        type: Boolean,
        default: false
    },
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number,
    _user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

placeSchema.plugin(mongoosePaginateV2)

placeSchema.virtual('visits').get( function(){
    return Visit.find({_place: this._id}).sort('-id')
})

placeSchema.methods.updateImage = function(path, imageType) {
    return Uploader(path)
    .then(secure_url => this.saveImageUrl(secure_url, imageType))
}

placeSchema.methods.saveImageUrl = function(secure_url, imageType){
    this[imageType+'Image'] = secure_url
    return this.save()
}
/**
 * 
 * AUTO GENERADOR DE SLUGS EN ULRS 
 **/
placeSchema.pre('save', function(next){
    if(this.slug) return next()
    isGenerateSlug.call(this, 0, next)
})
function isGenerateSlug(count, next){
    this.slug = slugify(this.title)
    if (count != 0){
        this.slug = this.slug + "-" + count
        //console.log(this.slug);
    }
    isExistsSlug(this.slug).then( isExists => {
        if (isExists) 
            return isGenerateSlug.call(this, count+1, next)
        next()
    })
}
function isExistsSlug(slug) {
    return Place.countDocuments({slug: slug}).then( slugCount => {
        if (slugCount == 0)
            return false
        return true
    })
}

let Place = mongoose.model('Place',placeSchema)

module.exports = Place;