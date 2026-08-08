//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - URI Class  [V.0.1.4]  (2017-12-06)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Class: c-uri-
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ uri_front } 		= 	require(	path.join(JS_BASE, 'com/objects/drupal/uri/u02_front.es6'));
 	 	match 				= 	require(	path.join(JS_BASE, 'com/libs/string/match.es6'));
		urldecode 			= 	require(	'urldecode'								),
		iconv 				= 	require(	'iconv-lite'							),
		path	 			= 	require(	'path'													);


class uri extends uri_front {
	constructor(	s 						= ""		,	// Site
					ir						=	'' 		,	// Request
					sch						=	''		, 	// Mongo Html Scheme
					drupal_real_uri_passed 	= 	""		)
	{
		super()
		this.n 				= "uri::"

		this.s 				= 	s
		this.ir				=	ir				// Index request
		this.sch			=	sch

		this.b 				= 	this.s.b
		this.c 				= 	this.s.c
		this.site_path 		= 	path.resolve(".")

		// this.drupal_real_uri = 	drupal_real_uri_passed

		// request_uri = location.pathname + location.search;
		// request.headers.host - request.headers["x-forwarded-host"]

		this.domain 		= this.ir.domain

		// Global replace works

		this.replace(this.domain , '.' , "_" )
		this.dash_domain 	= this.result

		this.port 			= this.ir.port
		// req.secure
		this.server_protocol = this.ir.protocol

		var isSecure = false

		if (this.server_protocol 		== "https") isSecure = true


		if (isSecure) {
			this.ssl_page = "ssl"
			this.http_domain = "https://" + this.domain
		}
		else {
			this.ssl_page = "nnn"
			this.http_domain = "http://" + this.domain
		}

		// To change for siteurl
		this.http_domainbar = this.http_domain + '/'

		if (this.port == 80 || this.ssl_page == "nnn")
		{
			this.dash_port = "_" + "http" + "_"
		}
		else if (this.port == 443 || this.ssl_page == "ssl")
				this.dash_port = "_" + "https" + "_"
		else this.dash_port = "_" + this.port + "_"

		if ( drupal_real_uri_passed == "")
		{
			this.uri = this.ir.uri
		}
		else
		{
			this.uri = this.drupal_real_uri
		}

		// fr/hola
		// this.p('CURRENT_URI ' + this.uri)


		// Gestion de metodos via uri --- ENABLED ONE ARGUMENT
		var pos = this.strpos(this.uri, "@")
		if (pos !== false)
		{
			this.search_method = this.uri.substr(pos + 1, len)
			this.url_method = this.search_method
			// this.p('URL_METHOD ' + this.url_method)
			this.uri = this.uri.substr(0,pos )
		}

		// Todas las uris seran con una barra delante - al menos para gestionarlo
		// ----------------------------------------------------------------------------------------

		if (this.uri.substr(0, 1) != "/") this.uri = '/' + this.uri


		// Text Replace Php Idea

		this.replace(				this.uri	, 		"/", "_")
		this.dash_uri				=	this.result



		if (this.dash_uri == "_" ||
			this.dash_uri == "") //A. FRONT PAGE
		{
			// this.p('MANAGING_FRONT')
			this.manage_front()
		}
		else
		{

		// ------------------------- [STA] NO FRONT CHECK ---------------------------
			if (this.b.site_lang && this.b.site_lang_uri)
			{
			// --------------------- [STA] MULTI LANGUAGE CHECK ---------------------

				//this.p('MANAGING_LANG_MULTI_LANG')

				var passed_lang_site = this.s.default_lang

				this.lang_site = this.dash_uri.substr(1, 2)

				if (this.s.arr['allowed_langs'].includes(this.lang_site))
				{
					this.b.page_multi_language 	= true
					var new_dash_uri 			= this.dash_uri.substr(3)
					var new_sash_uri 			= this.uri.substr(3)

					// _hola
					this.p('dash_uri '+ new_dash_uri)

					this.dash_uri 				= new_dash_uri
					this.uri 					= new_sash_uri
					this.s.lang 				= this.lang_site
				}
				else
				{
					// Si el idioma no esta entre los permitidos. Cargamos front
					this.s.lang 				= this.s.default_lang
					this.manage_front()

				}

				if (this.uri.substr(0, 1) != "/") this.compouri = this.uri
				else this.compouri = this.uri.substr(1)

				if (this.dash_uri == "_" || this.dash_uri == "")
				{
					this.manage_front()
				}
			}

			if ((this.dash_uri == "_cookies" ) ||
				(this.dash_uri == "cookies_" ) ||
				(this.dash_uri == "_cookies_") ||
				(this.dash_uri == "_policy"  ))
					this.b.page_cookies = true


			// Metodo correcto - Falla Iconv al instalarse en ubuntu
			// var iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT')
			// var dasclean = iconv.convert (this.dash_uri)

			// Esto no esta funcionando - QUEDA PENDIENTE
			// var dasclean = iconv.decode(Buffer(this.dash_uri), "utf-8")
			var dasclean = this.dash_uri

			// var dasclean = iconv("utf-8", "ascii//TRANSLIT", this.dash_uri)

			var dash_uri = dasclean.toLowerCase()
			var len = dash_uri.length
			var len_pre = len - 1

			if (this.uri.substr(len_pre, len) == "/")
			{
				this.dash_uri 		= this.dash_uri.substr(0, len_pre)
				this.uri 			= this.uri.substr(0, len_pre)
			}

			if (dash_uri.substr(0, 1) == "_") {
				this.dash_uri 		= dash_uri.substr(1, len)
				this.no_slash_uri 	= this.uri.substr(1, len)
			}
			else
			{
				this.dash_uri 		= dash_uri
				this.no_slash_uri 	= this.uri
			}

			var uri_arr = this.no_slash_uri.split("/")

			// -------------------------------- OJO - COMPROBAMOS URIS SIN SLASH/DASH ----------------------------------

			if (uri_arr.length > 1)
			{
				// MULTIPLES CAMPOS - URIS COMPLEJAS

				this.b.page_multi_parameter = true
				this.url_parameter_type = "multi"

				this.page_command	= uri_arr[0]

				this.page_name		=	''

				var c = 1
				while (c < uri_arr.length-1 )
				{
					this.page_args		+= uri_arr[c] + '/'
					c++
				}

				if (c == uri_arr.length -1 )
				{
					this.page_args		+= uri_arr[c]
				}

				// Intelligent commands idea
				if (this.page_command.substr(0, 1) == 	"i")
				{
					this.b.page_intelligent 		= 	true
					this.page_command 				= 	this.page_command.substr(1)
				}

				this.page_iargs 					= 	match.sort_query(this.page_args)
				this.slash_sub_query 				= 	this.page_iargs

				this.replace( this.page_iargs , '/' , '_')
				this.page_name						= 	this.result
				this.dash_sub_query					=	this.page_name

				this.slash_ideal_uri 				= 	this.page_command + "/" + this.slash_sub_query
				this.dash_ideal_uri 				= 	this.page_command + "_" + this.dash_sub_query
			}
			else
			{
				// SOLO UN CAMPO EN LA URI

				this.slash_sub_query 	= 	""
				this.dash_sub_query 	= 	""
				this.slash_ideal_uri 	= 	this.no_slash_uri
				this.dash_ideal_uri 	= 	this.dash_uri

				// Si solo hay un parametro - ese parametro es la uri
				this.page_command		= 	this.no_slash_uri
				this.page_name			= 	'blanc'
			}

			// this.parr(this.s.arr['allowed_commands'])

			if (!this.b.page_front 				&&
				!this.b.page_cookies 			&&
				!this.s.arr['allowed_commands'].includes(this.page_command))
			{
				this.p("NO_ALLOWED_COMAND - ENTERING_FRONT")
				this.manage_front()
			}
			else //Tipos de comandos
			{
				if (this.page_command == "product") this.b.page_product = true
			}

			// Esta parte esta pendiente
			// if (preg_match("/['^\xA3$%&*()}{#~><>,|+\xAC-]/", this.uri))
			// {
			//		this.uri = urldecode(this.uri)
			// }
		}

		this.start_dash 				= this.dash_uri.substr(0, 5)
		this.start_dash_03 				= this.dash_uri.substr(0, 3)

		this.url 						= this.http_domain + "/" + this.uri

		this.dash_url 					= this.dash_domain + "_" + this.dash_uri
		this.dash_url_port 				= this.dash_domain + this.dash_port + this.dash_uri
		this.site_url 					= this.http_domain + "/"
		this.lang_url 					= this.site_url + this.s.lang + "/"

		// Php $this->arr['url'][]		=		$this->site_url														;

		this.arr['url'].push(this.site_url)

		if (this.page_type 	== "private") this.s.load = "drupal"
		if (this.s.load 	== "drupal") this.set_anonymous_cacheable()

		// String page
		var sep = '-'

		this.page_string = 	''

		//Ej : truck-y-node_dbrqx_com-fr-ssl-human-product-list

		this.page_string += this.s.name			+ sep	// 01 site (truck)
		this.page_string += this.s.slan 		+ sep	// 02 this.s.slan (y|n)
		this.page_string += this.dash_domain 	+ sep	// 03 this.dash_domain
		this.page_string += this.s.lang			+ sep	// 04 this.s.lang
		this.page_string += this.ssl_page		+ sep	// 05 this.u.ssl_page [ssl|nnn]
		this.page_string += this.s.live_opt		+ sep	// 06 Live Site opt [script|minimized|inline]
		this.page_string += this.s.robot		+ sep	// 07 this.s.robot
		this.page_string += this.page_command	+ sep	// 08 this.u.page_command
		this.page_string += this.page_name				// 09 page name

		this.p  ('01_SITE-02_IS_SSL-03_DOMAIN-04_LANG-05_SSL-06_LIVE_OPT-07_ROBOT-08_COMMAND-09_PAGE')
		this.pnn('PAGE_STRING ' + this.page_string)
		this.pnn('PAGE_URI ' 	+ this.dash_uri)

		this.create_paths("page", this.s.robot)
	}

}

exports.uri = uri
