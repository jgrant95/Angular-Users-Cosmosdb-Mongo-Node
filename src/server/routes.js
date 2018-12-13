const express = require('express')
const router = express.Router()

router.get('/heroes', (req, res) => {
    res.send(200, [
        { "id": 10, "name": "Jon"}
    ])
})

module.exports = router