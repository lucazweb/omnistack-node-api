const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');

routes.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    data: `Omnistack week 11.0 ${id}`,
  });
});

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);



module.exports = routes;
