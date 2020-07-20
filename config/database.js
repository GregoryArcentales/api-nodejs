const mongoose = require('mongoose')
const dbName = 'places_api'
module.exports = {
    connect: () => mongoose.connect(`mongodb://localhost/${dbName}`, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}),
    dbName,
    connection: () => {
        if (mongoose.connection) {
            return mongoose.connection
        }
        return this.connect()
    }
}