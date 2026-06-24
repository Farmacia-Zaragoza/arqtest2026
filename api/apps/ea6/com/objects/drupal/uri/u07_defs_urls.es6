// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Uri Deffinition Class  [V.0.1.8]  (2018-01-15)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


var { uri_defs_paths } 		= require(	cons.JS_BASE + 'com/objects/drupal/uri/u08_defs_paths.es6'		)

class uri_defs_urls extends uri_defs_paths {

	constructor()
	{
		super()
		this.n 						= 	'uri_defs_urls::'


		this.http_url				=	''						 // Main - Front site url
		this.bar_site_url			=	''						 // Main - Front site url
		this.site_url				=	''						 // Url withou include any path

		this.lang_url				=	''						 // Url indluding lang

		this.url					=	''						 // Url slash format - normal
		this.uri					=	''						 // Uri slash format - relative url
		this.no_slash_uri			=	''						 // Uri slash format - relative url

		this.compouri				=	''						 // Uri for composition

	// Nodo real de drupal
		this.drupal_real_uri		=	''
		this.drupal_real_dash_uri	=	''
		this.drupal_real_slash_uri	=	''

		this.drupal_node_url		=	''


		this.dash_url				=	''						 // Url dash format
		this.dash_uri				=	''						 // Uri dash format

	// ENTRAMOS EN EL MUNDO IDEAL - Sub queris for intelligent load
	// ---------------------------------------------------------------------------------------------------
		this.slash_sub_query		=	''						 // Uri images/ 2013/abc/paris
		this.dash_sub_query			=	''
		this.slash_ideal_uri		=	''						 // Uri images/ 2013/abc/paris
		this.dash_ideal_uri			=	''

		this.real_sub_query 		=	''						 // Sub queri real existente en sistema de archivos
	// ---------------------------------------------------------------------------------------------------


		this.start_dash 			=	''						 // Start Uri - 5 positions
		this.start_dash_03 			=	''						 // Start Uri - 3 positions

		this.dash_url_port			=	''						 // Url dash format


	// SSD - RAM - Paths

		this.common_url				=	''
		this.anonymous_url			=	''
		this.authenticated_url		=	''

		this.ssd_url_auth				=	''						 //
		this.ssd_url_anon				=	''						 //
		this.ssd_url_nouser				=	''						 //

		this.ram_url_auth				=	''						 // Path for ram node
		this.ram_url_anon				=	''						 // Path for ram node
		this.ram_url_nouser				=	''						 // Path for ram node

		this.ssd_alias_url_auth			=	''						 // Alias to ram url
		this.ssd_alias_url_anon			=	''						 // Alias to ram url
		this.ssd_alias_url_nouser			=	''						 // Alias to ram url

		this.ram_alias_url_auth			=	''						 // Alias to ram url
		this.ram_alias_url_anon			=	''						 //
		this.ram_alias_url_nouser		=	''						 //

	}

}

exports.uri_defs_urls = uri_defs_urls
