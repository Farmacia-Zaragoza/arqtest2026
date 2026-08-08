// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Load Properties File Class  [V.0.2.0]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 01]
// *anode_run_from_disk > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-load_properties_file-				: Load an external file like a letter
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_taxonomy } 	= require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an09_taxonomy.es6'))
		const fs = require(	'fs'																				);

// enfoque de promesas aplazado
//		fs 					= require(	'/brqx/base/react/zcommon/node_modules/fs-extra'									);

class anode_load_properties_file extends anode_taxonomy {

	constructor()
	{
        super()
		this.n	=	'anode_load_properties_file::'											
    }
            
	load_properties_file(filepath = '' , index = '')
	{
		// Devolvemos un array con el contenido del fichero line por linea
		if (index != '' )
		{
			if ((!empty(filepath)  ) &&	 
				( fs.existsSync(filepath) &&   fs.lstatSync(filepath).isFile() ) &&
	        	 ( 0 != filesize( filepath) 	) 	)
			{
				// this.arr[index] = file(filepath)	
				this.arr[index] = fs.readFileSync(filepath).toString().split('\n');
				
			}	
			
		}

	}
	  
}

exports.anode_load_properties_file = anode_load_properties_file