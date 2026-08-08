// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Anonymous Class  [V.0.1.1]  (2017-08-14)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 08]
// *anode_anon > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_paths_anon_with_bootstrap-  	  		: Update paths based in drupal bootstrap 
// - d-update_paths_anon-							: Update path for nodes before to run drupal bootstrap 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_nouser } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an5/an52_nouser.es6')))


class anode_anon extends anode_nouser {
           
	constructor()
	{
		super()
		this.n						= 'anode_anon::'				    		
	}
		    
   	update_paths_anon()
	{
		this.m 		= 	'update_urls_auth'									

		//  /ssd/home/ser/zd/main/es/zdom/emp/flat/zd_main_flat/es/cache/flat.dbrqx.com/anonymous/flat/page/human/a/front
		// this.p('U_SSD_ANON ' + this.u.ssd_alias_path_anon ) 																				
		
		this.replace( 						this.u.ssd_alias_path_anon 		, 	"/page/", this.change				)  
		this.ssd_alias_path			=		this.result + this.suffix 

		this.replace( 						this.u.ram_alias_path_anon 		, 	"/page/", this.change				)  
		this.ram_alias_path			=	 	this.result + this.suffix 

		this.replace( 						this.u.ssd_alias_path_anon 		, 	"/page/", this.change				)  
		this.ssd_alias_lang			=	 	this.result + this.suffix_lang 

		this.replace( 						this.u.ram_alias_path_anon 		, 	"/page/", this.change				)  
		this.ram_alias_lang			=	 	this.result + this.suffix_lang 

		this.replace( 						this.u.ssd_alias_code_path_anon , 	"/page/", this.change				)  
		this.ssd_alias_code_path	=		this.result + this.suffix_code 

		this.replace( 						this.u.ram_alias_code_path_anon , 	"/page/", this.change				)  
		this.ram_alias_code_path	=	 	this.result + this.suffix_code 

		this.replace( 						this.u.ssd_alias_code_path_anon , 	"/page/", this.change				)  
		this.ssd_alias_code_lang	=	 	this.result + this.suffix_code 

		this.replace( 						this.u.ram_alias_code_path_anon , 	"/page/", this.change				)  
		this.ram_alias_code_lang	=	 	this.result + this.suffix_code 

		this.replace( 						this.u.ssd_alias_img_path_anon 	, 	"/page/", this.change				)  
		this.ssd_alias_img_path		=	 	this.result + this.suffix 

		this.replace( 						this.u.ram_alias_img_path_anon 	, 	"/page/", this.change				)  
		this.ram_alias_img_path		=	 	this.result + this.suffix 

		this.update_urls_anon() 																												
	
		if (this.b.drupal_bootstrap) this.update_paths_anon_with_bootstrap()
		else {
			// Siempre tenemos que actualizar los paths
			this.update_paths_for_common_types_after_bootstrap()		
			this.update_urls_for_common_types_after_bootstrap()		
		}

	}

   	update_paths_anon_with_bootstrap()
	{
		// Realmente aqui no es para usuario autenticado. Es para bootstrap generado
		
		this.replace( 						this.u.ssd_path_anon 		, 		"/page/", this.change				) 
		this.ssd_path					=	this.result + this.suffix

		this.replace(						this.u.ram_path_anon 		, 		"/page/", this.change				) 
		this.ram_path					=	this.result + this.suffix

		this.replace( 						this.u.ssd_path_anon 		, 		"/page/", this.change				) 
		this.ssd_lang					=	this.result + this.suffix_lang

		this.replace( 						this.u.ram_path_anon 		, 		"/page/", this.change				) 
		this.ram_lang					=	this.result + this.suffix_lang

		this.replace( 						this.u.ssd_code_path_anon 	, 		"/page/", this.change				) 
		this.ssd_code_path				=	this.result + this.suffix_code

		this.replace( 						this.u.ram_code_path_anon 	, 		"/page/", this.change				) 
		this.ram_code_path				=	this.result + this.suffix_code

		this.replace( 						this.u.ssd_code_path_anon 	, 		"/page/", this.change				) 
		this.ssd_code_lang				=	this.result + this.suffix_code

		this.replace( 						this.u.ram_code_path_anon 	, 		"/page/", this.change				) 
		this.ram_code_lang				=	this.result + this.suffix_code

		this.replace( 						this.u.ssd_img_path_anon 	, 		"/page/", this.change				) 
		this.ssd_img_path				=	this.result + this.suffix

		this.replace( 						this.u.ram_img_path_anon 	, 		"/page/", this.change				) 
		this.ram_img_path				=	this.result + this.suffix

       // this.d(' anon - SSD Path :' + this.ssd_path )
		
	}
	  
}

exports.anode_anon = anode_anon 
