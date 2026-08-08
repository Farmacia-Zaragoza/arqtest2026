// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Is Needed To Reload Class  [V.0.1.1]  (2017-03-29)
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
// - d-is_reload_type-					: 	Check if is reload type
// - d-is_not_reload_type-				: 	Check if is reload type
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_special_reload_type } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an2/an25_special_reload_type.es6'));
	in_array 							= require(	'/brqx/base/react/zcommon/node_modules/in_array'										);

class anode_is_reload_type extends anode_special_reload_type {
            
	constructor()
	{
		super()
		this.n	=	'anode_is_reload_type::'											
	}


	is_reload_type(type = 'ram')
	{
		let value = in_array(this.short_type, this.c.arr[type]) 
		// this.p('CHECK_RELOD ' + this.short_type + '  ' + type +  ' ' + VALUE) 
		return value	
	}

	is_reload_type_ram() 				{ 	return this.is_reload_type('ram')		 			}	
	is_reload_type_ssd() 				{ 	return this.is_reload_type('ssd')		 			}	
	is_reload_type_disk() 				{ 	return this.is_reload_type('dis')		 			}	
	is_reload_type_code() 				{ 	return this.is_reload_type('cod')		 			}	

	is_not_reload_type_disk() 			{	return !this.is_reload_type_disk() 			}
	is_not_reload_type_ram() 			{	return !this.is_reload_type_ram() 			}
	is_not_reload_type_ssd() 			{	return !this.is_reload_type_ssd() 			}
	is_not_reload_type_code() 			{	return !this.is_reload_type_code() 			}

	  
}

exports.anode_is_reload_type = anode_is_reload_type