const fs = require('fs');
const path = require('path');

// Carpeta que queremos escanear
const targetDir = path.join(__dirname, 'api');

let totalArchivos = 0;
let archivosModificados = 0;

function processDirectory(directory) {
  let files = [];
  try {
    files = fs.readdirSync(directory);
  } catch (e) {
    console.log(`⚠️ No se pudo leer la carpeta: ${directory}`);
    return;
  }

  for (const file of files) {
    const fullPath = path.join(directory, file);
    let stat;

    try {
      // Usamos lstatSync para detectar enlaces simbólicos sin romper el script
      stat = fs.lstatSync(fullPath);
      
      if (stat.isSymbolicLink()) {
        // Ignoramos enlaces simbólicos para evitar errores ENOENT
        continue;
      }
    } catch (e) {
      console.log(`⚠️ Ignorando ruta inaccesible: ${fullPath}`);
      continue;
    }

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.es7') || file.endsWith('.js')) {
      totalArchivos++;
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;

        // 1. Reemplazar define("JS_XYZ", ...) o define('JS_XYZ', ...) por global.JS_XYZ = ...
        content = content.replace(/define\s*\(\s*['"](JS_[A-Z0-9_]+)['"]\s*,\s*/g, 'global.$1 = ');
        content = content.replace(/(global\.JS_[A-Z0-9_]+\s*=\s*path\.join\([^)]+\))\s*\);?/g, '$1;');

        // 2. Reemplazar variables de ruta sin 'global.' en los require / path.join
        content = content.replace(/path\.join\s*\(\s*(JS_[A-Z0-9_]+)\b/g, 'path.join(global.$1');
        content = content.replace(/path\.join\s*\(\s*(ROOT)\b/g, 'path.join(global.$1');

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`[CORREGIDO] ${path.relative(__dirname, fullPath)}`);
          archivosModificados++;
        }
      } catch (e) {
        console.log(`⚠️ Error leyendo archivo: ${fullPath}`);
      }
    }
  }
}

console.log("🚀 Iniciando escaneo y corrección automática de archivos .es7 / .js...");
if (fs.existsSync(targetDir)) {
  processDirectory(targetDir);
  console.log(`\n✅ ¡Proceso finalizado!`);
  console.log(`📊 Archivos escaneados: ${totalArchivos}`);
  console.log(`✨ Archivos corregidos automáticamente: ${archivosModificados}`);
} else {
  console.error(`❌ No se encontró la carpeta: ${targetDir}`);
}