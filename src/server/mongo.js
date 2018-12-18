const mongoose = require('mongoose')

mongoose.PromiseProvider = global.PromiseProvider

const env = require('./env/environment')

const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`

function connect() {
    return mongoose.connect(mongoUri, { useNewUrlParser: true }, function(err, database) {
        if(err) return console.error(err);
      
        db = database;
    })
}

module.exports = {
    connect
}