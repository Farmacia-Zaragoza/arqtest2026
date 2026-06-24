// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog Scripts Tag Class  [V.0.0.1]  (2018-01-01)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts - Version 01 - Js as scripts
//-------------------------------------------------------------------------------------

//[S_01] <script async src="https://apis.google.com/js/platform.js"></script>
//[S_02] <script src="libs/jquery/jquery-3.2.1.min.js"></script>
//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
//[S_04] <script src="libs/bootstrap4/js/bootstrap.min.js"></script>
//[S_05] <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
//[S_06] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/jquery.flexslider.js"></script>
//[S_07] <script src="libs/googleplus/jquery.kyco.googleplusfeed2.js"></script>
//[S_08] <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
//[S_09] <script src="assets/js/cookies.js"></script>
//[S_10] <script src="assets/js/main.js"></script>

// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_truck-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_script_0N-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 			= 	require(	cons.JS_BASE + 'com/objects/html/getset.es6'			),
		{ html_style } 		= 	require(	cons.JS_BASE + 'com/objects/html/html_style.es6'		);


class scr02_js_scripts_dog extends getset  {

    constructor (     thm	              						)
    {

		super()

		this.n								=	'scr01_truck::'
		this.m								=	'constructor'

		this.thm							=	thm

		// To manage main scripts
		this.script_01						=	new html_style('script')

		this.script_origin					=	new html_style('script')

		this.build_data()

    }

	// [S_01] <script async src="https://apis.google.com/js/platform.js">
    create_google()
    {
		this.script_01.defer				=  	''

		this.script_01.async				=  	'async'

		let js_name							=	'platform.js'

		let js_uri							=	"https://apis.google.com/js/"

		this.script_01.src		 			=  	js_uri + js_name
		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	//[S_02] libs/jquery/jquery-3.2.1.min.js
    create_jquery()
    {
		this.script_01.async				=  	''

		this.script_01.defer				=  	''

		let js_name							=	'jquery-3.2.1.min.js'

		let js_path							= 	'jquery/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/libs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous">
    create_popper()
    {
		// this.script_origin.defer			=  	'defer'
		this.script_01.async				=  	''

		this.script_01.defer				=  	''

		this.script_origin.integrity		=
			'sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4'

		this.script_origin.crossorigin		=  	'anonymous'

		let js_name							=	'popper.min.js'

		let js_uri							=	"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/"

		this.script_origin.src		 		=  	js_uri + js_name
		this.script_origin.pcreate()

		this.code							+=	this.script_origin.code
	}

	// [S_04] src="libs/bootstrap4/js/bootstrap.min.js"
    create_bootstrap()
    {
		// this.script_01.defer				=  	'defer'
		this.script_01.async				=  	''

		this.script_01.defer				=  	''

		let js_name							=	'bootstrap.min.js'

		let js_path							= 	'bootstrap4/js/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/libs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	//[S_05] <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    create_jquery_ui()
    {
		// this.script_origin.defer			=  	'defer'
		this.script_01.async				=  	''

		this.script_01.defer				=  	''

		this.script_origin.integrity		=
			'sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU='

		this.script_origin.crossorigin		=  	'anonymous'

		let js_name							=	'jquery-ui.min.js'

		let js_uri							=	"https://code.jquery.com/ui/1.12.1/"

		this.script_origin.src		 		=  	js_uri + js_name
		this.script_origin.pcreate()

		this.code							+=	this.script_origin.code
	}

	// [S_06] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/jquery.flexslider.js">
    create_flex()
    {
		// this.script_01.defer				=  	'defer'
		this.script_01.async				=  	''
		this.script_01.defer				=  	''

		let js_name							=	'jquery.flexslider.js'

		let js_uri							=	"https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/"

		this.script_01.src		 			=  	js_uri + js_name
		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	// [S_07] <script src="libs/googleplus/jquery.kyco.googleplusfeed2.min.js">
    create_googleplusfeed()
    {
		// this.script_01.defer				=  	'defer'

		this.script_01.defer				=  	''
		this.script_01.async				=  	'async'

		let js_name							=	'jquery.kyco.googleplusfeed2.min.js'

		let js_path							= 	'googleplus/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/libs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	// [S_08] <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
    create_js_cookie()
    {
		// this.script_01.defer				=  	'defer'
		this.script_01.async				=  	''

		this.script_01.defer				=  	''

		let js_name							=	'js.cookie.min.js'

		let js_uri							=	"https://cdn.jsdelivr.net/npm/js-cookie@2/src/"

		this.script_01.src		 			=  	js_uri + js_name
		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	//[S_09] <script src="assets/js/cookies.js"></script>
    create_cookies()
    {
		// this.script_01.defer				=  	'defer'

		this.script_01.defer				=  	''

		this.script_01.async				=  	''

		let js_name							=	'cookies.js'

		let js_path							= 	'js/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_assets/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}


	//[S_10] <script src="assets/js/main.js" defer></script>
	create_main()
    {
		// External Div
		let js_name 						=	'main'

		this.script_01.defer				=  	''
		this.script_01.async				=  	'async'

		// Live Enviroment

		if ( this.thm.b.site_live )
			js_name 						+=	'_live'

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '.js'


		this.script_01.pcreate()

		this.code							+=	this.script_01.code

	}

	//[S_09] <script src="assets/js/main.js" defer></script>
	create_product()
    {
		// External Div
		let js_name 						=	'product'

		// this.script_01.defer				=  	'defer'
		this.script_01.async				=  	''

		this.script_01.defer				=  	''

		// Live Enviroment

		if ( this.thm.b.site_live )
			js_name 						+=	'_live'

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '.js'


		this.script_01.pcreate()

		this.code							+=		this.script_01.code

	}

    build_data()
    {

		this.create_google()
		this.create_jquery()
		this.create_popper()
		this.create_bootstrap()
		this.create_jquery_ui()
		this.create_flex()
		this.create_googleplusfeed()
		this.create_js_cookie()
		this.create_cookies()

		// PRODUCT SIDE IS PENDING
		if ( this.thm.b.site_live )
			if (this.thm.b.page_product)
				this.create_product()													;
			else
				this.create_main()
		else
		{
			if (this.thm.b.page_product)
				this.create_product()													;
			else
				this.create_main()
		}

		// Ok [18-01-01]
		// this.p('js_Code : >' + this.code )

    }

}

exports.scr02_js_scripts_dog = scr02_js_scripts_dog
