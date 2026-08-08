// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 04 - 04 ] Node JS Definitions Class Separators [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Only Deffinitions
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 04] [Global Level 04]
//-------------------------------------------------------------------------------------
// *def_separators > def_booleans > def_strings > def_arrays >  definitions_objects  
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// load_child_details_disk

//-------------------------------------------------------------------------------------
// Methods Defined


// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const		{ printlog } 	= require(path.join(JS_BASE, 'com/objects/logs/printlog.es6'))


class definitions_separators extends printlog  {
	
	constructor()
	{	
		super()
		this.n 							= 	'definitions_separators::'	
		
		this.br							= 	'</br>'						
		
		// Hay que averiguar donde se pierde el separador	
		this.sep						=	'@'							
		this.sp							=	'/'							
		this.lr							=	"\n\r" 						
  	}
}

exports.definitions_separators = definitions_separators
