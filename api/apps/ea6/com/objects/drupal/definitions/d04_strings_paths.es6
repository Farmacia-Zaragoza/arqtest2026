// [DOCHANGED_NODE]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 02 - 02 ] Node JS Definitions Class Strings Paths [V.0.1.5]  (2018-01-12)
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

var 	cons 					= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"				)

const { definitions_booleans } 	= 	require(	cons.JS_BASE + 'com/objects/drupal/definitions/d05_booleans.es6'	)


class definitions_strings_paths extends definitions_booleans {
		
	constructor()
	{
		super()	
		this.n 								= 	'definitions_strings_paths::'			

		this.m								=	'method'						


	// Paths	
		this.file_path						=	''						
		this.path							=	''						

		this.load_from_disk_path			=	''						
		this.load_from_disk_path_code		=	''						

		this.load_from_disk_lang			=	''						
		this.load_from_disk_lang_code		=	''						

		this.base_folder_path				=	'/ssd/myr/'				


	// Oriented url path of images
		this.img_path				=	''						
		this.ram_img_path			=	''						

	// Oriented url path of images
		this.img_url_path			=	''						
		this.ram_img_url_path		=	''						


	// Oriented url path of images
		this.ram_img_url_folder		=	''						

	// Oriented path of images
		this.ram_img_folder			=	''						

	// END IMAGE PROPERTIES	

		this.current_file_to_use		=	''						 // Current file to have common methods
		this.current_file_to_use_source	=	''						 // Current file to have common methods
				
		this.ssd_path					=	''						 // Path for ssd node
		this.ram_path					=	''						 // Path for ram node

		this.ssd_lang					=	''						 // Path for ssd node
		this.ram_lang					=	''						 // Path for ram node
	
		this.ssd_alias_path				=	''						 // Path for ssd node
		this.ram_alias_path				=	''						 // Path for ram node

		this.ssd_alias_lang				=	''						 // Path for ssd node
		this.ram_alias_lang				=	''						 // Path for ram node
	
		this.ssd_code_path			=	''						 // Path for ssd node
		this.ram_code_path			=	''						 // Path for ram node

		this.ssd_code_lang			=	''						 // Path for ssd node
		this.ram_code_lang			=	''						 // Path for ram node

	
		this.ssd_img_path				=	''						 // Path for ssd node
	
		this.ssd_alias_code_path			=	''						 // Path for ssd node
		this.ram_alias_code_path			=	''						 // Path for ram node

		this.ssd_alias_code_lang			=	''						 // Path for ssd node
		this.ram_alias_code_lang			=	''						 // Path for ram node
	
		this.ssd_alias_img_path			=	''						 // Path for ssd node
		this.ram_alias_img_path			=	''						 // Path for ram node

	// Urls
		this.ssd_url					=	''						 // Path for ssd node
		this.ram_url					=	''						 // Path for ram node

		this.ssd_urlang					=	''						 // Path for ssd node
		this.ram_urlang					=	''						 // Path for ram node
	
	//Pending to add lang types
		this.ssd_alias_url				=	''						 // Path for ssd node
		this.ram_alias_url				=	''						 // Path for ram node

		this.ssd_alias_urlang				=	''						 // Path for ssd node
		this.ram_alias_urlang				=	''						 // Path for ram node
	
		this.ssd_code_url			=	''						 // Path for ssd node
		this.ram_code_url			=	''						 // Path for ram node

		this.ssd_code_urlang			=	''						 // Path for ssd node
		this.ram_code_urlang			=	''						 // Path for ram node
	
	
		this.ssd_img_url				=	''						 // Path for ssd node
	
		this.ssd_alias_code_url			=	''						 // Path for ssd node
		this.ram_alias_code_url			=	''						 // Path for ram node

		this.ssd_alias_code_urlang			=	''						 // Path for ssd node
		this.ram_alias_code_urlang			=	''						 // Path for ram node
	
		this.ssd_alias_img_url			=	''						 // Path for ssd node
		this.ram_alias_img_url			=	''						 // Path for ram node
	

		this.page_position				=	''							

		this.input_file					=	''							
		this.site_url					=	''						

		this.json_url					=	''						
		this.json_uri					= 	''						

	// Path change
		this.change						=	''						 // To implement url change
		this.change_disk				=	''						 // To implement url change

		this.suffix						=	''						
		this.suffix_disk				=	''						

		this.suffix_lang				=	''						 // To implement multi language

		this.suffix_code				=	''						

	
	// SSD - RAM - Paths -- Pending to LANG

		this.ssd_results_path				=	''						 // Path for ssd node
		this.ssd_foto_results_path			=	''						 // Path for ssd node

		this.ssd_alias_results_path			=	''						 // Path for ssd node
		this.ssd_alias_foto_results_path		=	''						 // Path for ssd node
	
		this.ram_results_path				=	''						 // Path for Query results
		this.ram_foto_results_path			=	''						 // Path for Query results
					
		this.ram_alias_results_path			=	''						 // Alias to code path
		this.ram_alias_foto_results_path		=	''						 // Alias to code path

	// EMAIL - PHONE

		this.phone_img_relative_path	=	''							
		this.email_img_relative_path	=	''							
		this.phone_img_absolute_path	=	''							
		this.email_img_absolute_path	=	''							

		this.phone_icon_original_relative_path	=	''							
		this.email_icon_original_relative_path	=	''							
		this.phone_icon_original_absolute_path	=	''							
		this.email_icon_original_absolute_path	=	''							

		this.phone_icon_target_relative_path	=	''							
		this.email_icon_target_relative_path	=	''							
		this.phone_icon_target_absolute_path	=	''							
		this.email_icon_target_absolute_path	=	''							
						
		this.phone_svg_absolute_path			=	''						
		this.email_svg_absolute_path			=	''						

		this.phone_svg_absolute_url				=	''						
		this.email_svg_absolute_url				=	''						
		
   }
  
}

exports.definitions_strings_paths = definitions_strings_paths