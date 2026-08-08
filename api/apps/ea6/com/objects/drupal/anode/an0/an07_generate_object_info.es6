// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Generate Object Info Class  [V.0.3.1]  (2017-04-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 01]
// *anode_run_from_drupal > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-anode_generate_object_info-				: Build object where method is drupal
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_load_properties_file } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an08_load_properties_file.es6'))

class anode_generate_object_info extends anode_load_properties_file {

	constructor()
	{
	
        super()
		this.n	=	'anode_generate_object_info::'											
    }
            

	generate_object_info()
	{
		this.m				=	'generate_object_info'					

		// this.p('Object_info ' + this.type + '  '  + this.short_type)			

		// 1. Exist code and properties files ssd - ram

		this.arr['nfo']['exist_ram_code'] 				= 	true				
		this.arr['nfo']['exist_ssd_code'] 				= 	true				
		this.arr['nfo']['exist_disk_code']				= 	true				

		this.arr['nfo']['exist_ram_properties'] 			= 	true				
		this.arr['nfo']['exist_ssd_properties'] 			= 	true				
		this.arr['nfo']['exist_disk_properties']			= 	true				
		
		
		this.arr['nfo']['generate_ram_code'] 				= 	true				
		this.arr['nfo']['generate_ssd_code'] 				= 	true				
		this.arr['nfo']['generate_disk_code']				= 	true				

		this.arr['nfo']['generate_ram_properties'] 		= 	true				
		this.arr['nfo']['generate_ssd_properties'] 		= 	true				
		this.arr['nfo']['generate_disk_properties']		= 	true				

		this.arr['nfo']['sync_disk_code']					=   false 				
		this.arr['nfo']['sync_disk_properties']			=   false 				

		this.arr['nfo']['reload_ram_code'] 				=   false 				
		this.arr['nfo']['reload_ssd_code'] 				=   false 				 
		this.arr['nfo']['reload_disk_code'] 				=   false 				 

		// true == No hay que generar

		this.arr['nfo']['reload_ram'] 		= 
			this.check_only_if_is_needed_to_reload_type_ram()						 
			
		this.arr['nfo']['reload_ssd'] 		= 
			this.check_only_if_is_needed_to_reload_type_ssd()						

		this.arr['nfo']['reload_disk'] 		= 
			this.check_only_if_is_needed_to_reload_type_disk()					 
		
		
		if (this.b.type_have_code)
		{
			// SOLO MIRA SI EXISTE

			// true == Existe fichero -- No hay que generarlo
			this.arr['nfo']['exist_ram_code'] 	= 
				this.check_only_if_exist_code_ram()						

			this.arr['nfo']['exist_ssd_code'] 	= 
				this.check_only_if_exist_code_ssd()						

			this.arr['nfo']['exist_disk_code'] 	= 
				this.check_only_if_exist_code_disk()						

			// entrara si el tipo posee sincronismo y el sincronismo esta habilitado
			if (this.b.site_sync && this.b.type_synced)
				this.arr['nfo']['sync_disk_code'] 	= 
					this.check_only_if_sync_code_disk()						

			// this.p('Sync ' + this.type + ' ' + this.arr['nfo']['sync_disk_code']  + ' - ' + true )	

			this.arr['nfo']['reload_ram_code'] 		= 
				this.check_only_if_is_needed_to_reload_code_ram()					 
	
			this.arr['nfo']['reload_ssd_code'] 		= 
				this.check_only_if_is_needed_to_reload_code_ssd()					 
	
			this.arr['nfo']['reload_disk_code'] 		= 
				this.check_only_if_is_needed_to_reload_code_disk()					 
			
		} 

		if (this.b.type_have_properties)
		{
			// SOLO MIRA SI EXISTE
		
			// true == Existe fichero -- No hay que generarlo
			this.arr['nfo']['exist_ram_properties'] 	= 
				this.check_only_if_exist_properties_ram()					
				
			this.arr['nfo']['exist_ssd_properties'] 	= 
				this.check_only_if_exist_properties_ssd()					

			this.arr['nfo']['exist_disk_properties'] 	= 				
				this.check_only_if_exist_properties_disk()				

			// entrara si el tipo posee sincronismo
			if (this.b.site_sync && this.b.type_synced)
				this.arr['nfo']['sync_disk_properties'] 	= 
					this.check_only_if_sync_properties_disk()						

		} 

		let info_line = this.type + '  '  + this.short_type	 
		info_line += 'R:' + this.arr['nfo']['exist_ram_code'] + ' '			
		info_line += ':S:' + this.arr['nfo']['exist_ssd_code'] + ' '			
		info_line += ':D:' + this.arr['nfo']['exist_disk_code'] + ' '			
		info_line += ' - R:' + this.arr['nfo']['exist_ram_properties'] + ' '			
		info_line += ':S:' + this.arr['nfo']['exist_ssd_properties'] + ' '			
		info_line += ':D:' + this.arr['nfo']['exist_disk_properties'] + ' '			

		// Disk
		info_line = this.type + '  '  + this.short_type	 
		info_line += 'R:' + this.arr['nfo']['reload_disk'] + ' '			
		info_line += ':D:' + this.arr['nfo']['exist_disk_properties'] + ' '			

		// this.p('Object_info ' + info_line ) 								 

		// Generate or Reload Code
		// true == Existe fichero -- No hay que generarlo
		// true == No hay que generar
		
		this.arr['nfo']['generate_or_reload_code_ram'] 	= 	
			(
			(	this.arr['nfo']['reload_ram'] 				) 	&&
			(	this.arr['nfo']['reload_ram_code']			) 	&&
			(	this.arr['nfo']['exist_ram_code'] 			) 						
			)																				

		this.arr['nfo']['generate_or_reload_code_ssd'] 	= 
			(
			(	this.arr['nfo']['reload_ssd'] 				)	&&
			(	this.arr['nfo']['reload_ssd_code'] 			) 	&&
			(	this.arr['nfo']['exist_ssd_code'] 			)						
			)																				

		this.arr['nfo']['generate_or_reload_code_disk'] 	= 
			(
			(	this.arr['nfo']['reload_disk'] 				)	&&
			(	this.arr['nfo']['reload_disk_code']			)	&&
			(	this.arr['nfo']['exist_disk_code'] 			)							
			)																			

		// Generate or reload Properties
		this.arr['nfo']['generate_or_reload_properties_ram'] 	=
			( 
			(	this.arr['nfo']['reload_ram'] 				) 	&&
			(	this.arr['nfo']['exist_ram_properties'] 	)						
			)																			

		this.arr['nfo']['generate_or_reload_properties_ssd'] 	= 
			(
			(	this.arr['nfo']['reload_ssd'] 				)	&&
			(	this.arr['nfo']['exist_ssd_properties'] 	)						
			)																			

		// En propiedades de disco no tiene sentido generar
		this.arr['nfo']['generate_or_reload_properties_disk'] 	= 
			(
			(	this.arr['nfo']['reload_disk'] 				)	&&
			(	this.arr['nfo']['exist_disk_properties'] 	)						
			)																			

		// true == Existe fichero -- No hay que generarlo
		// Si genera ram no genera los demas por tanto al menos los ficheros deben existir

		// Generate RAM Properties
		// true == Existe fichero -- No hay que generarlo
		// true == No hay que generar
		
		this.arr['nfo']['generate_ram_properties'] 	= 					
			(
			(	this.arr['nfo']['reload_ram'] 				) 	&&
			(	this.arr['nfo']['exist_ram_properties'] 	)	&&					
			(	this.arr['nfo']['exist_ssd_properties'] 	)	&&					
			(	this.arr['nfo']['exist_disk_properties'] 	)						
			)																			

		// Generate SSD Properties
		// Asumimos que siempre que se genera disk se genera ssd y vice
		this.arr['nfo']['generate_ssd_properties'] 	= 
			(
			(	this.arr['nfo']['reload_ssd'] 				)	&&
			(	this.arr['nfo']['reload_disk'] 				) 	&&
			(	this.arr['nfo']['exist_ssd_properties'] 	)	&&					
			(	this.arr['nfo']['exist_disk_properties'] 	)						
			)																			

		// this.p('Typ- ' + this.short_type + this.arr['nfo']['generate_ssd_properties'] + ' R- ' + this.arr['nfo']['reload_ssd'] + ' P- '  + this.arr['nfo']['exist_ssd_properties'] )

		// Generate DISK Properties
		// true == Existe fichero -- No hay que generarlo
		
		// No se puede reload disk a nivel de properties. O existe o no
		// SI ES HUMANO NUNCA HAY QUE GENERAR

				
		this.arr['nfo']['generate_disk_properties'] 	= 
			(
			(
			(	this.arr['nfo']['reload_disk'] 					)	&&
			(	this.arr['nfo']['exist_disk_properties'] 		)
			)
			||	this.b.type_human						
			)																			

		// this.p('Typ ' + this.short_type + this.arr['nfo']['generate_disk_properties'] + ' R ' + this.arr['nfo']['reload_disk'] + ' P '  + this.arr['nfo']['exist_disk_properties'] )

		// Generate RAM Code
		this.arr['nfo']['generate_ram_code'] 	= 					
			(
			(	this.arr['nfo']['reload_ram'] 				) 	&&
			(	this.arr['nfo']['exist_ram_code'] 			) 	&&
			(	this.arr['nfo']['exist_ssd_code'] 			)	&&
			(	this.arr['nfo']['exist_disk_code'] 		)	
			)																			

		// Generate SSD Code
		this.arr['nfo']['generate_ssd_code'] 	= 
			(
			(	this.arr['nfo']['reload_ssd'] 				)	&&
			(	this.arr['nfo']['reload_disk'] 				) 	&&
			(	this.arr['nfo']['exist_ssd_code'] 			)	&&
			(	this.arr['nfo']['exist_disk_code'] 		)	
			)																			

		// Generate DISK Code
		this.arr['nfo']['generate_disk_code'] 	= 
			(
			(	this.arr['nfo']['reload_disk'] 				)	&&
			(	this.arr['nfo']['exist_disk_code']			)	
			)																			
				

		// true == Existe fichero -- No hay que generarlo

		// Geenerate Code or Properties
		this.arr['nfo']['generate_ram'] 	= 					
			(
			(	this.b.site_cache			 				)	&&
			(	this.arr['nfo']['reload_ram'] 				) 	&&
			(	this.arr['nfo']['exist_ram_code'] 			) 	&&
			(	this.arr['nfo']['exist_ram_properties'] 		)	&&					
			(	this.arr['nfo']['exist_ssd_code'] 			)	&&
			(	this.arr['nfo']['exist_ssd_properties'] 	)	&&					
			(	this.arr['nfo']['exist_disk_code'] 		)		&&
			(	this.arr['nfo']['exist_disk_properties'] 	)						
			)																			

		this.arr['nfo']['generate_ssd'] 	= 
			(
			(	this.b.site_cache			 				)	&&
			(	this.arr['nfo']['reload_ssd'] 				)	&&
			(	this.arr['nfo']['reload_disk'] 				) 	&&
			(	this.arr['nfo']['exist_ssd_code'] 			)	&&
			(	this.arr['nfo']['exist_ssd_properties'] 	)	&&					
			(	this.arr['nfo']['exist_disk_code'] 			)	&&
			(	this.arr['nfo']['exist_disk_properties'] 	)						
			)																			

		this.arr['nfo']['generate_disk'] 	= 
			(
			(	this.b.site_cache			 				)	&&
			(	this.arr['nfo']['reload_disk'] 				)	&&
			(	this.arr['nfo']['exist_disk_code']			)	&&
			(	this.arr['nfo']['exist_disk_properties'] 		)						
			)																			

		// this.p('DISK_CACHE : ' + this.b.site_cache  +  '+ True :' + true + '+ False:' + false  )
		// this.p('GENERATE_DISK : ' + this.arr['nfo']['generate_disk'] )

		info_line = this.type + '  '  + this.short_type	 
		info_line += 'R:' + this.arr['nfo']['generate_ram'] + ' '			
		info_line += ':S:' + this.arr['nfo']['generate_ssd'] + ' '			
		info_line += ':D:' + this.arr['nfo']['generate_disk'] + ' '			

		// this.p('Object_INFO ' + info_line ) 								 


		// true == Existe fichero -- No hay que generarlo
		// false == No usamos cache - Siempre generamos
			
		this.arr['nfo']['generate'] 	=
			( 
			(this.arr['nfo']['generate_ram'] 					)	&&
			(this.arr['nfo']['generate_disk']					)	&&
			(this.arr['nfo']['generate_ssd'] 					)						
			)																				
	}
	  
}

exports.anode_generate_object_info = anode_generate_object_info