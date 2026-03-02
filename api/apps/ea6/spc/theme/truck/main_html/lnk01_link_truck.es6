// [DOCHANGED_PHP52_NODE]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Html Div Class  [V.0.0.3]  (2017-12-06)
// Brqx Group - Agile Farmacia Zaragoza Methodology - Truck [EA6]
//-------------------------------------------------------------------------------------
// Flat Structure Links
//-------------------------------------------------------------------------------------
//L[01]  <link rel="icon" type="image/svg" href="favicon.ico">
//L[02]  <link rel="apple-touch-icon" href="apple-touch-icon.svg">
//L[03]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
//L[04]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/flexslider.min.css">
//L[05]  <link rel="stylesheet" href="cassets/css/main.css">

// ------------------------------------------------------------------------------------
//* LINK *
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: lnk01_link_truck
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 							= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"						);

const 	{ getset } 						= 	require(	cons.JS_BASE + 'com/objects/html/getset.es6'			),		
		{ lnk02_css_as_link_truck }		= 	require(	cons.JS_BASE + 'spc/theme/truck/deep_html/types/styles/lnk02_css_as_link_truck.es6'		),
		{ lnk03_css_minimized_truck }	= 	require(	cons.JS_BASE + 'spc/theme/truck/deep_html/types/styles/lnk03_css_minimized_truck.es6'	),
		{ lnk04_css_inline_truck }		= 	require(	cons.JS_BASE + 'spc/theme/truck/deep_html/types/styles/lnk04_css_inline_truck.es6'		),
		{ lnk05_css_inline_truck }		= 	require(	cons.JS_BASE + 'spc/theme/truck/deep_html/types/styles/lnk05_css_inline_multiple_truck.es6'	),
		{ html_style } 					= 	require(	cons.JS_BASE + 'com/objects/html/html_style.es6'		)		

class lnk01_link_truck extends getset  {
 
    constructor (     thm										)
    {   

        super()															

		this.n							=	'lnk_truck::'					

		this.thm						=	thm								

		// External object
		this.script_to_load				=	''

		// tag object
     	this.linktag					= 	''								 
	
		this.link_favicon				=	new html_style('link') 		
		this.link_apple					=	new html_style('link') 		
	
		this.build_data()												

    }

	//L[01]  <link rel="icon" type="image/png" href="favicon.ico">
    create_favicon()
    {
		// Link Icon - ya convertido a buena url
						
		this.link_favicon.rel					=	'icon'												
		this.link_favicon.type					=	'image/png'											
		this.link_favicon.href					=  	
				this.thm.u.http_domainbar + 'r_img/icons/favicon.ico'				

		this.link_favicon.pcreate()														
		
		this.code						+=	this.link_favicon.code						
	}		

	//L[02]  <link rel="apple-touch-icon" href="apple-touch-icon.png">
    create_apple()
    {
						
		this.link_apple.rel					=	'apple-touch-icon'									
		this.link_apple.type					=	'image/png'											
		this.link_apple.href					=  	
				this.thm.u.http_domainbar + 'r_img/icons/apple-touch-icon.svg'				

		this.link_apple.pcreate()													
		
		this.code						+=	this.link_apple.code						
	}		

    build_data()
    {
		
		this.create_favicon()											
		this.create_apple()											

		// Esta parte puede generarse de muchas formas
		// 1.como script
		// 2.como script minimizado
		// 3.inline

		this.p('CHECKING_SITE_OPTIONS [' +  this.thm.s.env + '] ' + this.thm.s.live_opt)


		if ( !this.thm.b.site_live )
				this.script_to_load 	= 	new lnk02_css_as_link_truck(this.thm)
		else
		{

			if 		( this.thm.s.live_opt === 'script')
				this.script_to_load 	= 	new lnk02_css_as_link_truck(this.thm)
			else if 	( this.thm.s.live_opt === 'minimized')
				this.script_to_load 	= 	new lnk03_css_minimized_truck(this.thm)
			else if 	( this.thm.s.live_opt === 'inline')
				this.script_to_load 	= 	new lnk05_css_inline_truck(this.thm)
			else if 	( this.thm.s.live_opt === 'inline_and_save')
			{
				this.script_to_load 	= 	new lnk05_css_inline_truck(this.thm)
			}
			else
				this.p('wrong_parameter ' + this.thm.s.live_opt )
		}

		this.code				+=	this.script_to_load.code	

		// Ok [17-12-17]
		// this.p('Code : >' + this.code ) 											
		// this.dd('Code >'  + this.code) 								

    }

}

exports.lnk01_link_truck = lnk01_link_truck
