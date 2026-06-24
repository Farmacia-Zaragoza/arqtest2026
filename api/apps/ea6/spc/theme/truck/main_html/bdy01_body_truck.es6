// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Truck Body Class  [V.0.0.1]  (2017-10-17)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Truck - Home - Index_06 - v0_0_2
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
// <body class="page-id-homepage">
// 		<div class="loading">
//      <div class="fullwidth-container  clearfix"> (external)
 //		<span id="truck_folder_name" style="display: none">img</span>
//		<span id="driftCode" style="display: none">p44y7munch95</span>
// 		<div style="display: none" id="truck_links" data-links='[  "http://demolink.com/", (external)
//		<scripts>
// ------------------------------------------------------------------------------------
//* BODY
//    LOGO
//	  DIV_SIDEBAR
//	  SPAN
//	  SPAN
//    DIV  (external)
//    SCRIPTS
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= require(	cons.JS_BASE + 'com/objects/html/html_style.es6'										),
		{ ifnojs }	 				= require(	cons.JS_BASE + 'com/objects/html/ifnojs.es6'											),
		{ sid01_sidebars_truck }	= require(	cons.JS_BASE + 'spc/theme/truck/main_html/sid01_sidebars_truck.es6'					),
		{ scr01_js_truck }			= require(	cons.JS_BASE + 'spc/theme/truck/main_html/scr01_js_truck.es6'							),
		{ lks02_div_links_truck }	= require(	cons.JS_BASE + 'spc/theme/truck/deep_html/types/links/lks02_div_truck.es6'			),
		{ lnk03_css_minimized_truck }	= 	require(	cons.JS_BASE + 'spc/theme/truck/deep_html/types/styles/lnk03_css_minimized_truck.es6'	),
		scpf 						= require( 	cons.JS_BASE + 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'	);


class bdy01_body_truck extends html_style  {

    constructor (     thm						)
    {
		let tag_type					=	'body'
		super(tag_type)

		this.n							=	'bdy_truck::'
        this.tag_type     				= 	'body'


    	this.sidebar_01					=	''

    	this.scripts_01					=	''

    	this.div_02     	        	=	''

		this.class 						=	"page-id-homepage"
		this.thm						=	thm

		// Tenemos que tener como un mapa del site
		this.thm.map					= 	'body/'

		this.div_01						=	new html_style('div')

		this.ifnojs						=	new ifnojs()

		this.drift_code					=	this.thm.s.drift

		this.span_01 					=	new html_style('span')

		// External object
		this.script_to_load				=	''

		this.build_data()

    }

	create_svg()
	{
		this.svg_name						= 	'truck_logo.svg'

		this.svg_code_path 						=
				this.thm.u.site_path + 'r_img/logos/' + this.svg_name

		// this.p('SVG_LOGO ' + this.svg_code_path )

		this.div_01.content 				= 		scpf.file_get_svg_code(this.svg_code_path)

	}

 	// <div class="loading">
    //     <img src="img/truck_logo.svg" alt="Loading gif">
	create_logo()
	{

		this.div_01.class  			=	'loading'

		this.create_svg()

		this.div_01.pcreate()

		// this.content 				+=	'LOGO>'

		// this.p('Div Code ' + this.div_01.code )

		this.content 				+=	this.div_01.code
	}

	// 	  	<section id="main-content" class="container">
  	create_sidebar()
    {
   	 	this.sidebar_01		=
   					new sid01_sidebars_truck( this.thm )

  		// this.content			+=	'SIDEBAR>'

  		this.content			+=	this.sidebar_01.code

	}

  	create_scripts()
    {
  		this.scripts_01		=
  				new scr01_js_truck(	this.thm	)

		this.content			+=	this.scripts_01.code
	}

//		<span id="driftCode" style="display: none">p44y7munch95</span>
  	create_span()
    {
		this.span_01.id			=	'driftCode'
		this.span_01.style		= 	'display: none'

  		this.span_01.content		=	this.drift_code

		this.span_01.pcreate()

		// Ok
		// this.p('Drift Code : ' . this.drift_code )

		this.content			+=	this.span_01.code
	}

 // <span id="truck_folder_name" style="display: none">img</span>
  	create_span_img_name()
    {
		this.span_01.id			=	'truck_folder_name'
		this.span_01.style		= 	'display: none'

		this.p('Live_Folder_Name ' + this.thm.s.live_folder_name)

  		this.span_01.content		=	this.thm.s.live_folder_name


		this.span_01.pcreate()

		// this.p('span_code ' + this.span_01.code)

		this.content			+=	this.span_01.code
	}


// 		<div style="display: none" id="truck_links" data-links='[  "http://demolink.com/",
  	create_div_links()
    {
		this.div_02				=	new lks02_div_links_truck	(this.thm)

		this.content				+=	this.div_02.code
	}

    // <!--[if lt IE 8]>
    //        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    // <![endif]-.

  	create_ifnojs()
    {
		// External links
		this.ifnojs.ifno_complex_mode_02('8' , 'lt' , '<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>'  	)

		this.content 			+= 	this.ifnojs.code
	}

  	create_server_footer()
    {

		this.thm.pg.create_div()
		this.content			+=	this.thm.pg.code
	}

	create_saved_style()
	{
		if 	( this.thm.s.live_opt === 'inline_and_save')
		{
			this.script_to_load 	= 	new lnk03_css_minimized_truck(this.thm)
		}

		this.content			+=	this.script_to_load.code
	}

    build_data()
    {
	// Structure
	// [LOGO] [SIDEBAR] [SCRIPTS] [SERVER_FOOTER]
		this.content			=	''

		this.create_ifnojs()

		this.create_logo()

		// Structure row -  [MIDDLE] [LEFT] [RIGHT]
		this.create_sidebar()

		this.create_span_img_name()

		this.create_span()

		this.create_div_links()

		this.create_scripts()

		this.create_server_footer()

		this.create_saved_style()

		this.pcreate()

		// Test [17-07-05]
		// this.p('bdy01:code >' + this.code)

    }

}

exports.bdy01_body_truck = bdy01_body_truck
