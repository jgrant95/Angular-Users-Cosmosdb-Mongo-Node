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

module.exports = {
    getUsers
}