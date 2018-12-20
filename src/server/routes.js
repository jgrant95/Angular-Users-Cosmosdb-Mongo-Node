const express = require('express')
const router = express.Router()

const userService = require('./user.service')

router.get('/users', (req, res) => {
    userService.getUsers(req, res)
    // res.send(200, [
    //     { "id": 10, "amazonUserId": "12345", "busStopId": "001" },
    //     { "id": 20, "amazonUserId": "22345", "busStopId": "102" },
    //     { "id": 30, "amazonUserId": "32345", "busStopId": "203" }
    // ])
})

router.post('/user', (req, res) => {
    userService.postUser(req, res)
})

router.put('/user/:id', (req, res) => {
    userService.putUser(req, res)
})

router.delete('/user/:id', (req, res) => {
    userService.deleteUser(req, res)
})

module.exports = router