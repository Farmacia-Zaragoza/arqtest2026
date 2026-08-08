// [DOCHANGED_ES6]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Uri Paths Class  [V.0.2.0]  (2018-01-13)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-create_paths-   	  			  : Create anonymous paths without drupal bootstrap
// - d-create_drupal_paths-			  : Create path for drupal bootstrap
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


var { uri_urls } 		= require(	path.join(JS_BASE, 'com/objects/drupal/uri/u05_urls.es6')))

class uri_paths extends uri_urls {

	constructor()
	{
		super()
		this.n 							= 	'uri_paths::'
	}

	create_paths(	type 	= 'page'					, // 01. Type 		: page  | comp | node
					ptype 	= 'human'					) // 02. PageType	: human | robot
	{
		// To load with page details without drupal bootstrap - Only know aliases what is page name

		let base_string 						=	this.site_path + '/cache/'

		// Que pasa si no tiene ssd en el path pues que van a ser iguales los paths ... GRAN PROBLEMA
		// O en la uri

		if ( this.site_path.indexOf('ssd') === -1 )
		{
			base_string = '/ssd' + base_string
			this.p('Base_String_SSD ' + base_string )
		}

		let base_ssl							=	base_string + this.ssl_page 	+ '/'	+ this.domain
		let base_nouser							=	base_string + 'nsu' 			+ '/'	+ this.domain


		this.anonymous_path					= 	base_ssl 		+ '/anonymous/' 	+ this.s.theme + '/' + type + '/' + ptype
		this.authenticated_path				= 	base_ssl 		+ '/authenticated/' + this.s.theme + '/' + type + '/' + ptype
		this.nouser_path					= 	base_nouser 	+ '/nouser/' 		+ this.s.theme + '/' + type + '/' + ptype

		//Path independiente del usuario e independiente del tipo de pagina

		// Gestion Multi URI

		this.ssd_alias_path_auth			=	this.authenticated_path 	+ '/a/' + this.url_parameter_type	+ '_'
		this.ssd_alias_path_anon			=	this.anonymous_path 		+ '/a/' + this.url_parameter_type	+ '_'
		this.ssd_alias_path_nouser			=	this.nouser_path 			+ '/a/' + this.url_parameter_type	+ '_'

		// /ssd/home/ser/zd/main/es/zdom/emp/flat/zd_main_flat/es/cache/flat.dbrqx.com/anonymous/flat/page/human/a/front_code


		// Que pasa si no tiene ssd en el path pues que van a ser iguales los paths ... GRAN PROBLEMA

		this.replace(						this.ssd_alias_path_auth	, 		"ssd", "ram")
		this.ram_alias_path_auth			=	this.result

		this.replace(						this.ssd_alias_path_anon	, 		"ssd", "ram")
		this.ram_alias_path_anon			=	this.result

		this.replace(						this.ssd_alias_path_nouser	, 		"ssd", "ram")
		this.ram_alias_path_nouser			=	this.result


 		// /ram.../anonymous/peloncita/page/human/a/image_2013_lagos_portugal


		this.create_urls(	type 	,ptype )

	}

	create_drupal_paths(	type 			= 	'page'		,
							ptype 			= 	'human'		,
							theme_name		=	'garland'	)
	{
		// To load once drupal is known. We have direct access to file

		this.theme_name			=	theme_name

		this.ssd_path_auth		=	this.authenticated_path 	+ '/u/' + this.drupal_real_dash_uri + '_'
		this.ssd_path_anon		=	this.anonymous_path 		+ '/u/' + this.drupal_real_dash_uri + '_'
		this.ssd_path_nouser	=	this.nouser_path 			+ '/u/' + this.drupal_real_dash_uri + '_'

//		print 'Uri - SSD PAth  ' + this.ssd_path + '<br>'
//		print 'Uri - SSD Alias ' + this.ssd_alias_path + '<br>'

		this.replace(				this.ssd_path_anon	, 		"ssd", "ram")
		this.ram_path_anon			=	this.result


		this.replace(				this.ssd_path_auth	, 		"ssd", "ram")
		this.ram_path_auth			=	this.result

		this.replace(				this.ssd_path_nouser	, 		"ssd", "ram")
		this.ram_path_nouser		=	this.result


		// Hay que actualizar el tipo de usuario


		this.create_drupal_urls(type	,	ptype	,	theme_name)
	}

}

exports.uri_paths = uri_paths
