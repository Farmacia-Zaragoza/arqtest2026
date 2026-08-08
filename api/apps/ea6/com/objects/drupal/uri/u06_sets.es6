// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Drupal Set Uri Based Class  [V.0.1.2]  (2017-08-25)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-set_anonymous_cacheable-   	  : Set urls to be cacheable for anonymous user
// - d-set_admin_cacheable-   	      : Set urls to be cacheable for anonymous user
// - d-set_alias_for_drupal-		  : Generate drupal paths
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ uri_defs_urls } 		= require(path.join(JS_BASE, 'com/objects/drupal/uri/u07_defs_urls.es6'))
		const url = require(path.join(JS_BASE, 'com/libs/string/url.es6'))

class uri_sets extends uri_defs_urls {

	constructor()
	{
		super()
		this.n 							= 	'uri_sets::'
	}

	set_anonymous_cacheable()
	{
		// Gestion antigua de uris basadas en DRUPAL - Pendiente de reajustar al formato inteligente

		// this.p('url :' + this.url + ' -dash: ' + this.dash_uri  )
		// To check pages is needed to be authenticated
		if 		(	this.dash_uri 		== "user" 		)
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'public'
		}
		else if 	((	this.dash_uri 		== "admin" 		) ||
				 ( 	this.dash_uri 		== "_admin" 	) ||
				 (	this.dash_uri 		== "_admin_" 		))
		{
			this.is_cacheable				= 	'no'
			this.is_admin_cacheable		= 	'yes'
			this.page_type				=	'private'
		}
		else if 	(	this.dash_uri 		== "node_add" 	)
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'private'
					}
		else if 	(	this.start_dash 		== "darde" 	)
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'private'
		}
		else if 	( 	this.start_dash 		== "user_" 		)
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'public'
		}
		else if 	( 	this.start_dash_03 	== "dwn" 		)
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'public'
			this.is_download     			= 	'yes'
		}
		else if 	( 	this.start_dash 		==  'image'			)
		{
			// File structure
			//this.p('Is File structure')
			this.is_cacheable				= 	'yes'
			this.page_type				=	'public'
			this.is_file_page     		= 	'yes'
		}

		else if 	(	this.dash_uri 		== "admin_build_block" )
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'private'
			// Hay que regenerar los bloques - Sabemos que es anonimo la primera vez
		}
		else if 	( 	this.start_dash 		== "admin" 		)
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'private'
		}
		else if 	( strpos(this.dash_uri, '_edit') !== false )
		{
			this.is_cacheable				= 	'no'
			this.is_admin_cacheable		= 	'no'
			this.page_type				=	'private'
			// aqui igual no podemos hacerlo o bien si podemos por url
		}
		else if 	( strpos(this.dash_uri, '_clone') !== false )
		{
			this.is_cacheable				= 	'no'
			this.is_admin_cacheable		= 	'no'
			this.page_type				=	'private'
		}
		else if 	( this.start_dash == 'searc' )
		{
			// Preparacion para las busquedas
			// De momento con search - luego con cualquier cadena no identificable

//			print 'Uri - Start Dash  ' + this.start_dash + '<br>'

			this.is_cacheable				= 	'no'
			this.is_admin_cacheable		= 	'no'
			this.is_search_page			= 	'yes'
			this.page_type				=	'public'
		}

		// Never cache edit or clone pages :
		// /ram/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/cache/cica.dbrqx.com/anonymous/garsintife/page/human/a/node_76926_edit?destination=admin%2fcontent%2fnode_code

	}

	set_admin_cacheable()
	{
		// To check pages is needed to be authenticated
		if 		(	this.dash_uri 		== "user" 		)
		{
			this.is_cacheable		= 	'no'
		}
		else if 	((	this.dash_uri 		== "admin" 		) || (	this.dash_uri 		== "_admin" 		) || (	this.dash_uri 		== "_admin_" 		))
		{
			this.is_cacheable				= 	'no'
			this.is_admin_cacheable		= 	'yes'
			this.page_type				=	'private'
		}
		else if 	(	this.dash_uri 		== "node_add" 	)
		{
			this.is_cacheable		= 	'no'
			this.page_type				=	'private'
					}
		else if 	(	this.start_dash 		== "darde" 	)
		{
			this.is_cacheable				= 	'no'
			this.page_type				=	'private'
		}
		else if 	( 	this.start_dash 		== "user_" 		)
		{
			// Puede ser user/login
			this.is_cacheable				= 	'no'
			this.page_type				=	'public'
		}

		else if 	(	this.dash_uri 		== "admin_build_block" )
		{
			this.is_cacheable		= 	'no'
			this.page_type				=	'private'
			// Hay que regenerar los bloques - Sabemos que es anonimo la primera vez
			this.dnode					=	new cn02_delete(this) // Borramos los bloques ya generados
		}
		else if 	( 	this.start_dash 		== "admin" 		)
		{
			this.is_cacheable		= 	'no'
			this.page_type				=	'private'
		}
		else if 	( strpos(this.dash_uri, '_edit') !== false )
		{
			this.is_cacheable				= 	'no'
			this.is_admin_cacheable		= 	'no'
			this.page_type				=	'private'
			// aqui igual no podemos hacerlo o bien si podemos por url
			this.dnode					=	new dn01_base(this) // Borramos el nodo
		}
		else if 	( strpos(this.dash_uri, '_clone') !== false )
		{
			this.is_cacheable				= 	'no'
			this.is_admin_cacheable		= 	'no'
			this.page_type				=	'private'
		}

		// Never cache edit or clone pages :
		// /ram/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/cache/cica.dbrqx.com/anonymous/garsintife/page/human/a/node_76926_edit?destination=admin%2fcontent%2fnode_code

	}

	set_alias_for_drupal(	theme_path 		=	'' 			,
											user_uid 			= 	0			,
											theme_name			= 'garland'		,
											type 				= 'page'		,
											ptype 				= 'human'		)
	{

		this.b.drupal_bootstrap		=	true

		if (this.drupal_real_uri == '')
		{
			// Esto es de php. En node nunca funcionara
			this.drupal_real_uri			=	_GET['q']									 // node/344
			// Cuando es anonomo esto llega vacio. Incluso con _GET

			// Sabemos que es una anonimo intentando accedera admin
			if (this.drupal_real_uri == '')
			{
				// Sabemos que es una anonimo intentando accedera admin
				this.drupal_real_uri = 'unauthorized_access'
			}
		}
		this.drupal_real_slash_uri	= 	'/' + this.drupal_real_uri				 // /node_344

		// global replace
		var str_aux						=	new url.replace(this.drupal_real_uri,'/','_')
		this.drupal_real_dash_uri		= 	str_aux.result

		// esta llegando vacio
//		print 'Uri - Drupal Real Uri 	' + this.drupal_real_uri + '<br>'
//		print 'Uri - Drupal Slash Uri 	' + this.drupal_real_slash_uri + '<br>'
//		print 'Uri - Drupal Dash Uri 	' + this.drupal_real_dash_uri + '<br>'

		this.drupal_node_url		=	this.http_url + this.drupal_real_uri
		this.theme_path			=	theme_path

		// Update Drupal User
		this.drupal_user_uid		=	user_uid

		if (this.drupal_user_uid != 0	)
				this.user_type	=	'authenticated'

		//this.p('User type ' + this.user_type + ' UID ' + this.drupal_user_uid )

		this.s.theme_name			=	theme_name

		//node_real	=	_SERVER['PHP_SELF'] // index.php

		this.create_drupal_paths(type, ptype, theme_name)
	}
}

exports.uri_sets = uri_sets

