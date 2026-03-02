// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Node Js - Anode Run From Disk Class  [V.0.0.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 01]
// *anode_run_from_disk > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_run_from_disk-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-run_from_disk-				: Build object where method is not drupal
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_get_current_properties_disk } 		= require(	cons.JS_BASE + 'com/objects/drupal/anode/an0/an05_get_current_properties_disk.es6'		)

class anode_run_from_disk extends anode_get_current_properties_disk {

	constructor()
	{
        super()
		this.n							=	'an04_run_from_disk::'											
    }

	// --------------------------------- RUN_FROM_DISK ---------------------------------             
	run_from_disk()
	{
		this.m							=	'run_from_disk'							
		this.n							=	'an04_run_from_disk::'											
		
		// this.p('Running ' + this.type)
		
		// 1.Crea las rutas para la consulta
		this.check_common_and_create_paths()					
		// File : an01_anode.obj

		// 2. Si existe el fichero recupera las propiedades ( methodo del hijo )
		//    Si no existe lo genera

		// Revisa si existen los ficheros o si hay que recargar
		this.generate_object_info() 												 
	
		// true 1 - false 0 		
		
		// this.p('Before_RAM_CODE ' + this.arr['nfo']['generate_ram_code'] )							
		// this.p('Before_SSD_CODE ' + this.arr['nfo']['generate_ssd_code'] )							
		// this.p('Before_DISK_CODE ' + this.arr['nfo']['generate_disk_code'] )							

		// Si hay codigo sale exitoso. Sino entra

		let we_dont_have_code_ready_to_use = true  


		// 1. Intentamos obtener el codigo si no han dicho reload
		if (this.b.type_have_code)
		{ 
			//this.p('TYPE_HAVE_CODE ' + this.type)

			we_dont_have_code_ready_to_use = this.dont_exist_and_get_ram_code()  				
		}


		if (we_dont_have_code_ready_to_use		)
		{
			// this.p('002_After_check_code ' + this.type + '  '   +	this.short_type + '  ' +  this.code.length )						

			// Might to have get it or generate
			// Tenemos que cambiar el algoritmo pues el codigo sigue vacio porque encuentra las propiedades no llama a save_disk

			
			this.if_is_correct_get_ram_properties()  
			// Call RAM - SSD - DISK - SAVE ( get_current_properties_disk... )

			// this.p('Abc_GET_RAM_PROPERTIES')	
			
		}	
		// this.p('END_RUN_FROM_DISK')
		
	
	} // end Method
	  
} // End Class

exports.anode_run_from_disk = anode_run_from_disk