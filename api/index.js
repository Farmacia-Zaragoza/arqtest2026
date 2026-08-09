process.on('uncaughtException', (err) => {
  console.log('💥 ERRORES DETECTADOS EN SERVIDOR:');
  console.log(err.message);
  console.log(err.stack);
});
// 1. Librerías básicas
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const Module = require('module');

// 2. Garantizar ROOT en el proceso global
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
  JS_MODEL: path.join(global.ROOT, 'api/apps/es7/'),
  JS_BASE:  path.join(global.ROOT, 'api/apps/es6/'),
  JS_OBJ:   path.join(global.ROOT, 'api/apps/es6/com/objects/'),
  JS_LIB:   path.join(global.ROOT, 'api/apps/es6/com/libs/'),
  JS_THM:   path.join(global.ROOT, 'api/apps/es6/spc/theme/'),
  JS_THC:   path.join(global.ROOT, 'api/apps/es6/spc/theme/common/'),
  JS_BASE7: path.join(global.ROOT, 'api/apps/es7/'),
  JS_COM7:  path.join(global.ROOT, 'api/apps/es7/com/'),
  JS_SPC7:  path.join(global.ROOT, 'api/apps/es7/spc/'),
  JS_ARQ7:  path.join(global.ROOT, 'api/apps/es7/spc/arq/'),
  JS_COL7:  path.join(global.ROOT, 'api/apps/es7/spc/col/'),
  JS_EMP7:  path.join(global.ROOT, 'api/apps/es7/spc/emp/'),
  JS_MET7:  path.join(global.ROOT, 'api/apps/es7/spc/met/'),
  JS_PDT7:  path.join(global.ROOT, 'api/apps/es7/spc/pdt/'),
  JS_PER7:  path.join(global.ROOT, 'api/apps/es7/spc/per/'),
  JS_PRO7:  path.join(global.ROOT, 'api/apps/es7/spc/pro/'),
  JS_PYC7:  path.join(global.ROOT, 'api/apps/es7/spc/pyc/'),
  JS_SRV7:  path.join(global.ROOT, 'api/apps/es7/spc/srv/'),
  JS_TST7:  path.join(global.ROOT, 'api/apps/es7/spc/tst/'),
  JS_ACO7:  path.join(global.ROOT, 'api/apps/es7/spc/acomm/'),
  JS_AQD7:  path.join(global.ROOT, 'api/apps/es7/spc/arq/drupal/'),
  JS_LIB7:  path.join(global.ROOT, 'api/apps/es7/com/blib/'),
  JS_TYP7:  path.join(global.ROOT, 'api/apps/es7/com/ctyp/t01/'),
  JS_TYF7:  path.join(global.ROOT, 'api/apps/es7/com/ctyp/t02/')
};

// Asignar al ámbito global de Node
Object.keys(APP_PATHS).forEach(key => {
  global[key] = APP_PATHS[key];
});

global.define = function(name, value) {
  global[name] = value;
};

// Constructor del bloque de inyección para la cabecera de cada archivo
const injectedHeader = Object.keys(APP_PATHS)
  .map(key => `var ${key} = ${JSON.stringify(APP_PATHS[key])};`)
  .join('\n') + '\n';

// 4. INTERCEPTOR INMUNIZADOR:
// Inyecta las variables en la parte superior del archivo antes de compilarlo
require.extensions['.es7'] = function(module, filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // Solo inyectamos si no tiene ya la inyección añadida
  if (!content.includes('var JS_ACO7 =')) {
    content = injectedHeader + content;
  }

  module._compile(content, filename);
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
    fs_mod      = require('fs'),
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
