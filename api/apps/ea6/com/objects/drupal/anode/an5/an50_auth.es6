// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Auth Class  [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 07]
// *anode_auth > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_paths_auth- 					: Update path for authenticated users
// - d-update_paths_auth_with_bootstrap- 	: Update path for nodes after to run drupal bootstrap
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_anon } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an5/an51_anon.es6'))

class anode_auth extends anode_anon {

	constructor()
	{
     	super()   
	 	this.n						= 'anode_auth::'				    		
    }    

   	  update_paths_auth()
	{
		 this.m 		= 	'update_urls_auth'									

		 this.replace( 							this.u.ssd_alias_path_anon 		, "/page/",  this.change				)  
		 this.ssd_alias_path			=		this.result +  this.suffix 

		 this.replace( 							this.u.ram_alias_path_anon 		, "/page/",  this.change				)  
		 this.ram_alias_path			=		this.result +  this.suffix 

		 this.replace( 							this.u.ssd_alias_path_anon 		, "/page/",  this.change				)  
		 this.ssd_alias_lang			=		this.result +  this.suffix_lang 

		 this.replace( 							this.u.ram_alias_path_anon 		, "/page/",  this.change				)  
		 this.ram_alias_lang			=		this.result +  this.suffix_lang 

		 this.replace( 							this.u.ssd_alias_code_path_anon , "/page/",  this.change				)  
		 this.ssd_alias_code_path		=		this.result +  this.suffix_code 

		 this.replace( 							this.u.ram_alias_code_path_anon , "/page/",  this.change				)  
		 this.ram_alias_code_path		=		this.result +  this.suffix_code 

		 this.replace( 							this.u.ssd_alias_code_path_anon , "/page/",  this.change				)  
		 this.ssd_alias_code_lang		=		this.result +  this.suffix_code 

		 this.replace( 							this.u.ram_alias_code_path_anon , "/page/",  this.change				)  
		 this.ram_alias_code_lang		=		this.result +  this.suffix_code 

		 this.replace( 							this.u.ssd_alias_img_path_anon , "/page/",  this.change					)  
		 this.ssd_alias_img_path		=		this.result +  this.suffix 

		 this.replace( 							this.u.ram_alias_img_path_anon , "/page/",  this.change					)  
		 this.ram_alias_img_path		=		this.result +  this.suffix 

		if ( this.u.is_drupal_bootstrap)  this.update_paths_auth_with_bootstrap()

		 this.update_urls_auth() 																														
	}


   	  update_paths_auth_with_bootstrap()
	{
		// Realmente aqui no es para usuario autenticado. Es para bootstrap generado
		 this.m 		= 	'update_paths_auth_with_bootstrap'									
		
				
		 this.replace( 							this.u.ssd_path_auth 			, "/page/",  this.change				) 
		 this.ssd_path					=		this.result +  this.suffix

		 this.replace( 							this.u.ram_path_auth 			, "/page/",  this.change				) 
		 this.ram_path					=		this.result +  this.suffix

		 this.replace( 							this.u.ssd_code_path_auth 		, "/page/",  this.change				) 
		 this.ssd_code_path				=		this.result +  this.suffix_code

		 this.replace( 							this.u.ram_code_path_auth 		, "/page/",  this.change				) 
		 this.ram_code_path				=		this.result +  this.suffix_code

		 this.replace( 							this.u.ssd_code_path_auth 		, "/page/",  this.change				) 
		 this.ssd_code_lang				=	 	this.result +  this.suffix_code

		 this.replace( 							this.u.ram_code_path_auth 		, "/page/",  this.change				) 
		 this.ram_code_lang				=	  	this.result +  this.suffix_code

		 this.replace( 							this.u.ssd_img_path_auth 		, "/page/",  this.change				) 
		 this.ssd_img_path				=	  	this.result +  this.suffix

		 this.replace( 							this.u.ram_img_path_auth 		, "/page/",  this.change				) 
		 this.ram_img_path				=	  	this.result +  this.suffix
				
	}
	  
}

exports.anode_auth = anode_auth
