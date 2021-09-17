const User = require('../users/users-model')

function checkForUnAndPw(req, res, next) {
    if (!req.body.username || !req.body.password) {
        next({ status: 422, message: 'username and password required' })
    } else {
        next()
    }
}

async function checkUsernameAvail(req, res, next) {
    try {
        const users = await User.findBy({ username: req.body.username })
        if (!users.length) {
            next()
        }
        else {
            next({ status: 422, message: 'username taken' })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkForUnAndPw,
    checkUsernameAvail
}