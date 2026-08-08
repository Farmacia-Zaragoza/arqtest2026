// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Common Auth Class  [V.0.1.2]  (2017-08-14)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 13]
// *anode_update_common_url > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_urls_auth_for_common_types-  : Update url for nodes after to run drupal bootstrap
// - d-update_urls_anon_for_common_types-  : Update url for nodes before to run drupal bootstrap	
// - d-update_urls_nouser_for_common_types-  : Update url for nodes before to run drupal bootstrap	
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_update_common_after_bootstrap } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an5/an59_common_url_after_bootstrap.es6')))

class anode_update_common_url extends anode_update_common_after_bootstrap {

	constructor()
	{
		super()
		this.n						=	'anode_update_common_url::'	
	}
	
   	update_urls_nouser()
	{
		this.m					=	'update_urls_nouser'			
		// this.d('UpD ' ) 																														

		// Tenemos el caso de un nodo que se genera por url pero vamos a cargar multiples ids relacionados
		//  /ssd/home/ser/zd/main/es/zdom/emp/flat/zd_main_flat/es/cache/flat.dbrqx.com/anonymous/flat/page/human/a/front
		//this.p('U_SSD_ANON ' + this.u.ssd_alias_json_url_anon ) 																				
		//this.p('U_RAM_PAGE ' + this.u.ram_alias_url_anon ) 																				
		//this.p('U_RAM_CODE ' + this.u.ram_alias_code_url_anon ) 																				
		
		this.replace( 					this.u.ssd_alias_url_nouser				,	"/page/", this.change	)
		this.ssd_alias_url			=	this.result + this.suffix 

		this.replace(					this.u.ram_alias_url_nouser 			, 	"/page/", this.change	)  
		this.ram_alias_url			=	this.result + this.suffix 

		this.replace(					this.u.ssd_alias_url_nouser 			, 	"/page/", this.change	)  
		this.ssd_alias_urlang		=	this.result + this.suffix_lang 

		this.replace(	 				this.u.ram_alias_url_nouser	 			, 	"/page/", this.change	)  
		this.ram_alias_urlang		=	this.result + this.suffix_lang 

		this.replace( 					this.u.ssd_alias_url_nouser 		, 	"/page/", this.change	)  
		this.ssd_alias_code_url		=	this.result + this.suffix_code 

		this.replace(					this.u.ram_alias_url_nouser 		, 	"/page/", this.change	)  
		this.ram_alias_code_url		=	this.result + this.suffix_code 

		this.replace( 					this.u.ssd_alias_url_nouser 		, 	"/page/", this.change	)  
		this.ssd_alias_code_urlang	=	this.result + this.suffix_code 

		this.replace( 					this.u.ram_alias_url_nouser 		,	"/page/", this.change	)  
		this.ram_alias_code_urlang	=	this.result + this.suffix_code 

		this.replace( 					this.u.ssd_alias_url_nouser 		,	"/page/", this.change	)  
		this.ssd_alias_img_url		=	this.result + this.suffix 

		this.replace( 					this.u.ram_alias_url_nouser 		,	"/page/", this.change	) 
		this.ram_alias_img_url		=	this.result + this.suffix 

		if (this.b.drupal_bootstrap) this.update_urls_nouser_with_bootstrap()

	}
		
   	update_urls_anon_for_common_types()
	{
		// All must be aliases
		this.m					=	'update_urls_anon_for_common_types'			
		
		//this.p('U_SSD_ANON ' + this.u.ssd_alias_url_anon ) 																				
		//this.p('U_RAM_PAGE ' + this.u.ram_alias_url_anon ) 																				
		//this.p('U_RAM_CODE ' + this.u.ram_alias_code_url_anon ) 																				

	
		this.managing_code_type( 		this.u.ssd_alias_url_anon				, this.suffix				)
		this.ssd_alias_url			= 	this.current_result		
				
		this.managing_code_type( 		this.u.ram_alias_url_anon				, this.suffix				)		
		this.ram_alias_url			= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_url_anon				, this.suffix_lang			)		
		this.ssd_alias_urlang		= 	this.current_result		

