// 1. Cargamos las librerías básicas que usaba tu lanzador
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// 2. Simulamos las variables de entorno que calculabas con path.split
// En Vercel las rutas son fijas, así que forzamos los valores
const site = process.env.SITE_NAME || 'mi-sitio-pro';

// 3. IMPORTANTE: Cargamos tu lógica compleja (fire.es7)
// Ajusta la ruta para que apunte a donde hayas subido el archivo en GitHub
const fireApp = require('./apps/fire.es7');

const app = express();

// 4. Configuramos el middleware que ya tenías
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 5. El "Puente": Redirigimos todo el tráfico a tu lógica fire.es7
app.all('*', (req, res) => {
    // Aquí es donde fire.es7 toma el control
    // Asumiendo que fire.es7 es un router de express o una función (req, res)
    return fireApp(req, res);
});

// 6. Exportamos la app (Vercel se encarga de "levantarla")
module.exports = app;
