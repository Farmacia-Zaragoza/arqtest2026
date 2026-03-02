// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 04 - 04 ] Node JS Definitions Class Objects  [V.0.1.1]  (2017-04-31)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Only Deffinitions
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 04] [Global Level 04]
//-------------------------------------------------------------------------------------
// *definitions_objects > Definitions  

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods Defined

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

var { definitions_arrays } 		= require(	cons.JS_BASE + 'com/objects/drupal/definitions/d02_arrays.es6'		)

class definitions_objects extends definitions_arrays {
	
	constructor()
	{
		super()	
		this.n 							= 	'definitions_objects::'			

		this.l							=	''						// Caller
	
		// Uri object
		this.u							=	''							
	
		
		// Search object
		this.s							=	''							
	
		// Scheme for Mongo
		this.sch						=	''
		this.pages						=	''		// Pages for mongo
	
		// Details object
		
		this.details					=	''							
	
		this.thm						=	''
	
		this.fnode 						=	''							
	
		// Fast Image Node
		this.inode						=	''							
	
		// Fast Image Svg Object
		this.svg						=	''							
	
		// Fast Image Node
		this.vnode						=	''							
			
		this.pg							=	''		
	
		// Htm and Htm fast load
		
		this.htm						=	''		
	
		this.search_page				=	''
	
		this.file_page					=	''
				
		// Class DOM    
	    this.dom						=	''							
		
		// vistas
	
		// Drupal view
		this.view						=	''							
		    
	    this.view_minivista_personal	=	''							 
		this.view_ilista_personal		=	''							 
		this.view_minivista_imagenes	=	''							
		this.view_senda_personal		=	''									 
 	}
}

exports.definitions_objects = definitions_objects