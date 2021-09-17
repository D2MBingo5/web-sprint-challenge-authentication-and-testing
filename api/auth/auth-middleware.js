function checkForUnAndPw(req, res, next) {
    if (!req.body.username || !req.body.password) {
        next({ status: 422, message: 'username and password required' })
    } else {
        next()
    }
}

module.exports = {
    checkForUnAndPw
}