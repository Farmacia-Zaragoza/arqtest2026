// 1. Cargamos las librerías básicas que usaba tu lanzador
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const ROOT = process.cwd();
global.ROOT = ROOT; // <--- Debes asignarla explícitamente al global
global.path = require('path');

global.echo = (...args) => console.log(...args);

global.removeAccents = (str) => {
  if (typeof str !== 'string') return str;
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

if (typeof global.define !== 'function') {
    global.define = function(name, value) {
        Object.defineProperty(global, name, {
            value: value,
            enumerable: true,
            writable: false,
            configurable: true
        });
    };
}

// Checking long paths
// const { params }          =   require(path.join(global.ROOT , 'api/apps/es7/com/ctyp/t01/params/p01_params.es7'));


//Constantes GLOBALES
define("JS_MODEL", 	path.join(global.ROOT, 'api/apps/es7'										))
define("JS_BASE" ,	path.join(global.ROOT, 'api/apps/es6/'						))
define("JS_OBJ" , 	path.join(global.ROOT, 'api/apps/es6/com/objects/'			))
define("JS_LIB" , 	path.join(global.ROOT, 'api/apps/es6/com/libs/'			))

define("JS_THM" , 	path.join(global.ROOT, 'api/apps/es6/spc/theme/'			))
define("JS_THC" ,   path.join(global.ROOT, 'api/apps/es6/spc/theme/common/'	))

// ES7 constants
define("JS_BASE7" ,	path.join(global.ROOT, 'api/apps/es7/'						))
define("JS_COM7" , 	path.join(global.ROOT, 'api/apps/es7/com/'			))
define("JS_SPC7" , 	path.join(global.ROOT, 'api/apps/es7/spc/'			))

define("JS_ARQ7" , 	path.join(global.ROOT, 'api/apps/es7/spc/arq/'			))
define("JS_COL7" , 	path.join(global.ROOT, 'api/apps/es7/spc/col/'			))
define("JS_EMP7" , 	path.join(global.ROOT, 'api/apps/es7/spc/emp/'			))
define("JS_MET7" , 	path.join(global.ROOT, 'api/apps/es7/spc/met/'			))
define("JS_PDT7" , 	path.join(global.ROOT, 'api/apps/es7/spc/pdt/'			))
define("JS_PER7" , 	path.join(global.ROOT, 'api/apps/es7/spc/per/'			))
define("JS_PRO7" , 	path.join(global.ROOT, 'api/apps/es7/spc/pro/'			))
define("JS_PYC7" , 	path.join(global.ROOT, 'api/apps/es7/spc/pyc/'			))
define("JS_SRV7" , 	path.join(global.ROOT, 'api/apps/es7/spc/srv/'			))
define("JS_TST7" , 	path.join(global.ROOT, 'api/apps/es7/spc/tst/'			))

define("JS_ACO7" , 	path.join(global.ROOT, 'api/apps/es7/spc/acomm/'			))
define("JS_AQD7" , 	path.join(global.ROOT, 'api/apps/es7/spc/arq/drupal/'   ))


define("JS_LIB7" , 	path.join(global.ROOT, 'api/apps/es7/com/blib/'			))

// Structured Types
define("JS_TYP7" , 	path.join(global.ROOT, 'api/apps/es7/com/ctyp/t01/'			))

// Functional Types -
define("JS_TYF7" , 	path.join(global.ROOT, 'api/apps/es7/com/ctyp/t02/'			))

// 2. Simulamos las variables de entorno que calculabas con path.split
// En Vercel las rutas son fijas, así que forzamos los valores
// const site = process.env.SITE_NAME || 'mi-sitio-pro';

// 3. IMPORTANTE: Cargamos tu lógica compleja (fire.es7)
// Ajusta la ruta para que apunte a donde hayas subido el archivo en GitHub

const app = express();

const fireApp = require('./apps/fire.es7');

//-------------------------------------------------------------------------------------
let run_path                =   path.resolve(".")
let a_ruta                  =   run_path.split('/')
let a_len                   =   a_ruta.length -1
//-------------------------------------------------------------------------------------
var branch                  =   a_ruta[a_len - 2 ]        // Architecture Branch  (arq)
var prod                    =   a_ruta[a_len - 1 ]        // Architecture product (garldru)
var site                    =   a_ruta[a_len ]            // Architecture product (garldru)

var prodbranch              =   branch + '/' + prod + '/'

var
    application_root = __dirname,
    http 		= require('http'),
    https 		= require('https'),
    http2 		= require('http2'),
  	tls 		= require('tls'),
    logger 		= require('morgan'),
    fs 			= require('fs'),
	  yargs 		= require('yargs'),
	  constants	= require('constants');

    // Manera segura de inicializarla en Node 24  --> FALLA
// var globalThis.GLOBALS = globalThis.GLOBALS || [];

global['GLOBALS'] = []

// 4. Configuramos el middleware que ya tenías
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 5. El "Puente": Redirigimos todo el tráfico a tu lógica fire.es7
app.all('*', (req, res) => {
    // Aquí es donde fire.es7 toma el control
    // Asumiendo que fire.es7 es un router de express o una función (req, res)
//      res.json({ estado: "Inicio lanzamiento" });
    return fireApp(req, res);
});

// 6. Exportamos la app (Vercel se encarga de "levantarla")
module.exports = app;
