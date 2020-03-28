const app = require('../../src/app');
const connection = require('../../src/database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId');
const request = require('supertest');

/**
 * Profile tests assume that create ong an incidents routes are funtional
 */
describe('Profile tests', () => {
  const id = generateUniqueId();
  const incident = {
    title: 'Campanha de arrecadação de agasalhos',
    description: 'A AACD irá promover uma campanha para arrecadação de agasalhos no próximo mês',
    value: 20,
    ong_id: id
  };

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

    await connection('incidents').insert(incident);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should get a list of ong incidents', async () => {
    const response = await request(app)
      .get('/profile')
      .set({
        Authorization: id
      });
    expect(response.body).toHaveLength(1);
  });

});
