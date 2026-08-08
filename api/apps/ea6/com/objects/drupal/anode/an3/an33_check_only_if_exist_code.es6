// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Node Js - Anode Check Only If Exist Code Class  [V.0.1.1]  (2017-09-21)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 06]
// *anode_exist_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-check_only_if_exist_code_ram-			:   Save code to disk for disk loadding
// - d-check_only_if_exist_code_ssd-			:	Only check if exist code
// - d-check_only_if_exist_code_disk-			:	Only check if exist code
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	fs 										= require(	'fs'																							),
		empty 									= require(	'/brqx/base/react/zcommon/node_modules/is-empty'												),
		{ anode_if_is_correct_save_properties } = require(	path.join(JS_BASE, 'com/objects/drupal/anode/an3/an34_if_is_correct_save_properties.ea6')),
		creff 									= require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/create_full_filename.es6'));

class anode_check_only_if_exist_code extends anode_if_is_correct_save_properties {
            
    constructor()
    {        
		super()
		this.n	=	'anode_check_only_if_exist_code::'											
	}											



	check_only_if_exist_code_ram()
	{
		this.m 		= 'check_only_if_exist_code_ram'							

		// En principio es exist properties ram
		 // this.p('Accesing_Ram ' + this.ram_alias_path + ' M ' + this.u.url_method )					
		// Comprueba si existe y ademas si el metodo no es reload

		this.current_file_to_use		=	this.ram_alias_code_path					
		
		if (this.b.site_lang)
			this.current_file_to_use 	= 	this.ram_alias_code_lang							

		// this.p('filesize_for_NO_CODE ' + this.current_file_to_use + '  -- ' + filesize(this.current_file_to_use) )			
		
        if ( !empty(this.current_file_to_use)							&& 
        	 fs.existsSync(this.current_file_to_use	)				 	&&
        	 ( 10 > creff.filesize( this.current_file_to_use ) 				) 	)
			{
				// Recover an array
				return true														
			}	
		return false 													 		
	}


	check_only_if_exist_code_ssd()
	{
		this.m 		= 'check_only_if_exist_code_ssd'							

		// En principio es exist properties ram
		// Comprueba si existe y ademas si el metodo no es reload

		this.current_file_to_use		=	this.ssd_alias_code_path					
		
		if (this.b.site_lang)
			this.current_file_to_use 	= 	this.ssd_alias_code_lang								

//		this.p('filesize_for_NO_CODE ' + filesize( this.current_file_to_use ))			
				
        if ( !empty(this.current_file_to_use) 	 						&& 
        	 fs.existsSync(this.current_file_to_use	)				 	&&
        	 ( 10 > creff.filesize( this.current_file_to_use ) 		) 	)
			{
				// Recover an array
				return true														
			}	
		return false 													 		
	}

	check_only_if_exist_code_disk()
	{
		this.m 		= 'check_if_only_exist_code_disk'									

		// Comprueba si existe y ademas si el metodo no es reload

		this.current_file_to_use		=	this.load_from_disk_path_code					
		
		if (this.b.site_lang)
			this.current_file_to_use 	= 	this.load_from_disk_lang_code							

//		this.p('filesize_for_NO_CODE ' + filesize( this.current_file_to_use ))			
		
        if ( !empty(this.current_file_to_use)								 && 
        	 fs.existsSync(this.current_file_to_use	)						 &&
        	 ( 10 > creff.filesize( this.current_file_to_use ) 			) 	)
			{
				// Recover an array
				return true																			
			}	
		return false 																		 		
	}
	  
}

exports.anode_check_only_if_exist_code = anode_check_only_if_exist_code