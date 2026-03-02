// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2017 - 22/10/17				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Funciones que retornan promesas
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- save_properties|code_to_file - file_get_code
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// fs-extra maneja promesas
// fs 					= require(	'/brqx/base/react/zcommon/node_modules/fs-extra'									),

const 	fs 					= require(	'fs'																				),
		path 				= require(	'path'																				),
		os 					= require(	'os'																				),
		empty 				= require(	'/brqx/base/react/zcommon/node_modules/is-empty'									),
		trim 				= require(	'/brqx/base/react/zcommon/node_modules/trim'										),
		mkdirp 				= require(	'/brqx/base/react/zcommon/node_modules/mkdirp'										),
		rr					= require(	'/brqx/base/react/zcommon/node_modules/recursive-readdir'							),
		rs					= require(	'/brqx/base/react/zcommon/node_modules/fs-readdir-promise'							),
		creff 				= require( 	'/brqx/base/rcode/es6/com/libs/file/full_path/level_02/create_full_filename.es6'	);


/*
async function readdir_promise(full_path_dir = '',result)
{
	return new Promise(function (resolve, reject) {
    	fs.readdir(full_path_dir, function (error, result) {
      	if (error) 
      	{
        	reject(error);
      	} 
      	else 
      	{
        	resolve(result);
      	}
    });
 });

};

*/
let mypath = '/ssd/truck/'
var myresult = Array();

// dont work - node 8.5
// let files = await readdir_promise(mypath)

// Promise async - Works
rs(mypath).then(
  function(files) {
    console.log("files are", files);
  },
  function(error) {
    console.error("something exploded", error);
  }
);



//print files 


//module.exports.readdir_promise 			= readdir_promise 
