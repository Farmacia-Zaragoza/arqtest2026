// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Node Js Anode Load Class  [V.0.1.1]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [NODE_JS_ASYNC]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections - Async
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 19]
// *anode_load > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-generate_directory_promise- 				: 	Generate current path information
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"							);

const 	fs 							= 	require(	'fs'																		),
		path 						= 	require(	'path'																		),
		recursive 					= 	require(	'/brqx/base/react/zcommon/node_modules/recursive-readdir-sync'				),
		sort 						= 	require(	'/brqx/base/react/zcommon/node_modules/sort-array'							),
		readdirp 					= 	require(	'/brqx/base/react/zcommon/node_modules/readdirp'							),
		echo	 					= 	require(	'/brqx/base/react/zcommon/node_modules/node-echo'							),
		mat							=	require(	cons.JS_BASE + 'com/libs/string/match.es6'									),
		url			 				= 	require( 	cons.JS_BASE + 'com/libs/string/url.es6'									),
		rs							= 	require(	'/brqx/base/react/zcommon/node_modules/fs-readdir-promise'					),
		run  						= 	require(	cons.JS_BASE + 'com/pms/folders/generate_directory_promise.ea6'					);	


function save_properties_promise(data_and_error = '' , t = '' )
{
  const promise = new Promise(function (resolve, reject) {

	// t.p('SAVE_PROPERTIES ' + t.type)
	t.if_is_correct_save_all_properties()
	  // Caso de exito
    resolve(t)
    if (!t) 
    {
	    reject(new Error('Problema con el objeto properties pasado '))
    }
  })
  
  return promise
	  
} // End function

function save_code_promise(data_and_error = '' , t = '' )
{
  const promise = new Promise(function (resolve, reject) {

	// t.p('SAVE_CODE ' + t.type)
		t.if_is_correct_save_all_code()
	  // Caso de exito
    resolve(t)
    if (!t) 
    {
	    reject(new Error('Problema con el objeto code pasado '))
    }
  })
  
  return promise
	  
} // End function



module.exports.save_properties_promise = save_properties_promise
module.exports.save_code_promise = save_code_promise