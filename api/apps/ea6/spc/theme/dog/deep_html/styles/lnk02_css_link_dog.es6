// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog Links Tag Class  [V.0.0.1]  (2018-01-28)
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

var 	cons 				= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.es6"	)

const 	{ getset } 			= 	require(	cons.JS_BASE + 'com/objects/html/getset.es6'			),		
		{ html_style } 		= 	require(	cons.JS_BASE + 'com/objects/html/html_style.es6'		);


class lnk02_css_link_dog extends getset  {

    constructor (     thm	              						)
    {   

		super()

		this.n							=	'lnk02_css_as_link_dog::'						
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
		this.link_jquery.rel			 	=  'stylesheet'														

		this.link_jquery.type			=	'text/css'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_jquery.preload		=	'preload'
			this.link_jquery.as			=	'style'
		}

	
		let jquery_uri					=	
			"https://code.jquery.com/ui/1.12.1/themes/smoothness/"	

		this.link_jquery.href			=  
			jquery_uri + 'jquery-ui.css' 								

		this.link_jquery.pcreate()																		
		
		this.code							+=	this.link_jquery.code										
	}		

	//L[05]  <link rel="stylesheet" href="libs/bootstrap4/css/bootstrap.min.css">
    create_bootstrap()
    {
		let css_name 						=	'bootstrap.min.css'

		this.link_bootstrap.rel			 	=  	'stylesheet'														

		this.link_bootstrap.type			=	'text/css'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_bootstrap.preload		=	'preload'
			this.link_bootstrap.as			=	'style'
		}

		let bootstrap_path					= 	'bootstrap4/css/' 	+ css_name
	
		this.link_bootstrap.href					=  	
				this.thm.u.http_domainbar + 'r_fassets/libs/' + bootstrap_path

		this.link_bootstrap.pcreate()																		
		
		this.code							+=	this.link_bootstrap.code										
	}		


	//L[06]  <link rel="stylesheet" href="assets/css/style.css">
	create_main()
    {
		// Site Url va a ser un array con los distintos uris

		let css_name 						=	'style'

		this.link_main.rel				 	=  	'stylesheet'														

		this.link_main.type					=	'text/css'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_main.preload			=	'preload'
			this.link_main.as				=	'style'
		}
			

		if ( this.thm.b.site_live )		
			css_name 						+=	'_live'				

		this.link_main.href					=  	
				this.thm.u.http_domainbar + 'r_assets/css/' + css_name + '.css'									
	
		this.link_main.pcreate()														
		
		this.code							+=	this.link_main.code					

	}		

	//L[06]  <link rel="stylesheet" href="css/product.css">
	create_product()
    {
		// PENDIENTE DE REVISAR

		let css_name 						=	'product'

		this.link_product.rel				 =  'stylesheet'														

		this.link_product.type				=	'text/css'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_product.preload		=	'preload'
			this.link_product.as			=	'style'
		}
			

		if ( this.thm.b.site_live )		
			css_name 						+=	'_live'				

		this.link_product.href				=  	
				this.thm.u.http_domainbar + 'r_cassets/css/' + css_name + '.css'									
	
		this.link_product.pcreate()														
		
		this.code							+=	this.link_product.code					

	}		

	//L[07]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/flexslider.min.css"/>
    create_flex()
    {
		// External Div - Bootstrap style

		this.link_flex.rel			 		=  	'stylesheet'														

		this.link_flex.type					=	'text/css'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_flex.preload			=	'preload'
			this.link_flex.as				=	'style'
		}
		
		let flexslider_uri					=	"https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/"	
		this.link_flex.href			 		=  	flexslider_uri + 'flexslider.min.css' 								
		this.link_flex.pcreate()																	
		
		this.code							+=	this.link_flex.code										

	}		

	//L[08]  <link rel="stylesheet" href="libs/googleplus/jquery.kyco.googleplusfeed2.css">
    create_googleplus()
    {

		let css_name 						=	'jquery.kyco.googleplusfeed2.css'

		this.link_googleplus.rel	 		=  	'stylesheet'														

		this.link_googleplus.type			=	'text/css'

		if (this.thm.u.ssl_page === "ssl" )
		{
			this.link_googleplus.preload	=	'preload'
			this.link_googleplus.as			=	'style'
		}

		let googleplus_path					= 	'googleplus/' 	+ css_name

		this.link_googleplus.href					=  	
				this.thm.u.http_domainbar + 'r_fassets/libs/' + googleplus_path 									

		this.link_googleplus.pcreate()																	
		
		this.code							+=	this.link_googleplus.code										

	}		

    build_data()
    {
		this.create_jquery()
		this.create_bootstrap()
		this.create_main()
		this.create_flex()
		this.create_googleplus()

/*
		if ( this.thm.b.site_live )		
		{
			// LIVE
			if (this.thm.b.page_product) 	
				this.create_product()													
			else
				this.create_main()
		}
		else
		{
			// DEV
			if (this.thm.b.page_product) 	
				this.create_product()													
			this.create_main()


		}
		// Ok [18-01-11]
*/
		// this.p('Code : >' + this.code ) 											

    } // End method

} // End class

exports.lnk02_css_link_dog = lnk02_css_link_dog
