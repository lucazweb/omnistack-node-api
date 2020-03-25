const express = require('express');
const routes = express.Router();
const crypto = require('crypto');
const connection = require('./database/connection');


routes.get('/', (req, res) => {
  res.json({
      status: 'Server is running',
      data: `Omnistack week 11.0 ${id}`
  })    
});
  
routes.post('/ongs', async (req, res) => {
  const { name, email, whatsapp, city, uf} = req.body;
  const id = crypto.randomBytes(4).toString('HEX');

 await connection('ongs').insert({
    id,
    name,
    email, 
    whatsapp,
    city,
    uf
  });

  res.json({ id });
});

module.exports = routes;
