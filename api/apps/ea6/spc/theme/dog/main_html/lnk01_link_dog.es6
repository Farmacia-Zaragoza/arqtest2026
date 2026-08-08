// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Links Html Class  [V.0.0.1]  (2018-01-28)
// Brqx Group - Agile Farmacia Zaragoza Methodology - Dog [ES6]
//-------------------------------------------------------------------------------------
// Flat Structure Links
//-------------------------------------------------------------------------------------
//L[01]  <link rel="icon" type="image/svg" href="img/favicon/dog_icon_edu_2017.svg">
//L[02]  <link rel="apple-touch-icon" href="img/favicon/dog_icon_edu_2017.svg">
//L[03]  <link rel="shortcut icon" href="img/favicon/dog_icon_edu_2017.png" type="image/png">
// CSS
//L[04]  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
//L[05]  <link rel="stylesheet" href="libs/bootstrap4/css/bootstrap.min.css">
//L[06]  <link rel="stylesheet" href="assets/css/style.css">
//L[07]  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/flexslider.min.css"/>
//L[08]  <link rel="stylesheet" href="libs/googleplus/jquery.kyco.googleplusfeed2.css">
// DEFER SCRIPT
//S[01] <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script>

// ------------------------------------------------------------------------------------
//* LINK *
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: lnk01_link_dog
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 						= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'))),
		{ lnk02_css_link_dog }			= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/styles/lnk02_css_link_dog.es6'))),
		{ lnk03_css_minimized_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/styles/lnk03_css_minimized_dog.es6'))),
		{ lnk04_css_inline_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/styles/lnk04_css_inline_dog.es6'))),
		{ lnk05_css_inline_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/styles/lnk05_css_inline_multiple_dog.es6'))),
		{ scr02_jshead_script_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr02_jshead_script_dog.es6'))),
		{ scr03_jshead_minimized_dog }	= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr03_jshead_minimized_dog.es6'))),
		{ scr05_jshead_inline_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr05_jshead_inline_dog.es6'))),
		{ html_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')));

class lnk01_link_dog extends getset  {

    constructor (     thm										)
    {

        super()

		this.n							=	'lnk_dog::'

		this.thm						=	thm

		// External object
		this.script_to_load				=	''
		this.link_to_load				=	''

		// tag object
     	this.linktag					= 	''

		this.link_favicon				=	new html_style('link')
		this.link_icon					=	new html_style('link')
		this.link_apple					=	new html_style('link')

		this.build_data()

    }

	//L[01]  <link rel="icon" type="image/svg" href="img/favicon/dog_icon_edu_2017.svg">
    create_favicon()
    {

		this.link_favicon.rel					=	'icon'
		this.link_favicon.type					=	'image/png'
		this.link_favicon.href					=
				this.thm.u.http_domainbar + 'r_img/favicon/dog_icon_edu_2017.png'

		this.link_favicon.pcreate()

		this.code						+=	this.link_favicon.code
	}

	//L[01]  <link rel="shortcut icon" type="image/svg" href="img/favicon/dog_icon_edu_2017.svg">
    create_icon()
    {
		// Link Icon - ya convertido a buena url

		this.link_icon.rel					=	'shortcut icon'
		this.link_icon.type					=	'image/png'
		this.link_icon.href					=
				this.thm.u.http_domainbar + 'r_img/favicon/dog_icon_edu_2017.png'

		this.link_icon.pcreate()

		this.code						+=	this.link_icon.code
	}

	//L[02]  <link rel="apple-touch-icon" href="apple-touch-icon.png">
    create_apple()
    {

		this.link_apple.rel						=	'apple-touch-icon'
		this.link_apple.type					=	'image/png'
		this.link_apple.href					=
				this.thm.u.http_domainbar + 'r_img/icons/apple-touch-icon.png'

		this.link_apple.pcreate()

		this.code						+=	this.link_apple.code
	}

    build_data()
    {

		this.create_favicon()
		this.create_icon()
		this.create_apple()

		// Esta parte puede generarse de muchas formas
		// 1.como script
		// 2.como script minimizado
		// 3.inline

		this.p('CHECKING_OPTIONS [' +  this.thm.s.env + '] ' + this.thm.s.live_opt)

		if ( !this.thm.b.site_live )
		{
			// DEV
			this.link_to_load	 	= 	new lnk02_css_link_dog(this.thm)
			this.script_to_load 	= 	new scr02_jshead_script_dog(this.thm)
		}
		else
		{
			// LIVE
			if 			( this.thm.s.live_opt === 'script')
			{
				this.link_to_load 		= 	new lnk02_css_link_dog(this.thm)
				this.script_to_load 	= 	new scr02_jshead_script_dog(this.thm)
			}
			else if 	( this.thm.s.live_opt === 'minimized')
			{
				this.link_to_load	 	= 	new lnk03_css_minimized_dog(this.thm)
				this.script_to_load 	= 	new scr03_jshead_minimized_dog(this.thm)
			}
			else if 	( this.thm.s.live_opt === 'inline')
			{
				this.link_to_load	 	= 	new lnk05_css_inline_dog(this.thm)
				this.script_to_load 	= 	new scr05_jshead_inline_dog(this.thm)
			}
			else if 	( this.thm.s.live_opt === 'inline_and_save')
			{
				this.link_to_load	 	= 	new lnk05_css_inline_dog(this.thm)
				this.script_to_load 	= 	new scr05_jshead_inline_dog(this.thm)
			}
			else
				this.p('wrong_parameter ' + this.thm.s.live_opt )
		}

		this.code				+=	this.link_to_load.code
		this.code				+=	this.script_to_load.code

		// Ck [18-01-29]
		// this.p('lnk_Code : >' + this.code )
		// this.dd('Code >'  + this.code)

    }

}

exports.lnk01_link_dog = lnk01_link_dog
