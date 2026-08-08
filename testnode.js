const fs = require('fs');
const path = require('path');

const EXTENSIONES = ['.ea6', '.es6', '.es7', '.js'];
let arreglados = 0;

function recorrer(dir) {
  let elementos;
  try { elementos = fs.readdirSync(dir); } catch (e) { return; }

  elementos.forEach((el) => {
    const ruta = path.join(dir, el);
    try {
      const stat = fs.statSync(ruta);
      if (stat.isDirectory() && el !== 'node_modules' && !el.startsWith('.')) {
        recorrer(ruta);
      } else if (stat.isFile() && EXTENSIONES.includes(path.extname(el))) {
        let contenido = fs.readFileSync(ruta, 'utf8');

        // Busca cualquier variante de paths.js seguido de 1 solo paréntesis y punto y coma, ignorando espacios
        if (contenido.includes('paths.js')) {
          const nuevo = contenido.replace(/paths\.js(['"])\s*\)\s*;/g, "paths.js$1));");

          if (contenido !== nuevo) {
            fs.writeFileSync(ruta, nuevo, 'utf8');
            arreglados++;
            console.log(`✅ Arreglado paths.js en: ${path.basename(ruta)}`);
          }
        }
      }
    } catch (e) {}
  });
}

console.log('⚡ Limpiando paths.js en el resto de archivos...');
recorrer(__dirname);
console.log(`\n🎉 Total de archivos ajustados: ${arreglados}`);