const path = require('path');

const express = require('express');
const app = express();

// Captura ABSOLUTAMENTE TODO (*)
app.all('*', (req, res) => {
  res.json({
    estado: "Node.js funcionando en Vercel Pro",
    url_recibida: req.url,
    metodo: req.method,
    nota: "Si ves esto, el túnel está abierto"
  });
});

module.exports = app;


