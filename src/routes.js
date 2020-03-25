const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const connection = require('./database/connection');

routes.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    data: `Omnistack week 11.0 ${id}`,
  });
});

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

module.exports = routes;
