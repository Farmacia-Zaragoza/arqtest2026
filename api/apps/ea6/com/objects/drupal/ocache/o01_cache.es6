//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Cache Class  [V.0.1.3]  (2017-07-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-set_anonymous_cacheable-   	  : Set urls to be cacheable for anonymous user
//- d-create_drupal_paths-			  : Create path for drupal bootstrap
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.es6"			);

const 	{ printlog } 		= require(path.join(JS_BASE, 'com/objects/logs/printlog.es6'))

class ocache extends printlog {
	constructor(b = "", disk = "reload", ssd = "reload", ram = "reload", search = "reload") 
	{
		super()
		this.n 			= "cache::"
		
		this.cache		=	Array() 		// ObjectsCache

	}

   put	(key, item) 
   {
        this.cache[key] = item;
   }
   
    
   get (key) 
   {
		if (this.cache.includes(key))		
	        return cache[key]
	    return false
   }

   exist (key) 
   {
		if (this.cache.includes(key))		
	        return cache[key]
	    return false
   }

}

exports.ocache = ocache