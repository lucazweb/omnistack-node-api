const app = require('../../src/app');
const connection = require('../../src/database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId');
const request = require('supertest');

describe('Session tests', () => {
  
  const id = generateUniqueId();
  
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    
    const ong = {
      name: 'AACD',
      email: 'contato@aacd.com.br',
      whatsapp: '11999442255',
      city: 'São Paulo',
      uf: 'SP'
    };
    
    await connection('ongs').insert({
      id,
      ...ong
    });    
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create session with ONG code', async () => {
    const response = await request(app)
      .post('/session')
      .send({ id });
      
    expect(response.body).toHaveProperty('name');
  });

});
