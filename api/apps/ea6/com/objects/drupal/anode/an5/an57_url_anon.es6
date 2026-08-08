// [DOCHANGED_ES6]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Node Js - Anode Anonymous Class  [V.0.1.1]  (2017-11-03)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 12]
// *anode_url_anon > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_urls_anon_with_bootstrap-  	  		: Update urls based in drupal bootstrap 
// - d-update_urls_anon-							: Update url for nodes before to run drupal bootstrap 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const { anode_update_common_url } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an5/an58_url_anon.es6'))


class anode_url_anon extends anode_update_common_url {
           
	constructor()
	{
		super()
		this.n						= 	'anode_url_anon::'
	}				    		
		    
   	update_urls_anon()
	{
		this.m					=	'update_urls_anon'			
		// this.d('UpD ' ) 																														

		// Tenemos el caso de un nodo que se genera por url pero vamos a cargar multiples ids relacionados
		//  /ssd/home/ser/zd/main/es/zdom/emp/flat/zd_main_flat/es/cache/flat.dbrqx.com/anonymous/flat/page/human/a/front
		//this.p('U_SSD_ANON ' + this.u.ssd_alias_json_url_anon ) 																				
		//this.p('U_RAM_PAGE ' + this.u.ram_alias_url_anon ) 																				
		//this.p('U_RAM_CODE ' + this.u.ram_alias_code_url_anon ) 																				
		
		this.replace( 						this.u.ssd_alias_url_anon 		,		"/page/", this.change	)	 
		this.ssd_alias_url				=	this.result + this.suffix 

		this.replace( 						this.u.ram_alias_url_anon 		, 		"/page/", this.change	) 
		this.ram_alias_url				=	this.result + this.suffix 

		this.replace( 						this.u.ssd_alias_url_anon 		, 		"/page/", this.change	) 
		this.ssd_alias_urlang			=	this.result + this.suffix_lang 

		this.replace(						this.u.ram_alias_url_anon 		, 		"/page/", this.change	) 
		this.ram_alias_urlang			=	this.result + this.suffix_lang 

		this.replace( 						this.u.ssd_alias_url_anon 	,		"/page/", this.change	) 
		this.ssd_alias_code_url			=	this.result + this.suffix_code 

		this.replace( 						this.u.ram_alias_url_anon 	, 		"/page/", this.change	) 
		this.ram_alias_code_url			=	this.result + this.suffix_code 

		this.replace( 						this.u.ssd_alias_url_anon 	,		"/page/", this.change	) 
		this.ssd_alias_code_urlang		=	this.result + this.suffix_code 

		this.replace( 						this.u.ram_alias_url_anon 	, 		"/page/", this.change	) 
		this.ram_alias_code_urlang		=	this.result + this.suffix_code 

		this.replace( 						this.u.ssd_alias_url_anon 	, 		"/page/", this.change	) 
		this.ssd_alias_img_url			=	this.result + this.suffix 

		this.replace( 						this.u.ram_alias_url_anon 	, 		"/page/", this.change	) 
		this.ram_alias_img_url			=	this.result + this.suffix 

		if (this.b.drupal_bootstrap) this.update_urls_anon_with_bootstrap()

	}


   	update_urls_anon_with_bootstrap()
	{
		// Realmente aqui no es para usuario autenticado. Es para bootstrap generado
		this.m					=	'update_urls_anon_with_bootstrap'			
		
				
		this.replace( 						this.u.ssd_url_anon 			, 		"/page/", this.change	) 
		this.ssd_url					=	this.result + this.suffix

		this.replace( 						this.u.ram_url_anon 			, 		"/page/", this.change	) 
		this.ram_url					=	this.result  + this.suffix

		this.replace( 						this.u.ssd_url_anon 			, 		"/page/", this.change	) 
		this.ssd_urlang					=	this.result  + this.suffix_lang

		this.replace( 						this.u.ram_url_anon 			, 		"/page/", this.change	) 
		this.ram_urlang					=	this.result  + this.suffix_lang
		
		this.replace( 						this.u.ssd_url_anon 		, 		"/page/", this.change	) 
		this.ssd_code_url				=	this.result  + this.suffix_code

		this.replace( 						this.u.ram_url_anon 		, 		"/page/", this.change	) 
		this.ram_code_url				=	this.result  + this.suffix_code

		this.replace( 						this.u.ssd_url_anon 		, 		"/page/", this.change	) 
		this.ssd_code_urlang			=	this.result  + this.suffix_code

		this.replace( 						this.u.ram_url_anon 		, 		"/page/", this.change	) 
		this.ram_code_urlang			=	this.result  + this.suffix_code

		this.replace( 						this.u.ssd_url_anon 		, 		"/page/", this.change	) 
		this.ssd_img_url				=	this.result  + this.suffix

		this.replace( 						this.u.ram_url_anon 		, 		"/page/", this.change	) 
		this.ram_img_url				=	this.result  + this.suffix

        // this.d(' anon - SSD Path :' + this.ssd_url )
		
	}

	  
}

exports.anode_url_anon = anode_url_anon
