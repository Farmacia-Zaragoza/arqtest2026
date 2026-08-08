const path = require('path');
const ROOT = process.cwd();

// 1. Declarar global.ROOT
global.ROOT = ROOT;

// 2. Definir función global define() para que no falle cuando la llamen los .es7
global.define = function(name, value) {
  global[name] = value;
};

// 3. Diccionario de rutas
const PATHS = {
    ROOT: ROOT,
    JS_MODEL: path.join(ROOT, 'api/apps/es7'),
    JS_BASE: path.join(ROOT, 'api/apps/es6/'),
    JS_OBJ: path.join(ROOT, 'api/apps/es6/com/objects/'),
    JS_LIB: path.join(ROOT, 'api/apps/es6/com/libs/'),
    JS_THM: path.join(ROOT, 'api/apps/es6/spc/theme/'),
    JS_THC: path.join(ROOT, 'api/apps/es6/spc/theme/common/'),
    JS_BASE7: path.join(ROOT, 'api/apps/es7/'),
    JS_COM7: path.join(ROOT, 'api/apps/es7/com/'),
    JS_SPC7: path.join(ROOT, 'api/apps/es7/spc/'),
    JS_ARQ7: path.join(ROOT, 'api/apps/es7/spc/arq/'),
    JS_COL7: path.join(ROOT, 'api/apps/es7/spc/col/'),
    JS_EMP7: path.join(ROOT, 'api/apps/es7/spc/emp/'),
    JS_MET7: path.join(ROOT, 'api/apps/es7/spc/met/'),
    JS_PDT7: path.join(ROOT, 'api/apps/es7/spc/pdt/'),
    JS_PER7: path.join(ROOT, 'api/apps/es7/spc/per/'),
    JS_PRO7: path.join(ROOT, 'api/apps/es7/spc/pro/'),
    JS_PYC7: path.join(ROOT, 'api/apps/es7/spc/pyc/'),
    JS_SRV7: path.join(ROOT, 'api/apps/es7/spc/srv/'),
    JS_TST7: path.join(ROOT, 'api/apps/es7/spc/tst/'),
    JS_ACO7: path.join(ROOT, 'api/apps/es7/spc/acomm/'),
    JS_AQD7: path.join(ROOT, 'api/apps/es7/spc/arq/drupal/'),
    JS_LIB7: path.join(ROOT, 'api/apps/es7/com/blib/'),
    JS_TYP7: path.join(ROOT, 'api/apps/es7/com/ctyp/t01/'),
    JS_TYF7: path.join(ROOT, 'api/apps/es7/com/ctyp/t02/')
};

// 4. INYECCIÓN GLOBAL: Asigna CADA constante a global (global.JS_TYP7, etc.)
for (const [key, value] of Object.entries(PATHS)) {
    global[key] = value;
}

module.exports = PATHS;
