// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Node Js - Anode NoUser Class  [V.0.1.2]  (2017-11-03)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 08]
// *anode_nouser > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-update_paths_nouser-  	  			: Update paths for no user types 
// - d-update_paths_nouser_with_bootstrap-	: Update path for nodes after to run drupal bootstrap 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_common_auth } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an5/an53_common_auth.es6')))


class anode_nouser extends anode_common_auth {
           
	constructor()
	{
		super()
		this.n						= 'an52_nouser::'				    		
	}		    
   	update_paths_nouser()
	{
		this.m 		= 	'update_paths_nouser'									
		this.n						= 'an52_nouser::'				    		

		//  /ssd/home/ser/zd/main/es/zdom/emp/flat/zd_main_flat/es/cache/flat.dbrqx.com/anonymous/flat/page/human/a/front
		// this.p('U_SSD_ANON ' + this.u.ssd_alias_path_anon ) 																				
	 	// this.p('U_RAM_ANON ' + this.u.ram_alias_path_anon ) 																				
		
	 	// this.p('U_RAM_NOUSER ' + this.type + ' ' + this.u.ram_alias_path_nouser ) 																				
				
		
		this.replace( 						this.u.ssd_alias_path_nouser 		, "/page/", this.change	) 
		this.ssd_alias_path				=	this.result + this.suffix 

		this.replace( 						this.u.ram_alias_path_nouser 		, "/page/", this.change	)  
		this.ram_alias_path				=	this.result + this.suffix 

		this.replace( 						this.u.ssd_alias_path_nouser 		, "/page/", this.change	)  
		this.ssd_alias_lang				=	this.result + this.suffix_lang 

		this.replace( 						this.u.ram_alias_path_nouser 		, "/page/", this.change	)  
		this.ram_alias_lang				=	this.result + this.suffix_lang 

		this.replace( 						this.u.ssd_alias_path_nouser 		, "/page/", this.change	)  
		this.ssd_alias_code_path		=	this.result + this.suffix_code 

		this.replace( 						this.u.ram_alias_path_nouser 		, "/page/", this.change	)  
		this.ram_alias_code_path		=	this.result + this.suffix_code 
 
		this.replace( 						this.u.ssd_alias_path_nouser 		, "/page/", this.change	)  
		this.ssd_alias_code_lang		=	this.result + this.suffix_code 

		this.replace( 						this.u.ram_alias_path_nouser 		, "/page/", this.change	)  
		this.ram_alias_code_lang		=	this.result + this.suffix_code 

		this.replace( 						this.u.ssd_alias_path_nouser 		, "/page/", this.change	)  
		this.ssd_alias_img_path			=	this.result + this.suffix 

		this.replace( 						this.u.ram_alias_path_nouser 		, "/page/", this.change	)  
		this.ram_alias_img_path			=	this.result + this.suffix 


	 	// this.p('U_RAM_CODEPA ' + this.type + ' ' + this.ram_alias_code_path) 																				

		this.update_urls_nouser() 																												
	
		if (this.b.drupal_bootstrap) this.update_paths_nouser_with_bootstrap()
		else 
		{
			// Siempre tenemos que actualizar los paths
			this.update_paths_for_common_types_after_bootstrap()		
			this.update_urls_for_common_types_after_bootstrap()		
		}

		// this.p('U_RAM_CODEPQ ' + this.type + ' ' + this.ram_alias_code_path) 																				
		
		// this.p('SSD_ANON3a ' + this.ssd_alias_path ) 																				
		// this.p('RAM_ANON3a ' + this.ram_alias_path ) 																				
	}

   	update_paths_nouser_with_bootstrap()
	{
		this.n						= 'an52_nouser::'				    		
		// Realmente aqui no es para usuario autenticado. Es para bootstrap generado
		
		this.replace( 						this.u.ssd_path_nouser 		, "/page/", this.change	) 
		this.ssd_path					=	this.result + this.suffix

		this.replace( 						this.u.ram_path_nouser 		, "/page/", this.change	) 
		this.ram_path					=	this.result + this.suffix

		this.replace(						this.u.ssd_path_nouser 		, "/page/", this.change	) 
		this.ssd_lang					=	this.result + this.suffix_lang

		this.replace(						this.u.ram_path_nouser 		, "/page/", this.change	) 
		this.ram_lang					=	this.result + this.suffix_lang

		this.replace(						this.u.ssd_path_nouser 		, "/page/", this.change	) 
		this.ssd_code_path				=	this.result + this.suffix_code

		this.replace(						this.u.ram_path_nouser 		, "/page/", this.change	) 
		this.ram_code_path				=	this.result + this.suffix_code

		this.replace( 						this.u.ssd_path_nouser		, "/page/", this.change	) 
		this.ssd_code_lang				=	this.result + this.suffix_code

		this.replace( 						this.u.ram_path_nouser 		, "/page/", this.change	) 
		this.ram_code_lang				=	this.result + this.suffix_code

		this.replace( 						this.u.ssd_path_nouser 		, "/page/", this.change	) 
		this.ssd_img_path				=	this.result + this.suffix

		this.replace( 						this.u.ram_path_nouser 		, "/page/", this.change	) 
		this.ram_img_path				=	this.result + this.suffix

		// Aqui no llega
        // this.pt(' nouser_SSD_Lang :' + this.ssd_code_lang )
		
	}
	  
}

exports.anode_nouser = anode_nouser