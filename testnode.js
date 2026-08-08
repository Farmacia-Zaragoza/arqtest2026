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
      } else if (stat.isFile() && EXTENSIONES.includes(path.extname(el)) {
        let contenido = fs.readFileSync(ruta, 'utf8');
        let cambiado = false;

        // 1. Corrige el punto y coma dentro de path.join(process.cwd(),
        if (contenido.includes('path.join(process.cwd(),')) {
          contenido = contenido.replaceAll('path.join(process.cwd(),', 'path.join(process.cwd(),');
          cambiado = true;
        }

        // 2. Corrige variantes con espacios en path.join( process.cwd() );
        if (contenido.includes('path.join(process.cwd(),')) {
          contenido = contenido.replaceAll('path.join(process.cwd(),', 'path.join(process.cwd(),');
          cambiado = true;
        }

        // 3. Corrige paréntesis triples al final )) por ))
        if (contenido.includes('))')) {
          contenido = contenido.replaceAll('))', '))');
          cambiado = true;
        }

        if (cambiado) {
          fs.writeFileSync(ruta, contenido, 'utf8');
          arreglados++;
          console.log(`✅ Arreglado en disco: ${path.basename(ruta)}`);
        }
      }
    } catch (e) {}
  });
}

console.log('⚡ Aplicando corrección directa...');
recorrer(__dirname);
console.log(`\n🎉 Total de archivos reparados: ${arreglados}`);