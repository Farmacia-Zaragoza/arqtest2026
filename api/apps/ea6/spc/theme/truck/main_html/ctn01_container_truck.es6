// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Truck Container Class  [V.0.0.3]  (2017-12-17)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
// <div class="container clearfix">
// 		<header class="text-center mobile_style">	(external)
//		<section class="lang-grand clearfix">		(external)
// 	  	<section class="flex-slider">				(external)
//		<footer class="clearfix">					(external)
//		<div class="captcha-chat">					(external)
// ------------------------------------------------------------------------------------
//* DIV
//    HEADER
//    SECTION
//	  SECTION
//    FOOTER
//	  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 					= 	require(	cons.JS_BASE  + 'com/objects/html/html_style.es6'										),

		{ sec01_section_lang_truck }	= 	require(	cons.JS_BASE  + 'spc/theme/truck/main_html/sec01_section_lang_truck.es6'				),
		{ sec02_section_slider_truck }	= 	require(	cons.JS_BASE  + 'spc/theme/truck/main_html/sec02_section_slider_truck.es6'				),
		{ hdr01_header_truck }			= 	require(	cons.JS_BASE  + 'spc/theme/truck/main_html/hdr01_header_truck.es6'						),
		{ foo04_footer }				= 	require(	cons.JS_BASE  + 'spc/theme/truck/deep_html/types/footer/foo04_footer.es6'				),
		{ cpt04_div_captcha }			= 	require(	cons.JS_BASE  + 'spc/theme/truck/deep_html/types/captcha/cpt04_div_captcha.es6'			),
		{ cok02_div_policy_cookies }	= 	require(	cons.JS_BASE  + 'spc/theme/truck/deep_html/types/cookies/cok02_div_policy_cookies.es6'	);



class ctn01_container_truck extends html_style  {

    constructor (     thm						)
    {
        let tag_type     				= 	'div'

       	super(				tag_type	)
        this.tag_type   	  			= 	'div'

		this.n							=		'ctn01_truck::'

		// Html Objects

	    this.header_01          	 	=	''
	    this.section_01            		=	''
	    this.section_02            	 	=	''

	    this.footer_01              	=	''

	    this.div_captcha_01         	=	''

		this.thm						=	thm

		this.class	 					=	'container clearfix'

		this.fnode						=	this.thm.arr['fnode']['image_list']

		// Tenemos que tener como un mapa del site
		this.thm.map					= 	'body/container'


		this.build_data()

    }


	// <section class="lang-grand clearfix">		(external)
  	create_section_01()
    {
   	 	this.section_01		=
   					new sec01_section_lang_truck( this.thm )	// Drupal theme structure

  		// this.content			+=	'SECTION>'

		// this.p('sec1:codl >' + this.section_01.code.length)

  		this.content			+=	this.section_01.code							// 'SECTION>'

	}

	// 	<div class="policy_content">				(external)
	create_policy()
    {
   	 	this.section_02		=
   					new cok02_div_policy_cookies( this.thm )

  		// $this->content			.=	'SECTION2>'											;

		// this.p('cok1:codl >' + this.section_02.code.length)

  		this.content			+=	this.section_02.code							// 'SECTION>'

	}



	// 	<section class="flex-slider">				(external)
  	create_section_flex()
    {
   	 	this.section_02		=
   					new sec02_section_slider_truck( this.thm )	// Drupal theme structure

  		// this.content			+=	'SECTION2>'

  		this.content			+=	this.section_02.code							// 'SECTION>'

	}

  	create_section_02()
    {
		// Manage if we create section (slider) or policy

		if (this.thm.b.page_cookies)
		{
			this.create_policy()
		}
		else
			this.create_section_flex()

	}


	// <header class="text-center mobile_style">	(external)
  	create_header()
    {
  		this.header_01		=
  					new hdr01_header_truck(	this.thm	   )

		// this.content			+=  'HEADER>'

		this.content			+=  this.header_01.code				// 'HEADER>'

	}


	//		<footer class="clearfix">					(external)
  	create_footer()
    {
  		this.footer_01		=
  				new foo04_footer(		this.thm				)

		// this.content			+=   'FOOTER>'
		// this.p('foot:codl >' + this.footer_01.code.length)


		this.content			+=   this.footer_01.code			 // 'FOOTER>'


	}

	// <div class="captcha-chat">					(external)
  	create_div_captcha()
    {
  		this.div_captcha_01		=
  				new cpt04_div_captcha(		this.thm				)

		// this.content			+=   'CAPTCHA>'			 // OK [17-06-25]

		this.content			+=   this.div_captcha_01.code

	}

    build_data()
    {
	// Structure Container
	// [HEADER] [SECTION] [SECTION] [FOOTER] [CAPTCHA]

		this.content			=	''

		this.create_header()

		this.create_section_01()

		this.create_section_02()

		this.create_footer()

		this.create_div_captcha()

		this.pcreate()

		// Ok [18-01-03]
		// this.p('code >' + this.code.length )

    }

}

exports.ctn01_container_truck = ctn01_container_truck
