// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Truck ScriptsTag Class  [V.0.0.2]  (2017-12-02)
// Brqx Group - Agile Farmacia Zaragoza Methodology [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts - Version 01 - Js as link
//-------------------------------------------------------------------------------------
//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
//[S_02] <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" defer></script>

//[S_03] <script> JS CODE </script>
// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_truck-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_link_0N-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 			= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'));
		const { html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));


class lnk03_css_minimized_truck extends getset  {

    constructor (     thm	              						)
    {

		super()

		this.n							=	'scr01_truck::'
		this.m							=	'constructor'

		this.thm						=	thm

		this.link_normalize				=	new html_style('link')
		this.link_main					=	new html_style('link')
		this.link_product				=	new html_style('link')
		this.link_flex					=	new html_style('link')

		this.build_data()

    }

	//L[03]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    create_normalize()
    {
		// External Div - Bootstrap style

		this.link_normalize.rel			 		=  'stylesheet'

		this.link_normalize.type						=	'text/css'

		let css_name 							=	'normalize.min.css'

		this.link_normalize.href			 	=
			this.thm.u.http_domainbar + 'r_fassets/libs/css/' + css_name

		this.link_normalize.pcreate()

		this.p(this.link_normalize.code)

		this.code								+=	this.link_normalize.code
	}

	//L[05]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/flexslider.min.css">
    create_flex()
    {
		// External Div - Bootstrap style

		this.link_flex.rel			 			=  'stylesheet'

		this.link_flex.type						=	'text/css'

		let css_name 							=	'flexslider.min.css'

		this.link_flex.href			 			=
			this.thm.u.http_domainbar + 'r_fassets/libs/css/' + css_name

		this.link_flex.pcreate()

		this.code								+=	this.link_flex.code

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

		this.p('DOMAIN_SSL' + this.link_product.href )

		this.link_product.pcreate()

		this.code							+=	this.link_product.code

	}

    build_data()
    {

		this.create_normalize()
		this.create_flex()

		if ( this.thm.b.site_live )
			if (this.thm.b.page_product)
				this.create_product()													;
			else
				this.create_main()
		else
		{
			if (this.thm.b.page_product)
				this.create_product()													;
			this.create_main()

		}

		// Pending [17-11-02]
		// this.p('Code : >' + this.code )

    }

}

exports.lnk03_css_minimized_truck = lnk03_css_minimized_truck
