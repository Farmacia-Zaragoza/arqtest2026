// 1. Cargamos las librerías básicas que usaba tu lanzador
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// 2. Garantizar ROOT en el proceso global desde el primer instante
const ROOT = process.cwd();
global.ROOT = ROOT;
global.path = path;

global.echo = (...args) => console.log(...args);

global.removeAccents = (str) => {
  if (typeof str !== 'string') return str;
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// 3. Función define() ultra-robusta que inyecta directamente en global
global.define = function(name, value) {
  global[name] = value;
  try {
    Object.defineProperty(global, name, {
      value: value,
      enumerable: true,
      writable: true,
      configurable: true
    });
  } catch (e) {
    global[name] = value;
  }
};

// 4. PRECARGA DE TODAS LAS CONSTANTES GLOBALES
define("JS_MODEL" , path.join(global.ROOT, 'api/apps/es7/'));
define("JS_BASE"  , path.join(global.ROOT, 'api/apps/es6/'));
define("JS_OBJ"   , path.join(global.ROOT, 'api/apps/es6/com/objects/'));
define("JS_LIB"   , path.join(global.ROOT, 'api/apps/es6/com/libs/'));

define("JS_THM"   , path.join(global.ROOT, 'api/apps/es6/spc/theme/'));
define("JS_THC"   , path.join(global.ROOT, 'api/apps/es6/spc/theme/common/'));

// ES7 constants
define("JS_BASE7" , path.join(global.ROOT, 'api/apps/es7/'));
define("JS_COM7"  , path.join(global.ROOT, 'api/apps/es7/com/'));
define("JS_SPC7"  , path.join(global.ROOT, 'api/apps/es7/spc/'));

define("JS_ARQ7"  , path.join(global.ROOT, 'api/apps/es7/spc/arq/'));
define("JS_COL7"  , path.join(global.ROOT, 'api/apps/es7/spc/col/'));
define("JS_EMP7"  , path.join(global.ROOT, 'api/apps/es7/spc/emp/'));
define("JS_MET7"  , path.join(global.ROOT, 'api/apps/es7/spc/met/'));
define("JS_PDT7"  , path.join(global.ROOT, 'api/apps/es7/spc/pdt/'));
define("JS_PER7"  , path.join(global.ROOT, 'api/apps/es7/spc/per/'));
define("JS_PRO7"  , path.join(global.ROOT, 'api/apps/es7/spc/pro/'));
define("JS_PYC7"  , path.join(global.ROOT, 'api/apps/es7/spc/pyc/'));
define("JS_SRV7"  , path.join(global.ROOT, 'api/apps/es7/spc/srv/'));
define("JS_TST7"  , path.join(global.ROOT, 'api/apps/es7/spc/tst/'));

define("JS_ACO7"  , path.join(global.ROOT, 'api/apps/es7/spc/acomm/'));
define("JS_AQD7"  , path.join(global.ROOT, 'api/apps/es7/spc/arq/drupal/'));

define("JS_LIB7"  , path.join(global.ROOT, 'api/apps/es7/com/blib/'));

// Structured Types
define("JS_TYP7"  , path.join(global.ROOT, 'api/apps/es7/com/ctyp/t01/'));

// Functional Types
define("JS_TYF7"  , path.join(global.ROOT, 'api/apps/es7/com/ctyp/t02/'));

// 5. Verificación de seguridad de constantes globales
const constantsList = [
  'JS_MODEL','JS_BASE','JS_OBJ','JS_LIB','JS_THM','JS_THC','JS_BASE7',
  'JS_COM7','JS_SPC7','JS_ARQ7','JS_COL7','JS_EMP7','JS_MET7','JS_PDT7',
  'JS_PER7','JS_PRO7','JS_PYC7','JS_SRV7','JS_TST7','JS_ACO7','JS_AQD7',
  'JS_LIB7','JS_TYP7','JS_TYF7'
];

constantsList.forEach(c => {
  if (!global[c]) {
    console.warn(`[WARN] Constante global no inicializada: ${c}`);
  }
});

// 6. Variables de entorno y utilidades
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

// 7. Carga de la aplicación principal
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
