// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Node Js - Anode Is Needed To Reload Class  [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6-COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 05]
// *anode_is_needed_to_reload > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-special_reload_ram-				:	Check special reload for current type
// - d-special_reload_ssd-				:	Check special reload for current type
// - d-special_reload_disk-				:	Check special reload for current type
// - d-special_reload_code-				:	Check special reload for current type
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_if_is_correct_sync } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an3/an30_if_is_correct_rsync.es6')		)

class anode_special_reload_type extends anode_if_is_correct_sync {
            
	constructor()
	{
		super()
		this.n	=	'anode_special_reload_type::'											
	}


	special_reload_ram(arg = 'I') 		
	{
		if (typeof this.c.arr['ram'] !== 'undefined') 
			return (arg in this.c.arr['ram']) || (this.u.url_method == "reload")
		return false  	
	}	
	special_not_reload_ram(arg = 'I') 	{
			return !this.special_reload_ram(arg) 		
	} 

	special_reload_ssd(arg = 'I') 		{
		if (typeof this.c.arr['ssd'] !== 'undefined') 
			return (arg in  this.c.arr['ssd'])	|| (this.u.url_method == "reload_ssd")
		return false  	
	}	
	special_not_reload_ssd(arg = 'I') 	{
			return !this.special_reload_ssd(arg) 		
	} 

	special_reload_disk(arg = 'I') 	{
		if (typeof this.c.arr['dis'] !== 'undefined') 
			return (arg in this.c.arr['dis'])	 || (this.u.url_method == "reload_ssd")
		return false  	
	}	
	special_not_reload_disk(arg = 'I') {
			return !this.special_reload_dis(arg) 		
	} 

	special_reload_code(arg = 'I') 	{
		if (typeof this.c.arr['cod'] !== 'undefined') 
			return arg in this.c.arr['cod']	
		return false  	
	}	
	special_not_reload_code(arg = 'I') {
			return !this.special_reload_code(arg) 		
	} 
	  
}

exports.anode_special_reload_type = anode_special_reload_type