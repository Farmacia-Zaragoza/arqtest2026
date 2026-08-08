// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Common Auth Class  [V.0.1.1]  (2017-01-10)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 09]
// *anode_common_auth > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_paths_auth_for_common_types-  : Update path for nodes after to run drupal bootstrap
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_common_anon } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an5/an54_common_anon.es6'))


class anode_common_auth extends anode_common_anon {

	constructor()
	{
		super()	
		this.n						=	'anode_common_auth::'
	}
		
   	update_paths_auth_for_common_types()
	{
		this.m 		= 	'update_paths_auth_for_common_types'									

		this.managing_code_type( this.ssd_alias_path, this.u.ssd_alias_path_auth, ''		)		
		this.managing_code_type( this.ram_alias_path, this.u.ram_alias_path_auth, ''		)		

		this.managing_code_type( this.ssd_alias_lang, this.u.ssd_alias_path_auth, ''		)		
		this.managing_code_type( this.ram_alias_lang, this.u.ram_alias_path_auth, ''		)		

		// Code
		this.managing_code_type( this.ssd_alias_code_path, this.u.ssd_alias_code_path_auth, this.suffix_code		)		
		this.managing_code_type( this.ram_alias_code_path, this.u.ram_alias_code_path_auth, this.suffix_code		)		

		this.managing_code_type( this.ssd_alias_code_lang, this.u.ssd_alias_code_path_auth, this.suffix_code		)		
		this.managing_code_type( this.ram_alias_code_lang, this.u.ram_alias_code_path_auth, this.suffix_code		)		

		this.managing_code_type( this.ssd_alias_img_path, this.u.ssd_alias_img_path_auth, ''		)		
		this.managing_code_type( this.ram_alias_img_path, this.u.ram_alias_img_path_auth, ''		)		

		
		this.update_paths_for_common_types_after_bootstrap()

		this.update_urls_auth_for_common_types()  
				
	}

}

exports.anode_common_auth = anode_common_auth
