// 1. Cargamos las librerías básicas que usaba tu lanzador
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// 2. Simulamos las variables de entorno que calculabas con path.split
// En Vercel las rutas son fijas, así que forzamos los valores
// const site = process.env.SITE_NAME || 'mi-sitio-pro';

// 3. IMPORTANTE: Cargamos tu lógica compleja (fire.es7)
// Ajusta la ruta para que apunte a donde hayas subido el archivo en GitHub
const sureapp = require('./apps/fire.es7');

const app = express();

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
