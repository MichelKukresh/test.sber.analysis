const routesCharts = require('express').Router();

const { allCharts } = require('../controllers/charts');

routesCharts.get('/', allCharts);

module.exports = routesCharts;
