const request = require('supertest')
const faker = require('faker')
const app = require('../../src/app')

describe('Authentication', () => {

  // executa alguma coisa antes dos testes
  beforeEach( async () => {
    await app.db.migrate.latest()
  })

  // teste de cadastro do usuário
  it('should create a new user', async () =>{
    const response = await request(app).post('/create/users').send({
      name: faker.name.findName(), 
      email: "testee@test.com", 
      pass: "123456789"
    })

    expect(response.body).toHaveProperty('message')
  })

  // teste se o usuário consegue se conectar
  it('should receive JWT token when authenticated with valid credentials', async () =>{
    const response = await request(app).post('/session').send({
      email: "testee@test.com", 
	    pass: "123456789"
    })
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  // teste se o usuário não consegue logar
  it('should receive JWT token when not authenticated with invalid credentials', async () =>{
    const response = await request(app).post('/session').send({
      email: faker.internet.email(), 
      pass: faker.internet.password()
    })
    
    expect(response.status).toBe(401)
  })

  // executa alguma coisa depois que termina de executar todos os testes
  afterAll(async () => {
    await app.db.migrate.rollback()
  })
})
