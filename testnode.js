const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'api');

let totalArchivos = 0;
let archivosModificados = 0;

function processDirectory(directory) {
  let files = [];
  try {
    files = fs.readdirSync(directory);
  } catch (e) {
    return;
  }

  for (const file of files) {
    const fullPath = path.join(directory, file);
    let stat;

    try {
      stat = fs.lstatSync(fullPath);
      if (stat.isSymbolicLink()) continue;
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.es7') || file.endsWith('.js')) {
      totalArchivos++;
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;

        // 1. Eliminar residuos de require(path.join(..., 'paths.js'))
        content = content.replace(/.*paths\.js.*\n?/g, '');
        content = content.replace(/(?:const|let|var)\s*\{\s*JS_[A-Z0-9_]+\s*\}\s*=\s*require\([^)]*\);?/gs, '');

        // 2. Reemplazar define("JS_XYZ", ...) o define('JS_XYZ', ...) por global.JS_XYZ = ...
        content = content.replace(/define\s*\(\s*['"](JS_[A-Z0-9_]+)['"]\s*,\s*/g, 'global.$1 = ');
        content = content.replace(/(global\.JS_[A-Z0-9_]+\s*=\s*path\.join\([^)]+\))\s*\);?/g, '$1;');

        // 3. Reemplazar variables de ruta sin 'global.' en los require / path.join
        content = content.replace(/path\.join\s*\(\s*(JS_[A-Z0-9_]+)\b/g, 'path.join(global.$1');
        content = content.replace(/path\.join\s*\(\s*(ROOT)\b/g, 'path.join(global.$1');

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`[CORREGIDO] ${path.relative(__dirname, fullPath)}`);
          archivosModificados++;
        }
      } catch (e) {}
    }
  }
}

console.log("🚀 Limpiando residuos y arreglando sintaxis...");
if (fs.existsSync(targetDir)) {
  processDirectory(targetDir);
  console.log(`\n✅ ¡Proceso finalizado!`);
  console.log(`📊 Archivos escaneados: ${totalArchivos}`);
  console.log(`✨ Archivos corregidos: ${archivosModificados}`);
}