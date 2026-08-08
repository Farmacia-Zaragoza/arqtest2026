// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Update Common After Bootstrap Class  [V.0.1.1]  (2017-09-22)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 14]
// *anode_update_common_after_bootstrap > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_urls_for_common_types_after_bootstrap-  	: Update url for nodes after to run drupal bootstrap
// - d-update_paths_for_common_types_after_bootstrap-		: Update paths
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const { anode_code } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an6/an68_code.es6')))

class anode_update_common_after_bootstrap extends anode_code {

	constructor()
	{
		super()
		this.n						= 'anode_update_common_after_bootstrap::'
	}				    		

   	update_urls_for_common_types_after_bootstrap()
	{
		// En tipos comunes no tienen sentido los aliases

		this.m					=	'update_urls_for_common_types_after_bootstrap'			
		
		//this.d('UpB U ' + this.u.ssd_url_anon  ) 							
		//this.d('UpB S ' + this.ssd_url  ) 									
		// .../anonymous/peloncita/fnode/node/linea_menu/human/u/common/common_76928
		// Code zone 

		this.ssd_code_url					=	this.ssd_alias_code_url 			 
		this.ram_code_url					=	this.ram_alias_code_url			

		// Pendiente de comprobar
		this.ssd_code_urlang				=	this.ssd_alias_code_urlang 			 
		this.ram_code_urlang				=	this.ram_alias_code_urlang			

		this.ssd_url						=	this.ssd_alias_url 					 
		this.ram_url						=	this.ram_alias_url				

		this.ssd_urlang						=	this.ssd_alias_urlang 					 
		this.ram_urlang						=	this.ram_alias_urlang				
		
	}

   	update_paths_for_common_types_after_bootstrap()
	{
		// En tipos comunes no tienen sentido los aliases
		this.m					=	'update_paths_for_common_types_after_bootstrap'			
		
		//this.d('UpB U ' + this.u.ssd_path_anon  ) 							
		//this.d('UpB S ' + this.ssd_path  ) 									
		// .../anonymous/peloncita/fnode/node/linea_menu/human/u/common/common_76928
		// Code zone 

		this.ssd_code_path				=	this.ssd_alias_code_path 			 
		this.ram_code_path				=	this.ram_alias_code_path			

		this.ssd_code_lang				=	this.ssd_alias_code_lang 			 
		this.ram_code_lang				=	this.ram_alias_code_lang			

		this.ssd_img_path					=	this.ssd_alias_img_path 				 
		this.ram_img_path					=	this.ram_alias_img_path			

		this.ssd_path						=	this.ssd_alias_path 					 
		this.ram_path						=	this.ram_alias_path				

		this.ssd_lang						=	this.ssd_alias_lang 					 
		this.ram_lang						=	this.ram_alias_lang				
		
	}

}

exports.anode_update_common_after_bootstrap = anode_update_common_after_bootstrap