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

test('[0] sanity', () => {
  expect(true).not.toBe(false)
})

describe('register user', () => {

  test('[1] successful registration responds with newly created user', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'superman',
      password: 'super'
    })
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ id: 1,
    username: 'superman' })
  })

  test('[2] responds with correct body if missing username or password', async () => {
    let res = await request(server).post('/api/auth/register')
    .send({ username: 'foo' })
    expect(res.status).toBe(422)
    expect(res.body.message).toMatch(/username and password required/i)
    res = await request(server).post('/api/auth/register')
    .send({ password: 'foo' })
    expect(res.status).toBe(422)
    expect(res.body.message).toMatch(/username and password required/i)
  })

  test('[3] responds with correct body if username taken', async () => {
    let res = await request(server).post('/api/auth/register')
    .send({ 
      username: 'george',
      password: 'super'
    })
    expect(res.status).toBe(201)
    res = await request(server).post('/api/auth/register')
    .send({ 
      username: 'george',
      password: 'super'
    }) // out of the box, this sends a 500 status because of the knex schema in data/migrations/20201123181212_users.js
    expect(res.status).toBe(422)
    expect(res.body.message).toMatch(/username taken/i)
  })

})

describe('login user', () => {

  test.todo('[4] successful registration contains token in body')

  test.todo('[5] responds with correct body if missing username or password')

  test.todo('[6] responds with correct body if UN/PW is incorrect')

})
