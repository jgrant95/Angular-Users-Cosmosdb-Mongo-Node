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

function putUser(req, res) {
    const id = parseInt(req.params.id, 10)
    const updatedUser = { 
        _id: req.body._id,
        amazonUserId: req.body.amazonUserId, 
        busStopId: req.body.busStopId
    }
    console.log('id', id)
    console.log('updateduser', updatedUser)

    User.findOne({_id: id}, (err, user) => {
        console.log('found1', user)
        if(checkServerError(res, err)) return
        if(!checkFound(res, user)) return

        user.amazonUserId = updatedUser.amazonUserId
        user.busStopId = updatedUser.busStopId
        user.save(err => {
            if(checkServerError(res, err)) return
            res.status(200).json(user)
            console.log('user updated successfully')
        })
    })
} 

function deleteUser(req, res) {
    const id = parseInt(req.params.id, 10)

    User.findOneAndRemove({id: id})
        .then(user => {
            if (!checkFound(res, user)) return
            res.status(200).json(user)
            console.log('user deleted successfully')
        })
        .catch(err => {
            if (checkServerError(res, err)) return
        })
}

function checkServerError(res, err) {
    if (err) {
        res.status(500).send(err)
        return err;
    }
}

function checkFound(res, user) {
    if (!user) {
        res.status(404).send('User not found')
        return
    }

    return user
}

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}