const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('register user', () => {

  test('successful registration responds with newly created user', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'superman',
      password: 'super'
    })
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ id: 1,
    username: 'superman' })
  })

  test('responds with correct body if missing username or password', async () => {
    let res = await request(server).post('/api/auth/register')
    .send({ username: 'foo' })
    .expect(res.status).toBe(422)
    .expect(res.body.message).toMatch(/username and password required/i)
    res = await request(server).post('/api/auth/register')
    .send({ password: 'foo' })
    .expect(res.status).toBe(422)
    .expect(res.body.message).toMatch(/username and password required/i)
  })

  test.todo('responds with correct body if username taken')

})

describe('login user', () => {

  test.todo('successful registration contains token in body')

  test.todo('responds with correct body if missing username or password')

  test.todo('responds with correct body if UN/PW is incorrect')

})
