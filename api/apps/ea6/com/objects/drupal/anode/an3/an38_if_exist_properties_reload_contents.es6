// [DOCHANGED_PHP56_PHP52_NODE]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Properties Class  [V.0.1.1]  (2018-01-10)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 06]
// *anode_is_exist_properties_reload_contents > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_if_exist_properties_reload_contents-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-if_exist_properties_ram_reload_contents-			: 	Check if exist properties ram file
// - d-if_exist_properties_disk_reload_contents-		:   Save properties to disk for disk loadding
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 								= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"							);

const 	{ anode_prepare_array_properties } 	= 	require(	cons.JS_BASE + 'com/objects/drupal/anode/an4/an40_prepare_array_properties.es6'	),
		ffi									= 	require(	cons.JS_BASE + 'com/libs/file/full_path/level_01/f_file.es6'					),
		fya									= 	require(	cons.JS_BASE + 'com/libs/file/full_path/level_01/f_yaml.es6'					),
		echo 								= 	require(	'/brqx/base/react/zcommon/node_modules/node-echo'								),
		fs 									= 	require(	'fs'																			);

class anode_if_exist_properties_reload_contents extends anode_prepare_array_properties {
    
    constructor()
    {        
		super()
		this.n	=	'an38_if_exist_properties_reload_contents::'											
	}

	// ------------------------------------- IF_EXIST_PROPERTIES_RAM_RELOAD_CONTENTS -------------------------------------  
	if_exist_properties_ram_reload_contents()
	{
		this.m 		= 'if_exist_properties_ram_reload_contents'							
		this.n	=	'an38_if_exist_properties_reload_contents::'											

		// En principio es exist properties ram
		// this.p('Accesing_Ram ' + this.type + ' S ' + this.short_type + ' ' + this.ram_alias_path)					
		// /ram/home/ser/zd/main/es/zdom/emp/flat/zd_main_flat/es/cache/flat.dbrqx.com/anonymous/flat/fnode/cookies_structure/human/a/common/common_cookies_yaml_fnode.dyml

		// Comprueba si existe y ademas si el metodo no es reload

		// true == Existe fichero -- No hay que generarlo
	
		this.current_file_to_use = this.ram_alias_path 
		
		if (this.b.site_lang)
			this.current_file_to_use 	= this.ram_alias_lang								
		
		// checking files 
		
		// Si no existe e larchivo nunca debera entrar
        if ( this.arr['nfo']['generate_ram_properties']) 
			{

				// this.p('GENERE_Ram ' + this.type + ' S ' + this.current_file_to_use )					
		
				// Recover an array
				if (this.b.file_yaml)
				{
					var ya = new fya.yaml_from_file(this.current_file_to_use)
					
					// Ojo es un sorted_array object. No es un array
					this.contents = ya.arr
					// this.p('Contents Yaml ' +  this.contents)	
				}
				else
				{
					var ff_arr = new ffi.properties_from_file(this.current_file_to_use)

 					this.contents = ff_arr.arr
				}

				return true														
			}	
		return false 													 		
	}

	// ------------------------------------- IF_EXIST_PROPERTIES_SSD_RELOAD_CONTENTS -------------------------------------  
	if_exist_properties_ssd_reload_contents()
	{
		this.m 		= 'if_exist_properties_ssd_reload_contents'							
		this.n	=	'an38_if_exist_properties_reload_contents::'											

		// En principio es exist properties ram
		// this.p('Accesing_SSD ' + this.ssd_alias_path + ' M ' + this.u.url_method )					
		// /ssd/home/ser/zd/main/es/zdom/emp/flat/zd_main_flat/es/cache/flat.dbrqx.com/anonymous/flat/fnode/cookies_structure/human/a/common/common_cookies_yaml_fnode.dyml
		// Comprueba si existe y ademas si el metodo no es reload

		// true == Existe fichero -- No hay que generarlo

		this.current_file_to_use = this.ssd_alias_path 

		if (this.b.site_lang)
		 	this.current_file_to_use 	= this.ssd_alias_lang								
				
        if ( this.arr['nfo']['generate_ssd_properties']) 
			{
				// Recover an array
				if (this.b.file_yaml)
				{
					var ya = new fya.yaml_from_file(this.current_file_to_use)
					this.contents = ya.arr
					// this.p('Contents Yaml ' +  this.contents)	
				}
				else
				{
					var ff_arr = new ffi.properties_from_file(this.current_file_to_use)

 					this.contents = ff_arr.arr
				}

				return true														
			}	
		return false 													 		
	}

	// ------------------------------------- IF_EXIST_PROPERTIES_DISK_RELOAD_CONTENTS -------------------------------------  
	if_exist_properties_disk_reload_contents()
	{
		this.m	= 	'if_exist_properties_disk_reload_contents'								

		// this.p('Accesing_DISK ' + this.load_from_disk_path)					
		// Comprueba si existe y ademas si el metodo no es reload

		// true == Existe fichero -- No hay que generarlo
		// true == No hay que generar
		// SI ES HUMANO NUNCA HAY QUE GENERAR
		
		this.current_file_to_use = this.load_from_disk_path 

		if (this.b.site_lang)
		 	this.current_file_to_use 	= this.load_from_disk_lang			
				
		if ( this.arr['nfo']['generate_disk_properties']) 
			{
				// this.p('Accesing_DISK_IN ' + this.load_from_disk_path)					

				// Recover an array
				if (this.b.file_yaml)
				{
					// this.p('GETTING_DAML ' +  this.current_file_to_use)	
					var ya = new fya.yaml_from_file(this.current_file_to_use)
					this.contents = ya.arr
					// this.p('Contents Yaml ' +  this.contents)	
					// this.p('GETTING_DAML ' +  this.current_file_to_use)	
				}
				else
				{
					// OJO QUE ES UNA CARPETA
					// /brqx/pers/drupal/v50/fnode/truck/fnode/site_structure/site_common
					// this.p('FFILE_Before Error ' + this.current_file_to_use )
					var ff_arr = new ffi.properties_from_file(this.current_file_to_use)

 					this.contents = ff_arr.arr
					// this.p('LENGTH--- ' + this.contents.length )
					// this.p('FFILE_aFTER Error ' + this.current_file_to_use )

				}
				return true														
			}	
		return false 													 		
	}

	  
}

exports.anode_if_exist_properties_reload_contents = anode_if_exist_properties_reload_contents