// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Check Only If Sync Class  [V.0.1.1]  (2017-04-07)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 06]
// *anode_exist_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-check_only_if_sync_code_disk-		:   Save properties to disk for disk loadding
// - d-check_only_if_sync_properties_disk-		:	Only check if exist properties
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_check_only_if_exist_properties } 		= require(	cons.JS_BASE + 'com/objects/drupal/anode/an3/an32_check_only_if_exist_properties.es6'		)

class anode_check_only_if_sync extends anode_check_only_if_exist_properties {
            
    constructor()
    {        
		super()
		this.n	=	'anode_check_only_if_sync::'											
	}											


	check_only_if_sync_code_disk()
	{
		this.m 		= 'check_only_if_sync_code_disk'							

		// this.parr(this.u.arr['dis'])											

		// esta parte no la tengo clara
		to_sync = ( (in_array('SYNC', this.c.arr['dis']) )  && 
				     (	 this.node_have_rsync				) )	

		return to_sync  
	}

	check_only_if_sync_properties_disk()
	{
		this.m 		= 'check_only_if_sync_properties_disk'							

		to_sync = ( (in_array('SYNC', this.c.arr['dis']) )  && 
				     (	 this.node_have_rsync				) )	

		return to_sync  
	
	}

	  
}

exports.anode_check_only_if_sync = anode_check_only_if_sync