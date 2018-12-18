const User = require('./user.model')

require('./mongo').connect()

function getUsers(req, res) {
    const docQuery = User.find({})
    docQuery
        .exec()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

function postUser(req, res) {
    const originalUser = { 
        _id: req.body._id,
        amazonUserId: req.body.amazonUserId, 
        busStopId: req.body.busStopId
    }

    const user = new User(originalUser)

    user.save(err => {
        if(checkServerError(res, err)) return; 
        res.status(201).json(user)
        console.log('user created successfully')
    })
} 

function checkServerError(res, err) {
    if (err) {
        res.status(500).send(err)
        return err;
    }
}

module.exports = {
    getUsers,
    postUser
}