const fs = require('fs');
const path = require('path');

const EXTENSIONES = ['.ea6', '.es6', '.es7', '.js'];
let archivosModificados = 0;
let lineasCambianas = 0;

function corregirLinea(linea) {
  // Solo analizamos líneas que tengan require(path.join(...)
  if (!linea.includes('path.join(')) {
    return { lineaFinal: linea, cambiado: false };
  }

  // Regex para capturar: require(path.join( VARIABLE + 'ruta' ... )
  // Reemplaza el signo + por coma , y asegura el cierre de los dos paréntesis ))
  const patronSuma = /require\s*\(\s*path\.join\s*\(\s*([A-Za-z0-9_$\.]+)\s*\+\s*['"]([^'"]+)['"]\s*\)\s*;?/g;

  let cambiado = false;

  const lineaFinal = linea.replace(patronSuma, (match, variable, ruta) => {
    cambiado = true;
    lineasCambianas++;
    
    // Si la ruta empieza por /, le quitamos la barra inicial para que path.join la trate como segmento relativo
    const rutaLimpia = ruta.startsWith('/') ? ruta.substring(1) : ruta;

    return `require(path.join(${variable}, '${rutaLimpia}'))`;
  });

  return { lineaFinal, cambiado };
}

function procesarArchivo(rutaAbsoluta) {
  try {
    const contenidoOriginal = fs.readFileSync(rutaAbsoluta, 'utf8');
    const lineas = contenidoOriginal.split(/\r?\n/);
    let cambiosEnArchivo = 0;

    const lineasNuevas = lineas.map((linea) => {
      const { lineaFinal, cambiado } = corregirLinea(linea);
      if (cambiado) cambiosEnArchivo++;
      return lineaFinal;
    });

    if (cambiosEnArchivo > 0) {
      fs.writeFileSync(rutaAbsoluta, lineasNuevas.join('\n'), 'utf8');
      archivosModificados++;
      console.log(`✅ (${cambiosEnArchivo} líneas) -> ${path.relative(process.cwd(), rutaAbsoluta)}`);
    }
  } catch (e) {}
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
      } else if (stat.isFile() && EXTENSIONES.includes(path.extname(el))) {
        procesarArchivo(rutaAbsoluta);
      }
    } catch (e) {}
  });
}

console.log('⚡ Cambiando concatenaciones ("+") por comas (",") dentro de path.join(...)');
recorrer(__dirname);
console.log(`\n🎉 COMPLETADO:`);
console.log(`- Archivos modificados: ${archivosModificados}`);
console.log(`- Líneas corregidas: ${lineasCambianas}`);