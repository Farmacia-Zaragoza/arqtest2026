// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Code Class  [V.0.2.1]  (2017-09-21)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 15]
// *anode_update_common_url > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-save_code_general- 					: 	PENDIENTE
// - d-dont_exist_and_get_code- 			: 	Save node properties - drupal mode
// - d-dont_exist_and_get_ram_code- 		: 	Save node properties - drupal mode
// - d-dont_exist_and_get_disk_code- 		: 	Save node properties - drupal mode
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_down } 		= require(	cons.JS_BASE + 'com/objects/drupal/anode/an6/an69_down.es6'							),
		scpf 				= require( 	cons.JS_BASE + 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'	);


class anode_code extends anode_down {

	constructor()
	{            
		super()				    		
		this.n						= 'an68_code::'
	}

	save_code_general()
	{
		// 3. Creamos la carpeta donde guardar el fichero

		/// this.save_code_common()									

		// 6. Linking - PENDIENTE
			// Esta parte solo la va a hacer si se ha producido drupal bootstrap
		
		link_full_filename(	this.ram_code_path			, this.ram_alias_code_path			)
		link_full_filename(	this.ssd_code_path			, this.ssd_alias_code_path			)
	}									

	dont_exist_and_get_code()
	{
		return this.dont_exist_and_get_ram_code() 
	}

	// Comprueba si exite. En este caso no hay que hacer nada
	// Si no existe devuelve true para que se recupere
	// ------------------------- DONT_EXIST_AND_GET_RAM_CODE ------------------------------
	// CALL FROM - an04
	dont_exist_and_get_ram_code()
	{
		this.m						=	'dont_exist_and_get_ram_code'
		this.n						= 'an68_code::'

		// Por defecto hay que generar el codigo y el estado es no generado

		let needed_to_generate_code 	= true															
	  	this.loaded 					= 'no_generated'										
	 	this.b.type_generated			= false													


		// /mnt/ram/brqx/base/react/zcommon/apps/cache/nsu/node.dbrqx.com/nouser/truck/page/human/a/simple_front_page_es.sslpage
		// this.p('CHECKING-CODE_EXIST-review ------------------------- ' )

		// true == Existe fichero -- No hay que generarlo
		
		// Si existe el codigo debe obtenerlo sino hay que generarlo si o si
        if ( this.arr['nfo']['generate_or_reload_code_ram'])
		{
			// this.p('CODE_EXIST-RAM ' + this.ram_alias_code_path )

			this.current_file_to_use		=	this.ram_alias_code_path					
			
			if (this.b.site_lang)
				this.current_file_to_use		=	this.ram_alias_code_lang					

			this.p('an68_File ' + this.current_file_to_use)
			
			
			this.code  = scpf.get_file_code(this.current_file_to_use)
			// 1. Si no hay que generarlo lo obtenemos Existe el codigo
   		 	// this.code = file_get_contents(this.current_file_to_use, true ) // READ_FILE
   		 	// Y si el codigo generado es insuficiente pare ser un archivo
   		 	
   		 	// this.p('Check_Code_len: ' + strlen(this.code))		

		 	this.b.type_generated	=	true													
	  		this.loaded 				= 'generated'
		}
		else if  ( 	this.arr['nfo']['generate_or_reload_code_ssd'])
		{
			// 2. Hay que regenerarlo o no existe en ram y si en SSD

			this.current_file_to_use		=	this.ssd_alias_code_path					

			// this.p('CODE_EXIST-ssd ' + this.current_file_to_use )
			
			if (this.b.site_lang)
				this.current_file_to_use		=	this.ssd_alias_code_lang					
			
			this.code = scpf.get_file_code(this.current_file_to_use) // READ_FILE 

   		 	this.loaded 				= 'generated'
		 	this.b.type_generated	=	true													
			
			this.only_save_code_to_ram()  
		}
		else if  ( 	this.arr['nfo']['generate_or_reload_code_disk'])
		{
			// 3. Hay que generarlo o no existe ni en SSD ni en RAM

			// this.p('CODE_EXIST-DISK ' + this.current_file_to_use )

			this.current_file_to_use		=	this.load_from_disk_path_code					
			
			if (this.b.site_lang)
				this.current_file_to_use		=	this.load_from_disk_lang_code
			
   		 	this.code = scpf.get_file_code(this.current_file_to_use) // READ_FILE 

   		 	// this.p('Check_Code_dislen: ' + strlen(this.code))		
   		 	
   		 	this.loaded 				= 'generated'
		 	this.b.type_generated	=	true													

			this.only_save_code_to_ssd()  

			this.only_save_code_to_ram()  

		}
		else
		{
			// No existe ningun codigo

			// this.p('NO_CODE_EXIST ' )

				// this.pt('Generat_code_cache_test ' + false + ' == ' + this.arr['nfo']['generate_or_reload_code_disk'] )	
						 
			 	this.b.type_generated		=	false													
			  	this.loaded 				= 'no_generated'
				needed_to_generate_code 	= true																	
		}

		return ( needed_to_generate_code )    		  
	}   		  

	// ------------------------------- DONT_EXIST_AND_GET_SSD_CODE ------------------------------- 
	dont_exist_and_get_ssd_code()
	{
		this.m						=	'dont_exist_and_get_ssd_code'
		this.n						= 	'an68_code::'

		// true == Existe fichero -- No hay que generarlo

        if ( this.arr['nfo']['generate_or_reload_code_ssd'])
		{
			this.current_file_to_use		=	this.ssd_code_path					
			
			if (this.b.site_lang)
				this.current_file_to_use		=	this.ssd_code_lang


   		 	this.code = scpf.get_file_code(this.current_file_to_use) // READ_FILE 
   		  	this.loaded 				= 'generated'
			this.b.type_generated	=	true													
			return false																	
   		}
	  	this.loaded 					= 'no_generated'
		this.b.type_generated		=	false													
	  	//		return (true and this.b.site_cache ) 										    		  
		return true     		  
	}   		  

	// ------------------------------- DONT_EXIST_AND_GET_DISK_CODE ------------------------------- 
	dont_exist_and_get_disk_code()
	{
		this.m					=	'dont_exist_and_get_disk_code'
		this.n						= 	'an68_code::'

		// true == Existe fichero -- No hay que generarlo

		if ( this.arr['nfo']['generate_or_reload_code_disk'])
		{
			this.current_file_to_use		=	this.load_from_disk_path_code			
			
			if (this.b.site_lang)
				this.current_file_to_use		=	this.load_from_disk_lang_code


   		 	this.code = scpf.get_file_code(this.current_file_to_use) // READ_FILE 

   		 	// this.p('Check_Code_dislenGG : ' + strlen(this.code))		

			// La idea es que loaded desaparezca   		 	
   		 	this.loaded 				= 'generated'
			this.b.type_generated	=	true													

			return false																	
   		}
	  	this.loaded 					= 'no_generated'
		this.b.type_generated		=	false													

	  	//		return (true and this.b.site_cache ) 										    		  
		return true     		  

	}   		  
}

exports.anode_code = anode_code