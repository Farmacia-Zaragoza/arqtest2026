// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Exist Properties Class  [V.0.1.1]  (2017-09-21)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 06]
// *anode_exist_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-check_only_if_exist_properties_ram-		:   Save properties to disk for disk loadding
// - d-check_only_if_exist_properties_ssd-		:	Only check if exist properties
// - d-check_only_if_exist_properties_disk-		:	Only check if exist properties
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_check_only_if_exist_code } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an3/an33_check_only_if_exist_code.es6'),
	creff 									= require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/create_full_filename.es6'),
	empty 									= require(	'/brqx/base/react/zcommon/node_modules/is-empty'),
	fs										= require(	'fs');	

class anode_check_only_if_exist_properties extends anode_check_only_if_exist_code {
            
    constructor()
    {        
		super()
		this.n	=	'anode_check_only_if_exist_properties::'											
	}											


	check_only_if_exist_properties_ram()
	{
		this.m 		= 'check_only_if_exist_properties_ram'							

		// En principio es exist properties ram
		 // this.p('Accesing_Ram ' + this.ram_alias_path + ' M ' + this.u.url_method )					
		// Comprueba si existe y ademas si el metodo no es reload
		
		// Aquit tenemos que considerar el multi idioma
		
		this.current_file_to_use		=	this.ram_alias_path					
		
		if (this.b.site_lang)
			this.current_file_to_use 	= 	this.ram_alias_lang								
		
        if ( ( !empty(this.current_file_to_use)					 	) && 
        	 ( fs.existsSync(this.current_file_to_use	)				) &&
        	 ( 0 != creff.filesize( this.current_file_to_use ) 				) 	)
			{
				// Recover an array
				return true														
			}	
		return false 													 		
	}

	check_only_if_exist_properties_ssd()
	{
		this.m 		= 'check_only_if_exist_properties_ssd'							

		this.current_file_to_use		=	this.ssd_alias_path					
		
		if (this.b.site_lang)
			this.current_file_to_use 	= this.ssd_alias_lang								

	
        if ( ( !empty(this.current_file_to_use) 	) && 
        	 ( fs.existsSync(this.current_file_to_use	)				) &&
        	 ( 0 != creff.filesize( this.current_file_to_use ) 				) 	)
			{
				// Recover an array
				return true														
			}	
		return false 													 		
	}


	check_only_if_exist_properties_disk()
	{
		this.m 		= 'check_if_only_exist_properties_disk'							

		this.current_file_to_use		=	this.load_from_disk_path					
		
		if (this.b.site_lang)
			this.current_file_to_use 	= this.load_from_disk_lang								

		// this.d('Accesing ' + this.ram_alias_path)					
		// Comprueba si existe y ademas si el metodo no es reload
        if ( ( !empty(this.current_file_to_use) 	) && 
        	 ( fs.existsSync(this.current_file_to_use	)				) &&
        	 ( 0 != creff.filesize( this.current_file_to_use ) 				) 	)
			{
				// Recover an array
				return true														
			}	
		return false 													 		
	}

	  
}

exports.anode_check_only_if_exist_properties = anode_check_only_if_exist_properties