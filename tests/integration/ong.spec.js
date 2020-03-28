const app = require('../../src/app');
const connection = require('../../src/database/connection');
const request = require('supertest');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'AASSA',
        email: 'contato@aassa.com',
        whatsapp: '711234565676',
        city: 'Salvador',
        uf: 'BA'
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
