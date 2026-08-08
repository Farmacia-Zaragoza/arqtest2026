const fs = require('fs');
const path = require('path');

const EXTENSIONES = ['.ea6', '.es6', '.es7', '.js', '.json'];

function limpiarParantesis(dir) {
  let elementos;
  try { elementos = fs.readdirSync(dir); } catch (e) { return; }

  elementos.forEach((elemento) => {
    const rutaAbsoluta = path.join(dir, elemento);
    try {
      const stat = fs.statSync(rutaAbsoluta);
      if (stat.isDirectory() && elemento !== 'node_modules' && !elemento.startsWith('.')) {
        limpiarParantesis(rutaAbsoluta);
      } else if (stat.isFile() && EXTENSIONES.includes(path.extname(elemento)) {
        let contenido = fs.readFileSync(rutaAbsoluta, 'utf8');
        
        // Reemplaza los )) accidentales al final de sentencias por ))
        if (contenido.includes('))')) {
          const nuevo = contenido.replace(/\)\)\)/g, '))');
          fs.writeFileSync(rutaAbsoluta, nuevo, 'utf8');
          console.log(`🔧 Paréntesis corregido en: ${path.basename(rutaAbsoluta)}`);
        }
      }
    } catch (e) {}
  });
}

limpiarParantesis(__dirname);