const Auth = require('./auth/auth-router')

test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('register user', () => {
  test('successful registration responds with newly created user', () =>{

  })
  test.todo('responds with correct body if missing username or password')
  test.todo('responds with correct body if username taken')
})

describe('login user', () => {
  test.todo('successful registration contains token in body')
  test.todo('responds with correct body if missing username or password')
  test.todo('responds with correct body if UN/PW is incorrect')
})
