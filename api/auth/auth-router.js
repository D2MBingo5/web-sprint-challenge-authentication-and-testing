const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')
const {
  checkForUnAndPw,
  checkUsernameAvail,
  checkUsernameExists
} = require('../middleware/auth-middleware')

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

router.post('/register',
checkForUnAndPw, 
checkUsernameAvail,
(req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)

  User.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(next)
});

router.post('/login', 
checkForUnAndPw, 
checkUsernameExists, 
(req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password))
  {
    const token = buildToken(req.user)
    res.json({
      message: `welcome, ${req.user.username}`,
      token,
    })
  } else {
    next({ status: 422, message: 'invalid credentials' })
  }
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    password: user.password,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
