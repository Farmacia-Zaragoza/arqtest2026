//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Site Definition Common Class  [V.0.0.3]  (2018-02-10)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Manage page cache
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"	)

const 	{ printlog } 		= 	require(path.join(JS_BASE, 'com/objects/logs/printlog.es6'))

class site_defs extends printlog {
	constructor() {
		super()
		this.n 							= 	"site_defs::"
		this.arr 						= 	Array()

		this.arr['allowed_langs'] 		= 	Array()
		this.arr['allowed_commands'] 	= 	Array()

		this.pmt						=	''
		
		this.load 						= 	"disk"
		this.default_lang 				= 	"es"
		this.lang 						= 	"es"
		this.slan						= 	"n"			// No Multi Language by default

		this.live_opt					= 	"minimized"	// inline - script - inline_and_save

	
		this.allowed_langs 				= 	
			"de es en it fr pt ja zh ca ar ru hi in sp bn uk"

		this.allowed_commands 			= 	
			"list page gal gallery  hola cookies policy"

		this.name 						= 	""
		this.title 						= 	""
		this.theme 						= 	""
		this.drift 						= 	""
		this.folder_dat 				= 	""
		this.live_folder_name 			= 	"live_img"

		// Default extension
		this.img_extension					= 	"jpg"

		// Resolution for desktop
		this.img_resDesktop					= 	"0935x0700"

		this.max_elems_limit			= 	10

		// Information Section

		this.nfo_in							=	""
		this.nfo_out						=	""
		this.nfo_font_size					=	""
		this.nfo_font_resize				=	""

		// - Titles
		this.nfo_text_dev_live				=	""
		this.nfo_text_html_php				=	""
		this.nfo_text_http_https			=	""
		this.nfo_text_anon_auth				=	""
		this.nfo_text_robot_user			=	""

		// - Descriptions
		this.nfo_desc_dev_live				=	""
		this.nfo_desc_html_php				=	""
		this.nfo_desc_http_https			=	""
		this.nfo_desc_anon_auth				=	""
		this.nfo_desc_robot_user			=	""

		// - Page Action
		this.nfo_desc_font_size				=	""
		this.nfo_desc_keyboard				=	""
		this.nfo_desc_scrolling				=	""

		// - Text
		this.nfo_text_general_title			=	""
		this.nfo_text_general_information	=	""


		this.font_size						=	""
		
		// Menu
		
		this.mnu_hide						=	''

		// Social Networks

		this.facebook						=	""
		this.twitter						=	""
		this.googleplus						=	""
		this.linkedin						=	""
		
		// Metas

		this.meta_desc						=	""
		this.meta_author					=	""
		

		// Meta Og

		this.meta_og_url				=	""
		this.meta_og_title				=	""
		this.meta_og_type				=	""
		this.meta_og_description		=	""
		this.meta_og_image				=	""
		
		this.img_base_resolution 		= 	""
		this.img_folder 				= 	""
		this.img_url_folder 			= 	""
		this.img_url_word 					= 	""
		this.img_relative_url_folder 	= 	""
		
		this.sync_to 					= 	"ebrqx.com"
		this.sync_from 					= 	"dbrqx.com"
	}


}

exports.site_defs = site_defs