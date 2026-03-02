// [DOCHANGED_PHP56_PHP52_NODE]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 02 - 02 ] Node Js Theme Debug Array Class  [V.0.2.0]  (2017-01-10)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [PHP_52]
//-------------------------------------------------------------------------------------
// *Theme Debug Array > Theme Nid > Theme Structure
//-------------------------------------------------------------------------------------
// Store structure of nodes and files needed in theme
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const 	{ printlog } 		= 	require(	cons.JS_BASE + 'com/objects/logs/printlog.es6'		)

class theme_debug_array extends printlog {

	constructor()
	{
		super()
		this.n									=	'thm_debug_array::'			

		this.pg									= 	''				  	// Page structure
	
		this.s									= 	''					// Site structure
		
		this.u									= 	''					// Url structure
	
		this.b									= 	''					// Boolean structure
		
		this.nid								= 	''					// Nid structure
	
		// Arrays
		
		this.arr								=	Array()
		this.arr['fnode']						=	Array()

		this.arr['fyode'] 						=   Array()		// Used fy01_yaml

	
		this.arr['fnode']['image_list'] 		=	Array()
		this.arr['fnode']['link_list_common'] 	=	Array()
		this.arr['fnode']['link_list_lang'] 	=	Array()
		this.arr['fnode']['flag_list'] 			=	Array()
		this.arr['fnode']['email_phone_common'] =	Array()
		this.arr['fnode']['email_phone_lang'] 	=	Array()
		this.arr['fnode']['site_info_lang'] 	=	Array()
	
		// yaml
		this.arr['fyode']['cookies'] 			=   Array()		// Used fy01_yaml
	
	
		// Information structures
		this.site_title			=   ''					  	
		
		// File structure
		this.folder_dat			=	''					  
	
		this.drupal_content		=	''					   // Drupal content        
		this.drupal_head			=	''					   // Drupal content        
		this.drupal_styles		=	''					   // Drupal content        
		this.drupal_scripts		=	''					   // Drupal content        
		
	
		this.main_contents		=	''					   
		this.head_contents		=	''					   
		this.link_contents		=	''					   
		this.meta_contents		=	''					   
		this.script_contents		=	''					   
	
	
		// Image Structures
		this.img_background		=	''					  
		this.img_top				=	''					  
	
		this.img_logo		    =	''					  
		this.img_icon		    =	''					  
	
		// Nid structure
	
		this.middle_info_file	=	''					  
		
		// Content Types node contents
		
		this.flags_contents		=	''					  	 //Flags file contents
				
		this.social_contents		=	''					  	 //Social file contents

		this.method_to_load		= 	'drupal'				
	
		
		// Every object will have a map address in site
	    this.map				=	''          			
			
		this.jquery_code		= 	''						
	
		this.drift_code			=	''						
			
		this.lf					=	':</br>'				
		this.br					=	'</br>'					
		this.nr					=	"\n\r"					

		// this.p('+++++++++++++++Loaded Debug+++++++++++++++')	

   	}


  
}

exports.theme_debug_array = theme_debug_array