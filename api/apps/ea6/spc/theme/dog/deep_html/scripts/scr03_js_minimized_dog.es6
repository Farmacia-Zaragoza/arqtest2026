// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog Scripts Minimized Class  [V.0.0.1]  (2018-02-01)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts - Version 01 - Js as scripts
//-------------------------------------------------------------------------------------
//[S_01] <script src="https://apis.google.com/js/platform.js"></script>
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


const 	{ getset } 			= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'));
		const { html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));


class scr03_js_minimized_dog extends getset  {

    constructor (     thm	              						)
    {
		super()

		this.n								=	'scr01_truck::'
		this.m								=	'constructor'

		this.thm							=	thm

		this.script_01						=	new html_style('script')

		this.build_data()

    }

	// [S_01] <script src="https://apis.google.com/js/platform.js">
    create_google()
    {
		this.script_01.defer				=  	'defer'
		this.script_01.async				=  	'async'

		// It is already minimized
		let js_name							=	'platform.js'

		let js_path							= 	'js/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/ilibs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	//[S_02] libs/jquery/jquery-3.2.1.min.js
    create_jquery()
    {

		this.script_01.async				=  	''

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
		this.script_01.async				=  	''

		let js_name							=	'popper.min.js'

		let js_path							= 	'js/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/ilibs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	// [S_04] src="libs/bootstrap4/js/bootstrap.min.js"
    create_bootstrap()
    {
		this.script_01.async				=  	''

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
		this.script_01.async				=  	''

		let js_name							=	'jquery-ui.min.js'

		let js_path							= 	'js/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/ilibs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	// [S_06] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/jquery.flexslider.min.js">
    create_flex()
    {
		this.script_01.async				=  	''

		let js_name							=	'jquery.flexslider.min.js'

		let js_path							= 	'js/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/ilibs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	// [S_07] <script src="libs/googleplus/jquery.kyco.googleplusfeed2.min.js">
    create_googleplusfeed()
    {
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
		this.script_01.async				=  	''

		let js_name							=	'js.cookie.min.js'

		let js_path							= 	'js/' + js_name

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_fassets/ilibs/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	//[S_09] <script src="assets/js/cookies_min.js"></script>
    create_cookies()
    {
		this.script_01.async				=  	''

		let js_name							=	'cookies'

		if ( this.thm.b.site_live ) 			js_name += '_live_min'

		let js_path							= 	'js/' + js_name	+ '.js'

		this.script_01.src					=
			this.thm.u.http_domainbar + 'r_assets/' + js_path

		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}


	//[S_10] <script src="assets/js/product.js" defer></script>
	create_product()
    {
		this.script_01.async				=  	''
		// External Div
		let js_name 								=	'product'

		// Live Enviroment

		if ( this.thm.b.site_live ) 			js_name += '_live'

		this.script_01.src				=
				this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '_min.js'


		this.script_01.pcreate()

		this.code							+=	this.script_01.code
	}

	//[S_10] <script src="assets/js/main.js" defer></script>
	create_main()
    {
		this.script_01.async				=  	'async'

		// External Div
		let js_name 								=	'main'

		// Live Enviroment

		if ( this.thm.b.site_live ) 			js_name += '_live'

		this.script_01.src				=
				this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '_min.js'


		this.script_01.pcreate()

		this.code							+=	this.script_01.code
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

		// Pending [17-11-02]
		// this.p('Code : >' + this.code )

    }

}

exports.scr03_js_minimized_dog = scr03_js_minimized_dog
