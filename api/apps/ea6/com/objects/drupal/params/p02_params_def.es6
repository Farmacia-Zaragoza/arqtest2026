//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Params Definition Common Class  [V.0.0.5]  (2018-01-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-ES6-EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Manage page and type combinations
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------


const 	{ printlog } 			= 	require(path.join(JS_BASE, 'com/objects/logs/printlog.es6'))

class params_def extends printlog {
	constructor() {
		super()
		this.n 					= 	"params_defs::"

		this.req				= 	''
		this.cache_mongo 		= 	false
		this.cache_disk 		= 	false
		this.lang 				= 	false
		this.trans 				= 	false
		this.sync 				= 	false
		this.live 				= 	false
		this.lang_uri 			= 	true
		this.is_robot 			= 	false

		this.nocode 			= 	false
		this.max_elems 			= 	false

		this.live_op			=	''			// scripts | minimized | inline
		this.sch				=	''			// Mongosee scheme

		this.robot				=	'human'		// Humans | Robot pages
		this.slan				=	'n'			// No Multilanguage
		this.env				=	'dev'		// Dev environment

		this.site_name			=	'truck'
		this.theme_name			=	'truck'
		this.base_path			=	'/brqx/pers/drupal/v50/fnode/'

	}
}

exports.params_def = params_def
