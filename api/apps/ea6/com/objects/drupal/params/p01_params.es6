//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Params Class  [V.0.0.3]  (2018-01-29)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6-COMMON]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ params_def } 		= 	require(	path.join(JS_BASE, 'com/objects/drupal/params/p02_params_def.es6')),
		mongoose 			= 	require(	'mongoose'									),
 		{ idSchema }		= 	require(	path.join(JS_BASE, 'com/libs/mongo/schemes/html.sch'));

class params extends params_def {
	constructor(	req 			= 	''								, 	// 01. Request
					cache_mongo 	= 	false							, 	// 02. Cache Mongo
					cache_disk 		= 	false							, 	// 03. Cache Disk
					lang			=	false							, 	// 04. Multi lang
					trans 			= 	false							, 	// 05. Tranlation enabled
					sync 			= 	false							, 	// 06. Syncing
					live 			= 	false							, 	// 07. Live site
					lang_uri		=	false							, 	// 08. Lang Uri
					is_robot		=	false							, 	// 09. Lang Uri
					live_opt		=	'' 								,	// 10. Live Options
					nocode			=	false							,	// 11. No code
					max_elems		=	false							,	// 12. Max Elems Limit
					site_name		=	'truck'							,	// 13. Site name
					theme_name		=	'truck'							,	// 14. Theme name
					base_path		=	'/brqx/pers/drupal/v50/fnode/' 	, 	// 15 Base Path
					htmScheme		=	''								) 	// 16. Mongo Scheme
	{
		super()
		this.n 					= 	"params::"

		this.req				= 	req							// 01
		this.cache_mongo 		= 	cache_mongo					// 02
		this.cache_disk 		= 	cache_disk					// 03
		this.lang 				= 	lang						// 04
		this.trans 				= 	trans						// 05
		this.sync 				= 	sync						// 06
		this.live 				= 	live						// 07
		this.lang_uri 			= 	lang_uri					// 08
		this.is_robot 			= 	is_robot					// 09

		this.nocode 			= 	nocode						// 11
		this.max_elems 			= 	max_elems					// 12

		if (this.live)
			this.env			=	'liv'

		if (this.is_robot)
			this.robot			=	'robot'

		if (this.lang)
			this.slan			=	'l'

		// String site parameters
		this.site_name 			= 	site_name					// 13
		this.theme_name 		= 	theme_name					// 14

		this.base_path 			= 	base_path					// 15

		this.live_opt			=	live_opt

		//this.p('testINg_model_mongo ' + htmScheme)

		// Se pasa la function y se interpreta ya como objeto mongo htmScheme
		this.sch				=	htmScheme					// 16

	}
}

exports.params = params
