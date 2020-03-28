const app = require('../../src/app');
const connection = require('../../src/database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId');
const request = require('supertest');

describe('Incidents tests', () => {
  
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

  
  it('Should be able to create an incident', async () => {
    const response = await request(app)
    .post('/incidents')
    .set({
      Authorization: id,
    })    
    .send({
      title: 'Atendimento a pacientes COVID19',
      description: 'A AACD disponibilizou uma equipe médica para atendimento ao público',
      value: 20       
    });
    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(200);
  });
});
