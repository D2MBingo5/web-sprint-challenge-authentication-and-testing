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

async function checkUsernameExists(req, res, next) {
    try {
        const [user] = await User.findBy({ username: req.body.username })
        if (!user) {
            next({ 
                status: 422, 
                message: 'invalid credentials' 
            })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkForUnAndPw,
    checkUsernameAvail,
    checkUsernameExists
}