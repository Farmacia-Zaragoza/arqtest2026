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

        // 1. Corregir cualquier residuo de sintaxis roto previo como '; );' o ', );'
        content = content.replace(/;\s*\);\s*/g, ');\n');
        content = content.replace(/,\s*\);\s*/g, ');\n');

        // 2. Limpiar residuos viejos de paths.js
        content = content.replace(/.*paths\.js.*\n?/g, '');

        // 3. Convertir require desestructurados de forma 100% limpia sin tocar los paréntesis finales
        let counter = 0;
        content = content.replace(/(?:const|let|var)\s*\{\s*([a-zA-Z0-9_]+)\s*\}\s*=\s*require\(([\s\S]*?)\)\s*;?/g, (match, varName, reqPath) => {
          counter++;
          const modVar = `_mod_safe_${counter}`;
          const cleanPath = reqPath.trim();
          return `const ${modVar} = require(${cleanPath}); const ${varName} = ${modVar}.${varName} || ${modVar};`;
        });

        // 4. Asegurar exportaciones dobles limpias sin duplicar
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

console.log("🚀 Iniciando reparación masiva y saneamiento de sintaxis...");
if (fs.existsSync(targetDir)) {
  processDirectory(targetDir);
  console.log(`\n✅ ¡Saneamiento finalizado con éxito!`);
  console.log(`📊 Archivos escaneados: ${totalArchivos}`);
  console.log(`✨ Archivos reparados: ${archivosModificados}`);
} else {
  console.error(`❌ No se encontró la carpeta: ${targetDir}`);
}