//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Bool Definition Common Class  [V.0.0.2]  (2017-12-06)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Manage page && type combinations
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const { bool_defs } 		= 	require(path.join(JS_BASE, 'com/objects/drupal/bool/b03_bool_defs.es6'))

class bool_copy extends bool_defs {
	constructor() 
	{
		super()
		this.n = "bool_copy::"
	}

	copy(b) 
	{
		this.site_live		 				= 	b.site_live
		this.site_lang 						= 	b.site_lang
		this.site_lang_uri 					= 	b.site_lang_uri
		this.site_translation 				= 	b.site_translation		// 6 SITES
		this.site_sync 						= 	b.site_sync
		this.site_cache 					= 	b.site_cache
		this.site_inline 					= 	b.site_inline

		this.mongo_cache 					= 	b.mongo_cache

		this.nocode 						= 	b.nocode
		this.max_elems 						= 	b.max_elems

		this.page_download 					= 	b.page_download			// 1
		this.page_search 					= 	b.page_search
		this.page_file 						= 	b.page_file				// 
		this.page_gallery 					= 	b.page_gallery
		this.page_list 						= 	b.page_list				// 11 PAGES
		this.page_product 					= 	b.page_product
		this.page_cookies 					= 	b.page_cookies			// 
		this.page_front 					= 	b.page_front
		this.page_multi_parameter 			= 	b.page_multi_parameter	// 
		this.page_intelligent 				= 	b.page_intelligent
		this.page_multi_language 			= 	b.page_multi_language	// 11

		this.type_user 						= 	b.type_user							
		this.type_common 					= 	b.type_common
		this.type_human 					= 	b.type_human
		this.type_synced 					= 	b.type_synced						// 4
		this.type_ssl 						= 	b.type_ssl
		this.type_url 						= 	b.type_url
		this.type_have_properties 			= 	b.type_have_properties
		this.type_have_specific_properties 	= 	b.type_have_specific_properties		// 16 TYPES
		this.type_have_code 				= 	b.type_have_code
		this.type_have_ascii_code 			= 	b.type_have_ascii_code
		this.type_translation 				= 	b.type_translation
		this.type_translated 				= 	b.type_translated					// 
		this.type_cache 					= 	b.type_cache
		this.type_have_taxonomy 			= 	b.type_have_taxonomy
		this.type_is_taxonomy 				= 	b.type_is_taxonomy					// 16


		this.drupal_bootstrap 				= 	b.drupal_bootstrap
		this.file_yaml 						= 	b.file_yaml

		this.contents_translated 			= 	b.contents_translated

		this.ready_to_load	 				= 	b.ready_to_load

		this.ready_to_ram	 				= 	b.ready_to_ram
		
		this.pmt							=	b.pmt
	}

}

exports.bool_copy = bool_copy