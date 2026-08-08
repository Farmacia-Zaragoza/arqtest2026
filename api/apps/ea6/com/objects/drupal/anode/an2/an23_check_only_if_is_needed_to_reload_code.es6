// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Check Only If Is Needed To Reload Code Class  [V.0.1.1]  (2017-03-29)
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
// - d-check_only_if_is_needed_to_reload_code_ram-	: 	Check reload and reload_type
// - d-check_only_if_is_needed_to_reload_code_ssd-	: 	Check reload and reload_type
// - d-check_only_if_is_needed_to_reload_code_disk-	: 	Check reload and reload_type
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_is_reload_type } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an2/an24_is_reload_type.es6'))

class anode_check_only_if_is_needed_to_reload_code extends anode_is_reload_type {
            
	constructor()
	{
		super()
		this.n	=	'check_only_if_is_needed_to_reload_code::'											
	}

	check_only_if_is_needed_to_reload_code_ram()
	{
		this.m 		= 'check_only_if_is_needed_to_reload_type_ram'							
		
		// true - No hayq que generar
		if ( 
  		   ( this.c.ram			     	== 'reload'					) ||
           ( this.is_reload_code()								)	
		   ) 
			{
				// this.p('Rreload_ram  ' + this.type +  '  ' + this.short_type)								
				// Recover an array
				return false														
			}	
		return (true && this.b.site_cache 	)												 		
	}


	check_only_if_is_needed_to_reload_code_ssd()
	{
		this.m 		= 'check_only_if_is_needed_to_reload_type_ssd'							
		
		if ( 
  		   ( this.c.ssd			 	== 'reload'					) ||
           ( this.is_reload_code()								)	
		   ) 
			{
				// this.p('Rreload_ram')										
				// Recover an array
				return false														
			}	
		return ( true && this.b.site_cache 	)													 		
	}

	check_only_if_is_needed_to_reload_code_disk()
	{
		this.m 		= 'check_only_if_is_needed_to_reload_type_disk'							
		
        if ( 
			( this.c.disk 	== 'reload'								) ||
        	( this.is_reload_code()									)	
		   ) 

			{
				// this.p('Rreload_disk')										
				// Recover an array
				return false														
			}	
		return ( true && this.b.site_cache 	) 													 		
	}


	is_reload_code(type = 'cod')
	{
		let VALUE = this.short_type in this.c.arr[type] 
		// this.p('CHECK_RELOD ' + this.short_type + '  ' + type +  ' ' + VALUE) 
		return VALUE	
	}

	  
}

exports.anode_check_only_if_is_needed_to_reload_code = anode_check_only_if_is_needed_to_reload_code