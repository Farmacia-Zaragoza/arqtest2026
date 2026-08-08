// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog ScriptsTag Class  [V.0.0.2]  (2017-12-02)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Dog Structure Scripts - Version 01 - Js as link
//-------------------------------------------------------------------------------------
//L[04]  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
//L[05]  <link rel="stylesheet" href="libs/bootstrap4/css/bootstrap.min.css">
//L[06]  <link rel="stylesheet" href="assets/css/style.css">
//L[07]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/flexslider.min.css"/>
//L[08]  <link rel="stylesheet" href="libs/googleplus/jquery.kyco.googleplusfeed2.css">
// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_dog-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_link_0N-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ getset } 			= 	require(path.join(JS_BASE, 'com/objects/html/getset.es6'))
		const { html_style } = require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))

class lnk03_css_minimized_dog extends getset  {

    constructor (     thm	              						)
    {

		super()

		this.n							=	'scr01_dog::'
		this.m							=	'constructor'

		this.thm						=	thm

		this.link_jquery				=	new html_style('link')
		this.link_bootstrap				=	new html_style('link')
		this.link_main					=	new html_style('link')
		this.link_flex					=	new html_style('link')
		this.link_googleplus			=	new html_style('link')

		this.build_data()

    }

	//L[04]  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    create_jquery()
    {

		this.link_jquery.rel		 		=  	'stylesheet'

		this.link_jquery.type				=	'text/css'

		let css_name 						=	'jquery-ui_min.css'

		this.link_jquery.href			 	=
			this.thm.u.http_domainbar + 'r_fassets/ilibs/css/' + css_name

		this.link_jquery.pcreate()

		this.code							+=	this.link_jquery.code
	}

	//L[05]  <link rel="stylesheet" href="libs/bootstrap4/css/bootstrap.min.css">
    create_bootstrap()
    {

		this.link_bootstrap.rel		 		=  	'stylesheet'

		this.link_bootstrap.type			=	'text/css'

		let css_name 						=	'bootstrap.min.css'

		let bootstrap_path					= 	'bootstrap4/js/' 	+ css_name

		this.link_bootstrap.href		 	=
			this.thm.u.http_domainbar + 'r_fassets/libs/' + bootstrap_path

		this.link_bootstrap.pcreate()

		this.code								+=	this.link_bootstrap.code
	}

	//L[05]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/flexslider.min.css">
    create_flex()
    {
		// External Div - Bootstrap style

		this.link_flex.rel			 			=  	'stylesheet'

		this.link_flex.type						=	'text/css'

		let css_name 							=	'flexslider.min.css'

		this.link_flex.href			 			=
			this.thm.u.http_domainbar + 'r_fassets/ilibs/css/' + css_name

		this.link_flex.pcreate()

		this.code								+=	this.link_flex.code

	}

	//L[08]  <link rel="stylesheet" href="libs/googleplus/jquery.kyco.googleplusfeed2.css">
    create_googleplus()
    {

		this.link_googleplus.rel		 		=  	'stylesheet'

		this.link_googleplus.type			=	'text/css'

		let css_name 						=	'jquery.kyco.googleplusfeed2_min.css'

		let googleplus_path					=	'googleplus/' 	+ css_name

		this.link_googleplus.href		 	=
			this.thm.u.http_domainbar + 'r_fassets/libs/' + googleplus_path

		this.link_googleplus.pcreate()

		this.code								+=	this.link_googleplus.code
	}

	//L[06]  <link rel="stylesheet" href="css/main.css">
	create_main()
    {
		// Site Url va a ser un array con los distintos uris

		this.link_main.rel					 	=  'stylesheet'

		this.link_main.type						=	'text/css'

		let css_name							=	'main'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_main.preload				=	'preload'
			this.link_main.as					=	'style'
		}

		if ( this.thm.b.site_live ) 		css_name	+=	'_live'

		this.link_main.href						=
				this.thm.u.http_domainbar + 'r_cassets/css/' + css_name + '_min.css'

		this.link_main.pcreate()

		this.code								+=	this.link_main.code

	}

	//L[06]  <link rel="stylesheet" href="css/product.css">
	create_product()
    {
		// Site Url va a ser un array con los distintos uris

		this.link_product.rel			 	=  'stylesheet'

		this.link_product.type				=	'text/css'

		let css_name						=	'product'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_product.preload		=	'preload'
			this.link_product.as			=	'style'
		}

		if ( this.thm.b.site_live ) 		css_name	+=	'_live'

		// Ojo con ssl
		this.link_product.href				=
				this.thm.u.http_domainbar + 'r_cassets/css/' + css_name + '_min.css'

		this.link_product.pcreate()

		this.code							+=	this.link_product.code

	}

    build_data()
    {

		this.create_jquery()
		this.create_bootstrap()
		this.create_main()
		this.create_flex()
		this.create_googleplus()

		// Pending [17-11-02]
		// this.p('Code : >' + this.code )

    }

}

exports.lnk03_css_minimized_dog = lnk03_css_minimized_dog