		this.managing_code_type(  		this.u.ram_alias_url_anon				, this.suffix_lang			)		
		this.ram_alias_urlang		= 	this.current_result		

		// Code

		this.managing_code_type( 		this.u.ssd_alias_url_anon			, this.suffix_code			)		
		this.ssd_alias_code_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_anon			, this.suffix_code			)		
		this.ram_alias_code_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_url_anon			, this.suffix_code			)		
		this.ssd_alias_code_urlang	= 	this.current_result		

		this.managing_code_type(  		this.u.ram_alias_url_anon			, this.suffix_code			)		
		this.ram_alias_code_urlang	= 	this.current_result		

		// Img

		this.managing_code_type(  		this.u.ssd_alias_url_anon			, this.suffix				)		
		this.ssd_alias_img_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_anon			, this.suffix				)		
		this.ram_alias_img_url		= 	this.current_result		

				
		// this.p('Json_File : '. this.ram_alias_json_url)
	}


            
   	update_urls_auth_for_common_types()
	{
		this.m						=	'update_urls_auth_for_common_types'			

		this.managing_code_type( 		this.u.ssd_alias_url_auth				, this.suffix				)
		this.ssd_alias_url			= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_auth				, this.suffix				)
		this.ram_alias_url			= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_url_auth				, this.suffix_lang			)
		this.ssd_alias_urlang		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_auth				, this.suffix_lang			)
		this.ram_alias_urlang		= 	this.current_result		

		// Code
		this.managing_code_type( 		this.u.ssd_alias_url_auth			, this.suffix_code			)		
		this.ssd_alias_code_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_auth			, this.suffix_code			)		
		this.ram_alias_code_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_url_auth			, this.suffix_code			)		
		this.ssd_alias_code_urlang	= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_auth			, this.suffix_code			)		
		this.ram_alias_code_urlang	= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_url_auth			, this.suffix				)
		this.ssd_alias_img_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_auth			, this.suffix				)		
		this.ram_alias_img_url		= 	this.current_result		

		
		this.update_urls_for_common_types_after_bootstrap()
	}


   	update_urls_nouser_for_common_types()
	{
		// All must be aliases
		this.m					=	'update_urls_nouser_for_common_types'			

		// this.p('UPDATING_URL_SVG ' + this.suffix)
		
		this.managing_code_type( 		this.u.ssd_alias_url_nouser				, this.suffix							)		
		this.ssd_alias_url			=	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_nouser				, this.suffix							)		
		this.ram_alias_url			=	this.current_result		

		// this.p('UPDATed_URL_SVG ' + this.ssd_alias_url)

		this.managing_code_type( 		this.u.ssd_alias_url_nouser				, this.suffix_lang						)		
		this.ssd_alias_urlang		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_nouser				, this.suffix_lang						)		
		this.ram_alias_urlang		= 	this.current_result		

		// Code

		this.managing_code_type( 		this.u.ssd_alias_url_nouser		, this.suffix_code						)		
		this.ssd_alias_code_url		=		this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_nouser		, this.suffix_code						)		
		this.ram_alias_code_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ssd_alias_url_nouser		, this.suffix_code	)		
		this.ssd_alias_code_urlang	= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_nouser		, this.suffix_code	)		
		this.ram_alias_code_urlang	= 	this.current_result		

		// Img

		this.managing_code_type( 		this.u.ssd_alias_url_nouser			, this.suffix							)		
		this.ssd_alias_img_url		= 	this.current_result		

		this.managing_code_type( 		this.u.ram_alias_url_nouser			, this.suffix							)		
		this.ram_alias_img_url		= 	this.current_result		

				
		// this.p('Json_File : '. this.ram_alias_json_url)
	}


}

exports.anode_update_common_url = anode_update_common_url