// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - URI Class  [V.0.1.3]  (2017-07-12)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-set_anonymous_cacheable-   	  : Set urls to be cacheable for anonymous user
// - d-create_drupal_paths-			  : Create path for drupal bootstrap
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ uri_reload } 		= 	require(path.join(JS_BASE, 'com/objects/drupal/uri/u03_reload.es6'))

class uri_front extends uri_reload {

	constructor()
	{
		super()
		this.n 							= 	'uri_front::'
	}

	manage_front()
	{
		// Assign a front string to an empty uri for file generation
		// Convierte cualquier uri en front
		// Lo que no se es la gestion multi lang

		// A. FRONT PAGE
		this.dash_uri				=	'front'													 // Main home
		// This could to change with language
		this.uri					= 	'front'

		this.compouri				=	''

		if (this.b.page_multi_language)
		// Aqui tengo dudas
			this.dash_url 				= 	this.dash_domain + this.dash_port + '_' + this.s.lang + '_' + this.dash_uri
		else
			this.dash_url 				= 	this.dash_domain + this.dash_port +  this.dash_uri

		// this.p('Managing_front_lang ' + this.dash_url )
 		// truck_dbrqx_com_https_front

		this.b.page_front				=	true


		// Debemos definirlas pues las usamos para la generacion de paths
		this.slash_ideal_uri			= 	this.uri
		this.dash_ideal_uri				= 	this.uri

		this.s.robot					=	'human'
		this.page_command				=	'blanc'
		this.page_name					=	'blanc'

	}

}

exports.uri_front = uri_front

