const mongoose = require('mongoose')

mongoose.PromiseProvider = global.PromiseProvider

const env = require('./env/environment')

const mongoUri = `mongodb://${env.dbName};${eng.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`

function connect() {
    return mongoose.connect(mongoUri, { useMongoClient: true })
}

module.exports = {
    connect
}