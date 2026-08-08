//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS - Cache Class  [V.0.1.3]  (2017-07-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-set_anonymous_cacheable-   	  : Set urls to be cacheable for anonymous user
//- d-create_drupal_paths-			  : Create path for drupal bootstrap
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"				);

const 	{ cache_defs } 		= 	require(	path.join(JS_BASE, 'com/objects/drupal/cache/c02_cache_defs.es6'));

class cache extends cache_defs {
	constructor(b = "", disk = "reload", ssd = "reload", ram = "reload", search = "reload") 
	{
		super()
		this.n 			= "cache::"

		this.b 			= b
		
		this.disk 		= disk
		this.ram 		= ram
		this.ssd 		= ssd
		this.search 	= search
		this.reload()
	}

	reload(rram = "", rssd = "", rdis = "", rcod = "") 
	//Tipos particulares para cachear (ram - ssd - dis - cod )
	{
		this.arr['ram'] = rram.split(" ")
		this.arr['ssd'] = rssd.split(" ")
		this.arr['dis'] = rdis.split(" ")
		this.arr['cod'] = rcod.split(" ")
	}

}

exports.cache = cache