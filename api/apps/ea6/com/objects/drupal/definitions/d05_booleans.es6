// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 03 - 03 ] Node JS Definitions Class  [V.0.1.2]  (2017-04-07)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Only Deffinitions
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 03] [Global Level 03]
//-------------------------------------------------------------------------------------
// definitions_objects > def_arrays > def_strings > *def_booleans  

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);


var { definitions_separators } 		= require(path.join(JS_BASE, 'com/objects/drupal/definitions/d06_separators.es6'))

class definitions_booleans extends definitions_separators {

	constructor()
	{
			
		super()	
		this.n 							= 	'definitions_booleans::'		
	
		// Booleans
		
		this.is_there_contents			= 	false							 // Pendiente 
	
		this.status						=	1								 // Por defecto se genera la pagina - usuario administado
	
	    this.is_vertical				=	1								 // By default is vertical
	
	   	this.sw_taxonomy				=	''								 // Pendiente
		
		// Report if code is correctly generated
		this.loaded						=	'no_generated'					 //Por defecto los fragmentos no se han generado
	
		this.code_generated				=	'no'							
		
	}
}

exports.definitions_booleans = definitions_booleans