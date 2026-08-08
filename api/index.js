// 1. Cargamos las librerías básicas que usaba tu lanzador
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const Module = require('module');

// 2. Garantizar ROOT en el proceso global desde el primer instante
const ROOT = process.cwd();
global.ROOT = ROOT;
global.path = path;

global.echo = (...args) => console.log(...args);

global.removeAccents = (str) => {
  if (typeof str !== 'string') return str;
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// 3. Mapa de constantes globales
const APP_PATHS = {
  JS_MODEL: path.join(ROOT, 'api/apps/es7/'),
  JS_BASE:  path.join(ROOT, 'api/apps/es6/'),
  JS_OBJ:   path.join(ROOT, 'api/apps/es6/com/objects/'),
  JS_LIB:   path.join(ROOT, 'api/apps/es6/com/libs/'),
  JS_THM:   path.join(ROOT, 'api/apps/es6/spc/theme/'),
  JS_THC:   path.join(ROOT, 'api/apps/es6/spc/theme/common/'),
  JS_BASE7: path.join(ROOT, 'api/apps/es7/'),
  JS_COM7:  path.join(ROOT, 'api/apps/es7/com/'),
  JS_SPC7:  path.join(ROOT, 'api/apps/es7/spc/'),
  JS_ARQ7:  path.join(ROOT, 'api/apps/es7/spc/arq/'),
  JS_COL7:  path.join(ROOT, 'api/apps/es7/spc/col/'),
  JS_EMP7:  path.join(ROOT, 'api/apps/es7/spc/emp/'),
  JS_MET7:  path.join(ROOT, 'api/apps/es7/spc/met/'),
  JS_PDT7:  path.join(ROOT, 'api/apps/es7/spc/pdt/'),
  JS_PER7:  path.join(ROOT, 'api/apps/es7/spc/per/'),
  JS_PRO7:  path.join(ROOT, 'api/apps/es7/spc/pro/'),
  JS_PYC7:  path.join(ROOT, 'api/apps/es7/spc/pyc/'),
  JS_SRV7:  path.join(ROOT, 'api/apps/es7/spc/srv/'),
  JS_TST7:  path.join(ROOT, 'api/apps/es7/spc/tst/'),
  JS_ACO7:  path.join(ROOT, 'api/apps/es7/spc/acomm/'),
  JS_AQD7:  path.join(ROOT, 'api/apps/es7/spc/arq/drupal/'),
  JS_LIB7:  path.join(ROOT, 'api/apps/es7/com/blib/'),
  JS_TYP7:  path.join(ROOT, 'api/apps/es7/com/ctyp/t01/'),
  JS_TYF7:  path.join(ROOT, 'api/apps/es7/com/ctyp/t02/')
};

// Registrar de forma indestructible en global
Object.keys(APP_PATHS).forEach(key => {
  global[key] = APP_PATHS[key];
  try {
    Object.defineProperty(global, key, {
      value: APP_PATHS[key],
      writable: true,
      enumerable: true,
      configurable: true
    });
  } catch(e) {}
});

global.define = function(name, value) {
  global[name] = value;
};

// 4. INTERCEPTOR DIRECTO DE RUTAS:
// Sustituye el identificador por la cadena de texto de la ruta absoluta directamente
// Esto evita que CoffeeScript o Node intenten buscar la variable en el scope local.
const originalCompile = Module.prototype._compile;
Module.prototype._compile = function(content, filename) {
  if (filename.endsWith('.es7') || filename.endsWith('.js')) {
    Object.keys(APP_PATHS).forEach(key => {
      // Reemplaza la variable por su string literal directamente
      // Ej: path.join(JS_ACO7, ...) -> path.join("/var/task/api/apps/es7/spc/acomm/", ...)
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      content = content.replace(regex, `'${APP_PATHS[key].replace(/\\/g, '/')}'`);
    });
  }
  return originalCompile.call(this, content, filename);
};

// 5. Variables de entorno y utilidades
let run_path = path.resolve(".");
let a_ruta   = run_path.split('/');
let a_len    = a_ruta.length - 1;

var branch = a_ruta[a_len - 2] || 'arq';
var prod   = a_ruta[a_len - 1] || 'garldru';
var site   = a_ruta[a_len]     || 'default';

var prodbranch = branch + '/' + prod + '/';

var application_root = __dirname,
    http        = require('http'),
    https       = require('https'),
    http2       = require('http2'),
    tls         = require('tls'),
    logger      = require('morgan'),
    fs          = require('fs'),
    yargs       = require('yargs'),
    constants   = require('constants');

global['GLOBALS'] = [];

// 6. Carga de la aplicación principal
const app = express();
const fireApp = require('./apps/fire.es7');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Puente a la lógica principal
app.all('*', (req, res) => {
  return fireApp(req, res);
});

module.exports = app;
