//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Bool Definition Common Class  [V.0.0.3]  (2018-01-06)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Manage page and type combinations
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"			);

const 	{ printlog } 		= 	require(	cons.JS_BASE + 'com/objects/logs/printlog.es6'				);

class bool_defs extends printlog {
	constructor() {
		super()
		this.n 								= "bool_defs::"
		
		this.arr 							= Array()
		
		// Parameters object
		this.pmt							=	''
		
		this.site_live 						= false		//
		this.site_lang 						= false		
		this.site_lang_uri 					= true		
		this.site_translation 				= false		// 7 SITES
		this.site_sync 						= false		
		this.site_cache 					= false		// Cache from Disk
		this.site_inline					= false
		this.mongo_cache 					= false
		
		this.nocode 						= false
		this.max_elems 						= false

		this.page_download 					= false		// 1
		this.page_search 					= false		
		this.page_file 						= false		// 
		this.page_gallery 					= false
		this.page_list 						= false		// 11 PAGES
		this.page_product 					= false
		this.page_cookies 					= false		// 
		this.page_front 					= false
		this.page_multi_parameter 			= false		// 
		this.page_intelligent 				= false
		this.page_multi_language 			= false		// 11
		
		this.type_user 						= true
		this.type_common 					= false
		this.type_human 					= false
		this.type_synced 					= false
		this.type_ssl 						= false
		this.type_url 						= false
		this.type_have_properties 			= false
		this.type_have_specific_properties 	= false
		this.type_have_code	 				= false
		this.type_have_ascii_code 			= false
		this.type_have_taxonomy 			= false
		this.type_is_taxonomy 				= false
		this.type_translation 				= false
		this.type_translated 				= false
		this.type_cache 					= false
		this.type_generated 				= false
		
		this.drupal_bootstrap 				= false
		this.file_yaml 						= false

		this.contents_translated 			= false

		this.ready_to_load	 				= false		// Ready to load page

		this.ready_to_ram	 				= false		// Ready to load ram page

	}
}

exports.bool_defs = bool_defs