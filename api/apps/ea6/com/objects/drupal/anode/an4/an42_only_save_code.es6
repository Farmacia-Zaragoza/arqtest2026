// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Only Save Code Class  [V.0.1.2]  (2017-09-21)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 04]
// *anode_only_save_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_only_save_code-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-only_save_code_to_disk-			:   Save code without check
// - d-only_save_ascii_code_to_disk		:	Save code as ascii - for SVG by example
// - d-only_save_code_to_ram-			:   Save code without check
// - d-only_save_alias_code_to_ram-		:	Save alias code without check
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var 	{ anode_only_save_language_properties } = require(	path.join(JS_BASE, 'com/objects/drupal/anode/an4/an43_only_save_language_properties.es6'),
		os										= require(	'os'																							),
		empty 									= require(	'/brqx/base/react/zcommon/node_modules/is_empty'												),
		dom 									= require(	'/brqx/base/react/zcommon/node_modules/xmldom'													),
		scpf 									= require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'),
		cff 									= require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/copy_full_filename.es6'),
		creff 									= require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/create_full_filename.es6'));

class anode_only_save_code extends anode_only_save_language_properties {

	constructor()
	{            
		super()
		this.n			=	'an42_only_save_code::'
	}											

	only_save_code_to_disk()
	{
		this.m			=	'only_save_code_to_disk'					
		this.n			=	'an42_only_save_code::'

		this.current_file_to_use			=	this.load_from_disk_path_code					
		
		if (this.b.site_lang)
			this.current_file_to_use		=	this.load_from_disk_lang_code					

		// this.p('Before_to_save_info' + this.current_file_to_use )														

		if (!empty(this.code) )
		{
			// Grabamos tambien el codigo de bloques complejos						
			creff.create_folder_filename(		this.current_file_to_use			)		
	
			// this.p('SO_code ' + this.type  + ' L '  + this.code.length + ' C ' + this.load_from_disk_path_code  + ' P ' + this.load_from_disk_path)  
	
			scpf.save_code_to_file(	this.current_file_to_use				, 
									this.code				)
		}
	}

	// --------------------------- ONLY_SAVE_ASCII_CODE_TO_DISK --------------------------- 
	only_save_ascii_code_to_disk()
	{
		this.m			=	'only_save_code_to_disk'					
		this.n			=	'an42_only_save_code::'

		this.current_file_to_use			=	this.load_from_disk_path_code					
		
		if (this.b.site_lang)
			this.current_file_to_use		=	this.load_from_disk_lang_code					

		// Grabamos tambien el codigo de bloques complejos						
		creff.create_folder_filename(			this.current_file_to_use			)		

		// this.code undefined

		// Aqui debe llegar una cadena, si ea vacio falla
		
		if (!empty(this.code) )
		{
			// PENDING
			// feeds_code = this.code.replace('/\<br(\s*)?\/?\>/i', os.EOL )
	
			// var DOMParser = dom.DOMParser;

			// var parser = new DOMParser();
			// var doc = parser.parseFromString(this.code)

			// var XMLSerializer = dom.XMLSerializer;
			// var serializer = new XMLSerializer();

			// Remove Xml header		
			// let ascii_code = serializer.serializeToString(doc)  

			// this.p('Before_to_save_code ' + ascii_code.length )														

			// Save properties in file			

			// this.p('SS_code ' + this.current_file_to_use)  

			let ascii_code = this.code

			// this.p('SVG_FILE_TO_USE: ' + this.current_file_to_use)

			scpf.save_code_to_file(	this.current_file_to_use				, 
									ascii_code								)
		}
	}


	only_save_code_to_ram()
	{
		this.m			=	'only_save_code_to_ram'					
		this.n			=	'an42_only_save_code::'

		// this.p('Generating_folder_RAM : ' + this.ram_code_path)		

		this.current_file_to_use				=	this.ram_code_path					
		this.current_file_to_use_source			=	this.ssd_code_path					
		
		if (this.b.site_lang)
		{
			this.current_file_to_use			=	this.ram_code_lang					
			this.current_file_to_use_source		=	this.ssd_code_lang					
		}
				
		creff.create_folder_filename(this.current_file_to_use)		

		// this.p('an42_copy ' + this.type + ' S : ' + this.current_file_to_use_source  + ' D: '+ this.current_file_to_use)
		cff.copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)					
	}

	only_save_code_to_ssd()
	{
		this.m			=	'only_save_code_to_ram'										
		this.n			=	'an42_only_save_code::'

		// this.p('Generating_folder_SSD : ' +  strlen(this.code)  + '  ' + this.ssd_code_path)		

		if (!empty(this.code) )
		{

			this.current_file_to_use		=	this.ssd_code_path							
			
			if (this.b.site_lang)
				this.current_file_to_use		=	this.ssd_code_lang						
			
			
			creff.create_folder_filename(this.current_file_to_use)											
	
			scpf.save_code_to_file(	this.current_file_to_use										, 
								this.code													)
		}
	}

	// --------------------------- ONLY_SAVE_ASCII_CODE_TO_SSD --------------------------- 
	only_save_ascii_code_to_ssd()
	{
		this.m			=	'only_save_code_to_ram'											
		this.n			=	'an42_only_save_code::'

		this.current_file_to_use			=	this.ssd_code_path							

		// this.p('CODE_TO_SSD '+ this.ssd_code_path )
		
		if (this.b.site_lang)
			this.current_file_to_use		=	this.ssd_code_lang							
		
		creff.create_folder_filename(this.current_file_to_use)												


		if (!empty(this.code) )
		{

			// var DOMParser = dom.DOMParser

			// var parser = new DOMParser()
			// var doc = parser.parseFromString(this.code)


			// var XMLSerializer = dom.XMLSerializer;
			// var serializer = new XMLSerializer();

			// Remove Xml header		
			// let ascii_code = serializer.serializeToString(doc)  

			
			// this.p('Ascii_len ' + strlen(ascii_code) )									 

			// this.p('Before_to_save_ssd ' + this.current_file_to_use)								
			
			let ascii_code = this.code
				
			scpf.save_code_to_file(	this.current_file_to_use										, 
									ascii_code													)
							
		}
	}

	// --------------------------- ONLY_SAVE_ALIAS_CODE_TO_RAM --------------------------- 

	only_save_alias_code_to_ram()
	{
		this.m			=	'only_save_alias_code_to_ram'									
		this.n			=	'an42_only_save_code::'

		this.current_file_to_use				=	this.ram_alias_code_path					
		this.current_file_to_use_source			=	this.ssd_alias_code_path					
		
		if (this.b.site_lang)
		{
			this.current_file_to_use			=	this.ram_alias_code_lang					
			this.current_file_to_use_source		=	this.ssd_alias_code_lang					
		}

		creff.create_folder_filename(this.current_file_to_use)												

		// this.p('an42_acram ' + this.type + ' S : ' + this.current_file_to_use_source  + ' D: '+ this.current_file_to_use)
	
		cff.copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)		
	}

	  
}

exports.anode_only_save_code = anode_only_save_code