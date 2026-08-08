// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Properties Class  [V.0.1.2]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 04]
// *anode_only_save_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-only_save_properties_to_disk- 	: 	Save properties without check
// - d-only_save_properties_to_ssd- 	: 	Save properties without check
// - d-only_save_properties_to_ram- 	: 	Save properties without check
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_manage_code_type } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an4/an49_manage_code_type_path.es6'))

class anode_only_save_language_properties extends anode_manage_code_type {

	constructor()
	{
		super()
		this.n	=	'anode_only_save_language_properties::'
	}											
            
	only_save_lang_properties_to_disk()
	{
		this.m		=	'only_save_lang_properties_to_disk'				

		// Only save array to properties file
		// El array de properties que se recibe tiene todas las propiedades de todos los arrays

		//this.p('A1 Save prop ' + this.type_name + ' ' + this.load_from_disk_path )  // [PRINT_DISABLED]
		//this.p('A2 Save prop ' + this.type_name + ' ' + this.arr['properties'].length  ) // [PRINT_DISABLED]

		this.current_file_to_use		=	this.load_from_disk_path					
		
		if (this.b.site_lang)
			this.current_file_to_use		=	this.load_from_disk_lang					
				
						
		create_folder_filename(		this.current_file_to_use				)		

		// Si es yaml tengo que pensarlo e implementarlo pero no sera un simple fichero
		
		this.p('BEFORE_TO_SAVE ' + this.current_file_to_use )

		if (!this.b.file_yaml)		
			save_properties_to_file(	this.current_file_to_use				, 
										this.arr['properties']						)
	}


	only_save_lang_properties_to_ssd()
	{
		this.m		=	'only_save_lang_properties_to_ram'				

		this.current_file_to_use		=	this.ssd_alias_path					

		if (this.b.site_lang)
			this.current_file_to_use		=	this.ssd_alias_lang					


		create_folder_filename(this.current_file_to_use)		

		if (!this.b.file_yaml)		
			save_properties_to_file(	this.current_file_to_use						, 
									this.arr['properties']						)

	}

	only_save_lang_properties_to_ram()
	{
		this.m		=	'only_save_lang_properties_to_ram'				

		this.current_file_to_use				=	this.ram_alias_path					
		this.current_file_to_use_source		=	this.ssd_alias_path					

		if (this.b.site_lang)
		{
			this.current_file_to_use			=	this.ram_alias_lang					
			this.current_file_to_use_source	=	this.ssd_alias_lang					
		}

		create_folder_filename(this.current_file_to_use)		

		copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)					

	}
	  
}

exports.anode_only_save_language_properties = anode_only_save_language_properties