// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Node Js - Anode Url Authentication Class  [V.0.1.1]  (2017-11-03)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 11]
// *anode_url_auth > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_urls_auth- 					: Update url for authenticated users
// - d-update_urls_auth_with_bootstrap- 	: Update url for nodes after to run drupal bootstrap
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_url_anon } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an5/an57_url_anon.es6')))


class anode_url_auth extends anode_url_anon {

	constructor()
	{
		super()
		this.n						= 'anode_url_auth::'				    		
	}            

   	update_urls_auth()
	{
		this.m 		= 	'update_urls_auth'									

		this.replace(						this.u.ssd_alias_url_anon 			, 	"/page/", this.change	)  
		this.ssd_alias_url				=	this.result + this.suffix 

		this.replace(						this.u.ram_alias_url_anon 			, 	"/page/", this.change	)  
		this.ram_alias_url				=	this.result + this.suffix 

		this.replace( 						this.u.ssd_alias_url_anon 			,	"/page/", this.change	)  
		this.ssd_alias_urlang			=	this.result + this.suffix_lang 

		this.replace( 						this.u.ram_alias_url_anon 			, 	"/page/", this.change	)  
		this.ram_alias_urlang			=	this.result + this.suffix_lang 

		this.replace( 						this.u.ssd_alias_code_url_anon 		, 	"/page/", this.change	)  
		this.ssd_alias_code_url			=	this.result + this.suffix_code 

		this.replace( 						this.u.ram_alias_code_url_anon 		, 	"/page/", this.change	)  
		this.ram_alias_code_url			=	this.result + this.suffix_code 

		this.replace( 						this.u.ssd_alias_code_url_anon 		, 	"/page/", this.change	)  
		this.ssd_alias_code_urlang		=	this.result + this.suffix_lang + this.suffix_code 

		this.replace( 						this.u.ram_alias_code_url_anon 		, 	"/page/", this.change	)  
		this.ram_alias_code_urlang		=	this.result + this.suffix_lang + this.suffix_code 

		this.replace( 						this.u.ssd_alias_img_url_anon 		, 	"/page/", this.change	)  
		this.ssd_alias_img_url			=	this.result + this.suffix 

		this.replace( 						this.u.ram_alias_img_url_anon 		, 	"/page/", this.change	)  
		this.ram_alias_img_url			=	this.result + this.suffix 

		if (this.u.is_drupal_bootstrap) this.update_urls_auth_with_bootstrap()
	}


   	update_urls_auth_with_bootstrap()
	{
		// Realmente aqui no es para usuario autenticado. Es para bootstrap generado
		
		this.replace( 						this.u.ssd_url_auth				,		"/page/", this.change	) 
		this.ssd_url					=	this.result + this.suffix

		this.replace(						this.u.ram_url_auth 			, 		"/page/", this.change	) 
		this.ram_url					=	this.result + this.suffix

		this.replace( 						this.u.ssd_url_auth 			, 		"/page/", this.change	) 
		this.ssd_urlang					=	this.result + this.suffix_lang

		this.replace( 						this.u.ram_url_auth 			, 		"/page/", this.change	) 
		this.ram_urlang					=	this.result + this.suffix_lang

		this.replace( 						this.u.ssd_code_url_auth 		, 		"/page/", this.change	) 
		this.ssd_code_url				=	this.result + this.suffix_code

		this.replace( 						this.u.ram_code_url_auth 		,	 	"/page/", this.change	) 
		this.ram_code_url				=	this.result + this.suffix_code

		this.replace( 						this.u.ssd_code_url_auth 		, 		"/page/", this.change	) 
		this.ssd_code_urlang			=	this.result + this.suffix_lang + this.suffix_code

		this.replace( 						this.u.ram_code_url_auth 		,	 	"/page/", this.change	) 
		this.ram_code_urlang			=	this.result + this.suffix_lang + this.suffix_code

		this.replace( 						this.u.ssd_img_url_auth 		,	 	"/page/", this.change	) 
		this.ssd_img_url				=	this.result + this.suffix

		this.replace( 						this.u.ram_img_url_auth 		, 		"/page/", this.change	) 
		this.ram_img_url				=	this.result + this.suffix
				
	}
	  
}

exports.anode_url_auth = anode_url_auth