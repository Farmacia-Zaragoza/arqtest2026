// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 02 - 02 ] Node JS Definitions Class Strings [V.0.1.5]  (2017-09-21)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Only Deffinitions
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 02] [Global Level 02]
//-------------------------------------------------------------------------------------
// definitions_objects > def_arrays > *def_strings  

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//-------------------------------------------------------------------------------------
// Methods Defined


// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

var { definitions_strings_paths } 		= require(path.join(JS_BASE, 'com/objects/drupal/definitions/d04_strings_paths.es6'))

class definitions_strings extends definitions_strings_paths {

	constructor()
	{		
		super()	
		this.n 								= 	'definitions_strings::'			

		this.m								=	'method'						


		// Drupal fields
		this.title							=	''						 // Drupal node title
		this.type							=	''						 // Drupal node type style - Used for reload
		this.short_type						=	''						 // Used for reload : FPC - 
		this.date							=	''						 // Drupal node type style
		this.encabezado						=	''						
		this.information					=	''						
		this.description					=	''						
		this.descriptions					=	''						
		this.nombre_parrafada				=	''						
	
		this.node_id						=	''						 // Drupal node id
	
		// Site - Firm fields
	
		this.site_title						=	''						 // Page - Site Title
		this.firm_name						=	''						 // Firm Name
		this.logo_alt						=	''						 // Logo Alt
	
		this.title_hover					=	''						 // Logo Alt
			
	
		this.time_table						=	''						 // Logo Alt
		this.anti_spam						=	''						 // anti_spam
			
			
		this.meta_desc						=	''						 // Logo Alt
		this.meta_author					=	''						 // Logo Alt
	
		// Captcha
	
		this.captcha_check					=	''						 // captcha_spam
		this.captcha_why					=	''						 // captcha_spam
		this.captcha_wrong					=	''						 // captcha_spam
		this.captcha_redirect				=	''						 // captcha_spam
		this.captcha_load					=	''						 // captcha_spam
		this.captcha_text					=	''						 // captcha_spam
								
		
		// Views args
		this.view_type						=	''						
		    
	    this.name							=	''						
	    this.args							=	''						
	    this.length							=	''						
	
	    this.sort							=	'alfa'						
	    this.random							=	'001'						
		this.num_elems						=	''						
	
		// Atributes
	
		// Drupal Views - Will be disappear
		
	    this.view_minivista_personal_name 	= 	''					 
		this.view_ilista_personal_name  		= 	''				 
		this.view_minivista_imagenes_name	= 	''					
		this.view_senda_personal_name  		= 	''					 
	
	    this.view_minivista_personal_args 	= 	''					 
		this.view_ilista_personal_args  	= 	''				 
		this.view_minivista_imagenes_args	= 	''					
		this.view_senda_personal_args  		= 	''					 
	
		this.nid							=	''						
	
		// Paths	
	
		this.lang_site						=	'es'					
	
		// Fast Node properties
	
		// IMAGE PROPERTIES 
	
	
	    this.img_name_clean					= 	''						
	    this.image_name						= 	''						
		this.image_name_clean				=	''						
	
		this.img_base_resolution			=	'2048x1536'				
	
		this.img_name_with_resolution		=	''						
	
		this.only_image_with_resolution 	=	''						
	
		this.resolutions_to_generate		=	''						
	
		this.full_resolutions_to_generate	=	''						
				
		// Full url path of image
		this.original_image_url_path 		=	''						
	
		this.extension						=	''						
	
		// Oriented url path of images
		this.img_name				=	''						
		this.ram_img_name			=	''						
	
	
		this.img_type_save			=	'path'					
	
	    this.width					= 	''						 // Image Alt
	         
	    this.height					= 	''						 // Image Alt
	    
	    this.relation 				= 	''						
	
	    this.img_type 				= 	''						 // JPG - PNG - GIF
	
	    this.quality 				= 	''						 // JPG Image quality 
	    
	    this.orientation			= 	'vertical'				 // vertical - horizontal
	
	    this.glob_method			=	'noglob'				
	
		
	
		// END IMAGE PROPERTIES	
	
		this.page_position				=	''							
	
	
		// Path change
	
		this.compo_zone					=	'/left'					
		
		this.type_name					= 	''			
			
		// BLOCK PROPERTIES
		
		this.block_type					=	'block'					
		this.block_id					=	''						
	
	
		// SEARCH PROPERTIES
	
		this.num						= 0								// Num results
		this.foto_num					= 0								// Num foto results
		
		// SSD - RAM - Paths
	
		
		// Codigo de resultados obtenidos
		this.res_code						=	''										    		
	
		// SYNC PROPERTIES
		
		this.sync_server					=	'cbrqx.com'								
	
		// DOWNLOAD PROPERTIES
	
		this.cool_extensions 				= 	Array('jpg','jpeg','png','gif','svg')		
	
		// FAST LOAD PROPERTIES
	
		// PAISFADA - YEARFADA
		
		this.temporadas 					= 	''									 
		this.temporada 						= 	''									 
		
		this.status							=	0						 // Por defecto se genera la pagina - usuario administado
	
		// EMAIL - PHONE
	
		this.email_contact				=	''							
		
		this.email_num					=	''							
		this.email_alt					=	''							
		this.phone_num					=	''							
	
		// Pendiente de revisar
		this.phone_alt					=	''							
		this.alt_phone_icon				=	''						
	
		this.phone_adv					=	'Contactar de 10am a 10pm'							
		this.email_adv					=	'Quitar _no_spam parar responder'					
	
		this.font						=	''							
		this.font_name					=	''						 // Only the name	
		this.font_size					=	''							
		this.color						=	''						 // green - gray - orange - is a text not a color like Hex Format	
		this.text 						=	''						 // For image text generation
			
			
		this.original_color				=	''						 // green - gray - orange - is a text not a color like Hex Format	
		this.target_color				=	''						 // green - gray - orange - is a text not a color like Hex Format	
	
	
		// FILE STRUCTURE PROPERTIES
	
		this.cookies_msg_01				=	''							
		this.cookies_msg_02				=	''							
		this.cookies_msg_uri			=	''							
		this.cookies_msg_uritext		=	''							
	
		this.cookies_text				=	''						
		this.cookies_description		=	''						
	
		this.efile						=	''						 // External file
	
		this.header_msg					=	''							
		this.extended_msg				=	''							
	
		this.num_links					=	0						
		
		this.num_files					=	0						
		this.num_folders				=	0						
		this.max_files					=	1000					
		this.max_folders				=	100						
	
		this.path_pointer				=	''						 // uri/<path_pointer>  cica/imgs/
		
		// Atributes
	
		// Tnode Class
		this.tnode						=	''								
	
		// NODE - PAGE - TYPES - SUBTYPES
		
		// Fast Page Type
		this.ptype						=	'human'						 // Page type human bots 
	
		// Fast Node properties
		this.ftype							=	'fnode'							// Fast node drupal type
			
		this.ntype							=	'node'						 // Fast node type
		this.stype							=	'undef'						 // Fast node subtype
			
		// Common drupal properties
	        		
		this.taxonomy					=	''						
		
		this.drupal_content				=	''		
	
		
		this.supermnu_dats				=	''		
		
	
		// Fast node code
		this.code						=	''						
	
		// Every object will have a map address in site
	    this.map						=	''          			
		
		// Jquery code for ajax call
		this.jquery_code				=	''						
		
		// Drift Code
		
		this.drift_code					=	''					
		
		// Strings   		
	
		this.nid_divs					=	''					
	
		this.group_list_num				=	'3'										
	
		this.error_page_nid				=	''						
		this.error_page_node_alias		=	''						
	}            
  
}

exports.definitions_strings = definitions_strings