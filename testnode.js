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

        // 1. Limpiar residuos de require paths.js viejos
        content = content.replace(/.*paths\.js.*\n?/g, '');

        // 2. Convertir require desestructurados propensos a fallo:
        // Ejemplo: const { mi_clase } = require('...') -> const _m_0 = require('...'); const mi_clase = _m_0.mi_clase || _m_0;
        let counter = 0;
        content = content.replace(/(?:const|let|var)\s*\{\s*([a-zA-Z0-9_]+)\s*\}\s*=\s*require\(([^)]+)\);?/g, (match, varName, reqPath) => {
          counter++;
          const modVar = `_mod_safe_${counter}`;
          return `const ${modVar} = require(${reqPath}); const ${varName} = ${modVar}.${varName} || ${modVar};`;
        });

        // 3. Garantizar exportación doble al final si existe exports.nombre = nombre
        const exportMatch = content.match(/exports\.([a-zA-Z0-9_]+)\s*=\s*\1;?/);
        if (exportMatch) {
          const className = exportMatch[1];
          if (!content.includes(`module.exports = ${className}`)) {
            content += `\nmodule.exports = ${className};\nmodule.exports.${className} = ${className};\n`;
          }
        }

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf8');
          archivosModificados++;
        }
      } catch (e) {}
    }
  }
}

console.log("🚀 Iniciando blindaje masivo de módulos y herencias en todo el proyecto...");
if (fs.existsSync(targetDir)) {
  processDirectory(targetDir);
  console.log(`\n✅ ¡Proceso finalizado con éxito!`);
  console.log(`📊 Archivos escaneados: ${totalArchivos}`);
  console.log(`✨ Archivos blindados automáticamente: ${archivosModificados}`);
} else {
  console.error(`❌ No se encontró la carpeta: ${targetDir}`);
}