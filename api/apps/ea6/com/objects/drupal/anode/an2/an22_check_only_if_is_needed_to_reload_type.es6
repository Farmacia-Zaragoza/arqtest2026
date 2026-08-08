// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Check Only If Is Needed To Reload Type  Class  [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 05]
// *anode_is_needed_to_reload > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-check_only_if_is_needed_to_reload_type_ram-	: 	Check reload && reload_type
// - d-check_only_if_is_needed_to_reload_type_ssd-	: 	Check reload && reload_type
// - d-check_only_if_is_needed_to_reload_type_disk-	: 	Check reload && reload_type
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_check_only_if_is_needed_to_reload_code } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an2/an23_check_only_if_is_needed_to_reload_code.es6'))


class anode_check_only_if_is_needed_to_reload_type extends anode_check_only_if_is_needed_to_reload_code {
            
	constructor()
	{
		super()
		this.n	=	'check_only_if_is_needed_to_reload_type::'											
	}

	check_only_if_is_needed_to_reload_type_ram()
	{
		this.m 		= 'check_only_if_is_needed_to_reload_type_ram'							
		
		// true - No hayq que generar
		if ( 
  		   ( this.c.ram			     	== 'reload'					) ||
//		   ( this.u.url_method 			== 'reload'	 				) ||
           ( this.is_reload_type_ram()								)	
		   ) 
			{
				// this.pt('ckk_Rreload_ram  ' + this.short_type)								
				// Recover an array
				return false  														
			}	
		// Si no hay cache siempre habra que generar
		// Si la cache es false , siempre devolvera false
		
		// this.pt('check_if_needed_ram ' + false + " == " + this.b.site_cache)				
		
		return (true && this.b.site_cache 	)												 		
	}


	check_only_if_is_needed_to_reload_type_ssd()
	{
		this.m 		= 'check_only_if_is_needed_to_reload_type_ssd'							
		
		if ( 
  		   ( this.c.ssd 	== 'reload'					) ||
           ( this.is_reload_type_ssd()								)	
		   ) 
			{
				// this.p('Rreload_ram')										
				// Recover an array
				return false														
			}	
		return ( true && this.b.site_cache 	)													 		
	}

	check_only_if_is_needed_to_reload_type_disk()
	{
		this.m 		= 'check_only_if_is_needed_to_reload_type_disk'							

		// Esta parte no la tengo del todo clara
		// true == No hay que generar
		// Si es un tipo humano no hay que hacer reload. Si no hay que hacer reload de properties es true
        if ( 
			( !this.b.type_human										) &&
			(
			( this.c.disk 	== 'reload'								) ||
        	( this.is_reload_type_disk()									)
			)	
		   ) 

			{
				// this.p('false - Reload_disk_force ' + this.short_type)								
				// Recover an array
				return false														
			}	
		return ( true && this.b.site_cache 	) 													 		
	}
	  
}

exports.anode_check_only_if_is_needed_to_reload_type = anode_check_only_if_is_needed_to_reload_type
