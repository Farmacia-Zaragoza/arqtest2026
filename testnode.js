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

        // Reemplaza comas finales en llamadas require(path.join(...)), por punto y coma
        const nuevo = contenido.replace(
          /(require\s*\(\s*path\.join\([^)]+\)\s*),/g,
          '$1);'
        );

        if (contenido !== nuevo) {
          fs.writeFileSync(ruta, nuevo, 'utf8');
          arreglados++;
          console.log(`✅ Cambiada coma final por punto y coma en: ${path.basename(ruta)}`);
        }
      }
    } catch (e) {}
  });
}

console.log('⚡ Corregiendo cierres con comas...');
recorrer(__dirname);
console.log(`\n🎉 Completado. Se modificaron ${arreglados} archivos.`);