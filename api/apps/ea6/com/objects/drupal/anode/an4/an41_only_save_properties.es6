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
// Class : anode_only_save_properties
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-only_save_properties_to_disk- 	: 	Save properties without check
// - d-only_save_properties_to_ssd- 	: 	Save properties without check
// - d-only_save_properties_to_ram- 	: 	Save properties without check
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_only_save_code } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an4/an42_only_save_code.es6')),
	fs 								= require(	'fs'				)															,
	cff  							= require(path.join(JS_BASE, 'com/libs/file/full_path/level_02/create_full_filename.es6')),
	cpf  							= require(path.join(JS_BASE, 'com/libs/file/full_path/level_02/copy_full_filename.es6')),
	scpf  							= require(path.join(JS_BASE, 'com/libs//file/full_path/level_02/save_code_properties_filename.es6'))


class anode_only_save_properties extends anode_only_save_code {

	constructor()
	{
		super()
		this.n	=	'anode_only_save_properties::'
	}											

	// ------------------------------ ONLY_SAVE_PROPERTIES_TO_DISK ------------------------------ 
	only_save_properties_to_disk()
	{
		this.m		=	'only_save_properties_to_disk'				
		this.n	=	'anode_only_save_properties::'

		// Only save array to properties file
		// El array de properties que se recibe tiene todas las propiedades de todos los arrays

		// this.p('A1_Save_prop_file ' + this.type_name + ' ' + this.load_from_disk_path )  // [PRINT_DISABLED]
		// this.p('A2_Save_prop_num ' + this.type_name + ' ' + this.arr['properties'].length ) // [PRINT_DISABLED]

		this.current_file_to_use		=	this.load_from_disk_path					
		
		if (this.b.site_lang)
			this.current_file_to_use 	= this.load_from_disk_lang								
								
		cff.create_folder_filename(		this.current_file_to_use				)		
		
		// this.p('A2_next_line_error')															

		// Si es yaml tengo que pensarlo e implementarlo pero no sera un simple fichero

		if (!this.b.file_yaml)		
			scpf.save_properties_to_file(	this.current_file_to_use				, 
									this.arr['properties']						)
	}


	// ------------------------------ ONLY_SAVE_PROPERTIES_TO_SSD ------------------------------ 
	only_save_properties_to_ssd()
	{
		this.m		=	'only_save_properties_to_ram'				
		this.n		=	'anode_only_save_properties::'

		this.current_file_to_use		=	this.ssd_alias_path					

		// this.p('Properties_41 ' + this.arr['properties'].length  + '  File ' + this.current_file_to_use  )					

		
		if (this.b.site_lang)
			this.current_file_to_use 	= this.ssd_alias_lang								

		cff.create_folder_filename(this.current_file_to_use)		

		// this.p('Properties ' + this.arr['properties'].length  + '  File ' + this.current_file_to_use  )					
		if (!this.b.file_yaml)		
			scpf.save_properties_to_file(	this.current_file_to_use						, 
											this.arr['properties']						)

	}

	// ------------------------------ ONLY_SAVE_PROPERTIES_TO_RAM ------------------------------ 
	only_save_properties_to_ram()
	{
		this.m		=	'only_save_properties_to_ram'				
		this.n		=	'anode_only_save_properties::'

		this.current_file_to_use				=	this.ram_alias_path					
		this.current_file_to_use_source 		= 	this.ssd_alias_path								
		
		if (this.b.site_lang)
		{
			this.current_file_to_use 			= 	this.ram_alias_lang								
			this.current_file_to_use_source 	= 	this.ssd_alias_lang								
		}
		
		// this.p('Saving properties_to_ram ' +  this.current_file_to_use)
		
		cff.create_folder_filename(this.current_file_to_use)		

		// this.p('Copy properties S ' + this.current_file_to_use_source + ' T ' +  this.current_file_to_use)

		cpf.copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)					

		// this.p('Copies_properties_to_ram ' +  this.current_file_to_use)

	}
	  
}

exports.anode_only_save_properties = anode_only_save_properties
