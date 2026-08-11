const fs = require('fs');
const path = require('path');
const vm = require('vm');

const targetDir = path.join(__dirname, 'api');

let totalArchivos = 0;
let archivosConError = [];

function checkDirectory(directory) {
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
      checkDirectory(fullPath);
    } else if (file.endsWith('.es7') || file.endsWith('.js')) {
      totalArchivos++;
      try {
        const code = fs.readFileSync(fullPath, 'utf8');
        // Usamos el propio parser de V8 para verificar sintaxis sin ejecutar el código
        new vm.Script(code, { filename: file });
      } catch (err) {
        if (err instanceof SyntaxError) {
          archivosConError.push({
            file: path.relative(__dirname, fullPath),
            line: err.stack ? (err.stack.match(/Line (\d+)|:(\d+):\d+/)?.[1] || 'N/A') : 'N/A',
            message: err.message
          });
        }
      }
    }
  }
}

console.log("🔍 Escaneando y verificando SINTAXIS de todos los archivos del proyecto...\n");
checkDirectory(targetDir);

console.log("====================================================");
console.log(`📊 Archivos escaneados: ${totalArchivos}`);
console.log(`❌ Archivos con errores de sintaxis: ${archivosConError.length}`);
console.log("====================================================\n");

if (archivosConError.length > 0) {
  console.log("⚠️ DETALLE DE ARCHIVOS CON ERROR DE SINTAXIS:\n");
  archivosConError.forEach((item, index) => {
    console.log(`${index + 1}. [${item.file}]`);
    console.log(`   ❌ Error: ${item.message}`);
    console.log("----------------------------------------------------");
  });
} else {
  console.log("🎉 ¡INCREÍBLE! El 100% de los archivos tiene una SINTAXIS VÁLIDA.");
}