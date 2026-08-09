// 1. Librerías básicas
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// 2. Garantizar ROOT y Helpers globales mínimos
const ROOT = process.cwd();
global.ROOT = ROOT;
global.path = path;

global.echo = (...args) => console.log(...args);

global.removeAccents = (str) => {
  if (typeof str !== 'string') return str;
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// 3. Extracción segura de entorno/sitio
const run_path = path.resolve(".");
const a_ruta = run_path.split('/');
const a_len = a_ruta.length - 1;

global.branch = a_ruta[a_len - 2] || 'arq';
global.prod = a_ruta[a_len - 1] || 'garldru';
global.site = a_ruta[a_len] || 'default';
global.prodbranch = `${global.branch}/${global.prod}/`;

global.GLOBALS = [];

// 4. Inicialización de Express
const app = express();
const fireApp = require('./apps/fire.es7');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 5. Puente a la lógica principal (fireApp)
app.all('*', (req, res) => {
  return fireApp(req, res);
});

module.exports = app;
