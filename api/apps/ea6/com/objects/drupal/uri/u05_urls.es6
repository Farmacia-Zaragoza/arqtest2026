// [DOCHANGED_NODE]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Uri Paths Class  [V.0.1.8]  (2018-01-12)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-create_urls-   	  			  : Create anonymous urls without drupal bootstrap
// - d-create_drupal_urls-			  : Create url for drupal bootstrap
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const { uri_sets } 			= 	require(	path.join(JS_BASE, 'com/objects/drupal/uri/u06_sets.es6')))

class uri_urls extends uri_sets {

	constructor()
	{
		super()
		this.n 							= 	'uri_urls::'
	}

	create_urls(	type 	= 'page'					, // 01. Type 		: page  | comp | node
					ptype 	= 'human'					) // 02. PageType	: human | robot
	{
		// To load with page details without drupal bootstrap - Only know aliases what is page name

		// this.p('Creating_Urls ' + this.site_url )
		// http://cica.dbrqx.com/

		let base_string 	=	this.http_domainbar   + 'cache/'

		if ( this.site_path.indexOf('ssd') === -1 )
		{
			base_string += 'ssd/'
			this.p('Base_URLString ' + base_string )
		}


		let base_ssl						=	base_string + this.ssl_page 	+ '/'	+ this.domain
		let base_nouser						=	base_string + 'nsu' 			+ '/'	+ this.domain


		this.anonymous_url					= 	base_ssl + '/anonymous/' 		+ this.s.theme + '/' + type + '/' + ptype
		this.authenticated_url				= 	base_ssl + '/authenticated/' 	+ this.s.theme + '/' + type + '/' + ptype

		// Url for types where is not dependent of user
		this.nouser_url						= 	base_nouser  + '/nouser/' 		+ this.s.theme + '/' + type + '/' + ptype

		// https://truck.dbrqx.com/cache/truck.dbrqx.com/anonymous/truck/page/human/a/ru
		// http://cica.dbrqx.com/cache/cica.dbrqx.com/anonymous/peloncita/page/human

		this.ssd_alias_url_auth				=	this.authenticated_url  + '/a/' + this.dash_ideal_uri
		this.ssd_alias_url_anon				=	this.anonymous_url 		+ '/a/' + this.dash_ideal_uri
		this.ssd_alias_url_nouser			=	this.nouser_url 		+ '/a/' + this.dash_ideal_uri

		this.replace(							this.ssd_alias_url_auth		, "ssd", "ram" )
		this.ram_alias_url_auth				=	this.result

		this.replace(							this.ssd_alias_url_anon 	,"ssd", "ram" )
		this.ram_alias_url_anon				=	this.result

		this.replace(							this.ssd_alias_url_nouser 	, "ssd", "ram" )
		this.ram_alias_url_nouser			=	this.result

 		// /ram.../anonymous/peloncita/page/human/a/image_2013_lagos_portugal

	}

	create_drupal_urls(		type 			= 	'page'		,
							ptype 			= 	'human'		,
							theme_name		=	'garland'	)
	{
		// To load once drupal is known. We have direct access to file

		this.s.theme						=	theme_name

		this.ssd_url_auth					=	this.authenticated_url 	+ '/u/' + this.drupal_real_dash_uri
		this.ssd_url_anon					=	this.anonymous_url 		+ '/u/' + this.drupal_real_dash_uri
		this.ssd_url_nouser					=	this.nouser_url 		+ '/u/' + this.drupal_real_dash_uri


		this.replace(							this.ssd_url_anon	, 		"ssd", "ram")
		this.ram_url_anon					=	this.result

		this.replace(							this.ssd_url_auth	, 		"ssd", "ram")
		this.ram_url_auth					=	this.result

		this.replace(							this.ssd_url_nouser	, 		"ssd", "ram")
		this.ram_url_nouser					=	this.result

		// Hay que actualizar el tipo de usuario (pendiente)

		//	this.user_type 			=	'authenticated'

	}

}

exports.uri_urls = uri_urls
