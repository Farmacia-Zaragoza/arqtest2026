// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 01 - 01 ] Node Js Theme Nid Class  [V.0.2.0]  (2017-01-10)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [PHP_COMMON]
//-------------------------------------------------------------------------------------
// *Theme Nid > Theme Structure 
//-------------------------------------------------------------------------------------
// Store structure of nodes and files needed in theme - Only for Drupal
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const 	{ theme_debug_array } 		= 	require(path.join(JS_BASE, 'com/objects/drupal/theme/t03_debug_array.es6'))
		const empty = require(	'/brqx/base/react/zcommon/node_modules/is-empty'								);

class theme_nid extends theme_debug_array {
             
  	constructor ()  
   	{   
		super()
		this.n					=	'thm_nid::'				
		
		// Pending
		//super.constructor()

		// this.p('Object ' + this.s)
		if (!empty(this.s.folder_dat) )
		{			
			// Esta parte de para drupal
			this.nid							= 		new nid(this.s.folder_dat) 							
	
			// Dat contents - Se usan internamente puesto que hay zonas que no hace falta usar fnode
			// Se basa en sites que usan ficheros dat para los atributos
	
	        this.main_contents 					= 		file (this.nid.arr['dat']['region_main'])		
	
	        this.meta_contents 					= 		file (this.nid.arr['dat']['region_meta'])	
	        this.link_contents 					= 		file (this.nid.arr['dat']['region_link'])		
	        this.top_contents 					= 		file (this.nid.arr['dat']['region_top'])		
	
	        this.bottom_contents 				= 		file (this.nid.arr['dat']['region_bottom'])			
	
	        this.script_contents 				= 		file (this.nid.arr['dat']['region_script'])		
		    this.social_contents 				= 		file (this.nid.arr['dat']['types_social'])		

		}
		// Content type contents
    }
  
}

exports.theme_nid = theme_nid