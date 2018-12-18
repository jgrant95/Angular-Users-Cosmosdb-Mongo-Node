const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    _id: { type: Number, required: true, unique: true },
    amazonUserId: String,
    busStopId: String
})

const User = mongoose.model('User', userSchema)

module.exports = User