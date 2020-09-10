const app = require('express');
const routes = app.Router();
const sucursales = require('./sucursales.routes')

routes.use('/sucursales', sucursales)

module.exports = routes;