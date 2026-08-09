const fs = require('fs');
const path = require('path');
const vm = require('vm');

const targetFiles = [
  'api/apps/es7/com/ctyp/t01/arroba/anode/a07_index_page/an77_page_load.es7',
  'api/apps/es7/com/ctyp/t01/arroba/anode/a11_index_page/an116_main_process.es7',
  'api/apps/es7/com/ctyp/t01/uri/u07_sorts.es7',
  'api/apps/es7/spc/acomm/html/h01/main/common_robot.es7',
  'api/apps/es7/spc/col/vitolas/html/h01/main/hea01_vitolas.es7',
  'api/apps/es7/spc/col/vitolas/json/j01/jn01_generate_common_json.es7',
  'api/apps/es7/spc/col/vitolas/vitolas/json/j01/jn01_generate_common_json.es7'
];

targetFiles.forEach((relPath, index) => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;

  const code = fs.readFileSync(fullPath, 'utf8');
  const lines = code.split('\n');

  try {
    new vm.Script(code, { filename: relPath });
  } catch (err) {
    const match = err.stack ? err.stack.match(/:(\d+):(\d+)/) : null;
    const errLine = match ? parseInt(match[1], 10) : null;

    console.log(`====================================================`);
    console.log(`📄 [${index + 1}] ${relPath}`);
    console.log(`❌ Error: ${err.message}`);

    if (errLine) {
      console.log(`📍 Error detectado cerca de la línea ${errLine}:`);
      console.log(`----------------------------------------------------`);
      const start = Math.max(0, errLine - 5);
      const end = Math.min(lines.length, errLine + 3);

      for (let i = start; i < end; i++) {
        const marker = i === errLine - 1 ? '➡️ ' : '   ';
        console.log(`${marker}${String(i + 1).padStart(4, ' ')} | ${lines[i]}`);
      }
    }
    console.log(`====================================================\n`);
  }
});