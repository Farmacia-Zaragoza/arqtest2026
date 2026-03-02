// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - URI Class  [V.0.1.3]  (2017-07-12)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-set_anonymous_cacheable-   	  : Set urls to be cacheable for anonymous user 
// - d-create_drupal_paths-			  : Create path for drupal bootstrap
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"			);

const 	{ uri_paths } 		= 	require(	cons.JS_BASE + 'com/objects/drupal/uri/u04_paths.es6'		);

class uri_reload extends uri_paths {

	constructor()
	{
		super()		
		this.n 							= 	'uri_reload::'				
	}


	manage_reload()
	{
		// Casos donde no se debe usar la cache
		// 1. Cache desactivada
		// 2. Url Method (reload indica recargar la pagina)
		// 3. Sea una pagina de download ( no tiene sentido la cache - Pendiente de implementar en node)
		this.b.ready_to_load = 	this.b.site_cache 						&& 	
								( this.url_method !== 'reload')			&&	
								!this.b.page_download 					 
								
		// Oendiente
		this.b.ready_to_ram 	=	this.ready_to_load 					&& 		
								(this.c.ram == "reload" ) 				&& 	
								!(this.c.arr['ram'].includes("FPC") 	) 
	}
  
}

exports.uri_reload = uri_reload