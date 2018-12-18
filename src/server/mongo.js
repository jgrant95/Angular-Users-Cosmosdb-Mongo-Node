const mongoose = require('mongoose')

mongoose.PromiseProvider = global.PromiseProvider

const env = require('./env/environment')

const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`

const mongo = {
    uri: mongoUri,
    opt: {
        // dbName: env.dbName,
        // useNewUrlParser: true
    }
  };
  


function connect() {
    return mongoose.connect(mongo.uri, mongo.opt).then(
        () => {
            console.log('database connection successful')
            return mongoose.connection
        },
        (err) => {
            console.log('database connection failed', err)
        }
    )
}

module.exports = {
    connect
}