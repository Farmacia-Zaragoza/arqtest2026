// [DOCHANGED_ES6]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Common Anon Class  [V.0.1.2]  (2017-08-14)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 10]
// *anode_common_anon > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_paths_anon_for_common_types- 					: Update path for nodes before to run drupal bootstrap 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_common_nouser } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an5/an55_common_nouser.es6'))

class anode_common_anon extends anode_common_nouser {

	constructor()
	{
		super()
		this.n						= 'anode_common_anon::'
	}				    		
            

   	update_paths_anon_for_common_types()
	{
		this.m 		= 	'update_paths_anon_for_common_types'									

		// All must be aliases

		this.managing_code_type( 		this.u.ssd_alias_path_anon, this.suffix		)		
		this.ssd_alias_path			= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_path_anon, this.suffix		)		
		this.ram_alias_path			= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_path_anon, this.suffix_lang		)		
		this.ssd_alias_lang			= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_path_anon, this.suffix_lang		)		
		this.ram_alias_lang			= 	this.current_result		

		// Code

		// this.p('Before_change ' + this.type + ' ' + this.u.ram_alias_path_anon + ' Suff ' +  this.suffix_code)				
		
		this.managing_code_type( 		this.u.ssd_alias_path_anon, this.suffix_code		)		
		this.ssd_alias_code_path	= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_path_anon, this.suffix_code		)		
		this.ram_alias_code_path	= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_path_anon, this.suffix_code		)		
		this.ssd_alias_code_lang	= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_path_anon, this.suffix_code		)		
		this.ram_alias_code_lang	= 	this.current_result		

		// this.p('After_change ' + this.ram_alias_code_path + ' Suff ' +  this.suffix_code)				

		// Img

		this.managing_code_type( 		this.u.ssd_alias_path_anon, this.suffix		)		
		this.ssd_alias_img_path		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_path_anon, this.suffix		)		
		this.ram_alias_img_path		= 	this.current_result		

				
		// this.p('Json_File : '. this.ram_alias_json_path)
		
		this.update_urls_anon_for_common_types()																	
		
		// En tipos comunes los paths son iguales
		this.update_paths_for_common_types_after_bootstrap()														
		
		this.update_urls_for_common_types_after_bootstrap()														
	}

}

exports.anode_common_anon = anode_common_anon