const fs = require('fs');
const path = require('path');
const vm = require('vm');

const EXTENSIONES = ['.js', '.es6', '.es7', '.ea6'];
let erroresMostrados = 0;

function revisarArchivo(rutaAbsoluta) {
  const rutaRelativa = path.relative(process.cwd(), rutaAbsoluta);
  try {
    const contenido = fs.readFileSync(rutaAbsoluta, 'utf8');
    new vm.Script(contenido, { filename: rutaRelativa });
  } catch (error) {
    if (erroresMostrados < 8) { // Solo mostramos los primeros 8 ejemplos para no saturar
      erroresMostrados++;
      console.log(`\n--------------------------------------------------`);
      console.log(`❌ ARCHIVO: ${rutaRelativa}`);
      console.log(`⚠️ ERROR:   ${error.message}`);
      
      const lineMatch = error.stack.match(/:(\d+)/);
      if (lineMatch) {
        const numLinea = parseInt(lineMatch[1], 10);
        const lineas = fs.readFileSync(rutaAbsoluta, 'utf8').split('\n');
        console.log(`📌 LÍNEA ${numLinea}: ${lineas[numLinea - 1] ? lineas[numLinea - 1].trim() : ''}`);
      }
    }
  }
}

function recorrer(dir) {
  let elementos;
  try { elementos = fs.readdirSync(dir); } catch (e) { return; }

  elementos.forEach((el) => {
    const rutaAbsoluta = path.join(dir, el);
    try {
      const stat = fs.statSync(rutaAbsoluta);
      if (stat.isDirectory() && el !== 'node_modules' && !el.startsWith('.')) {
        recorrer(rutaAbsoluta);
      } else if (stat.isFile() && EXTENSIONES.includes(path.extname(el)) && !el.startsWith('reparar-') && !el.startsWith('validar-') && !el.startsWith('ver-')) {
        revisarArchivo(rutaAbsoluta);
      }
    } catch (e) {}
  });
}

console.log('🔍 Buscando detalle de los primeros errores pendientes...');
recorrer(__dirname);