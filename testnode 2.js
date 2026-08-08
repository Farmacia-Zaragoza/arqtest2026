const fs = require('fs');
const path = require('path');

// Añadidas todas tus extensiones personalizadas
const EXTENSIONES = ['.ea6', '.es6', '.es7', '.js', '.json'];
let totalModificados = 0;

function procesarDirectorio(dir) {
  let elementos;
  try {
    elementos = fs.readdirSync(dir);
  } catch (err) {
    return;
  }

  elementos.forEach((elemento) => {
    const rutaAbsoluta = path.join(dir, elemento);

    try {
      const stat = fs.statSync(rutaAbsoluta);

      if (stat.isDirectory() && elemento !== 'node_modules' && !elemento.startsWith('.')) {
        procesarDirectorio(rutaAbsoluta);
      } else if (stat.isFile() && EXTENSIONES.includes(path.extname(elemento))) {
        corregirArchivo(rutaAbsoluta);
      }
    } catch (e) {}
  });
}

function corregirArchivo(rutaArchivo) {
  try {
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    
    if (!contenido.includes('path.join') || !contenido.includes('+')) {
      return;
    }

    // RegEx ultra-flexible: soporta saltos de línea (\s*) y múltiples espacios
    // 1. Reemplaza el '+' por ','
    let nuevoContenido = contenido.replace(
      /path\.join\(\s*([A-Za-z0-9_]+)\s*\+\s*(['"][^'"]+['"])/g,
      'path.join($1, $2)'
    );

    // 2. Corrige la falta del paréntesis de cierre antes de comas o cierres de require
    // Cambia: path.join(A, B)))  -->  path.join(A, B)))
    nuevoContenido = nuevoContenido.replace(
      /path\.join\(([^)]+)\)\s*(,|\))/g,
      'path.join($1)))$2'
    );

    if (contenido !== nuevoContenido) {
      fs.writeFileSync(rutaArchivo, nuevoContenido, 'utf8');
      totalModificados++;
      console.log(`📝 Sobrescrito con éxito (${path.extname(rutaArchivo)}): ${path.basename(rutaArchivo)}`);
    }
  } catch (err) {
    console.log(`❌ Error en: ${rutaArchivo}`);
  }
}

console.log('⚡ Procesando archivos (.ea6, .es6, .es7, .js)... \n');
procesarDirectorio(__dirname);
console.log(`\n🎉 ¡Finalizado! Se han modificado ${totalModificados} archivos.`);