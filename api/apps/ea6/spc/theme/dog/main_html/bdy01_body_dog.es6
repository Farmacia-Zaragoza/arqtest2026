// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Dog Body Class  [V.0.0.2]  (2018-01-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Dog - Home - Index_06 - v0_0_2
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
// <body data-array="data/simple_000.json data/simple_001.json
//					 data/simple_002.json data/simple_003.json data/simple_004.json data/simple_005.json
// <div id="fb-root"></div>
// <script src="assets/js/fb.js"></script>	EXTERNAL
// <div id="container-fluid" class="container-fluid"> EXTERNAL
// ------------------------------------------------------------------------------------
//* BODY
//    DIV
//    SCRIPT			(external)
//	  DIV_CONTAINER 	(external)
//    SCRIPTS 			(external)
//    DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		{ svg_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6'))),
		{ ifnojs }	 					= 	require(	path.join(JS_BASE, 'com/objects/html/ifnojs.es6'))),
		{ ctn01_container_dog }			= 	require(	path.join(JS_BASE, 'spc/theme/dog/main_html/ctn01_container_dog.es6'))),
		{ scr02_fbjs_script_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr02_fbjs_script_dog.es6'))),
		{ scr01_js_dog }				= 	require(	path.join(JS_BASE, 'spc/theme/dog/main_html/scr01_js_dog.es6'))),
		minify 							= 	require(	'html-minifier'												).minify;


class bdy01_body_dog extends html_style  {

    constructor (     thm						)
    {
		let tag_type					=	'body'
		super(tag_type)

		this.n							=	'bdy_dog::'
        this.tag_type     				= 	'body'

		this.thm						=	thm

		// Tenemos que tener como un mapa del site
		this.thm.map					= 	'body/'

		this.miv_01						=	''

    	this.div_01     	        	=	new html_style('div')

    	this.script_01					=	''

    	this.scripts_02					=	''

		this.ifnojs						=	new ifnojs()

		this.drift_code					=	this.thm.s.drift

		// External object
		this.script_to_load				=	''

		this.build_data()

    }

	// <<div class="img-path" imgPath="img"></div>
	create_imgpath()
	{

		this.div_01.imgpath				=		this.thm.s.live_folder_name

		this.div_01.id 					=		''

		this.div_01.class 				=		'img-path'


		this.div_01.pcreate()

		this.content					+=		this.div_01.code
	}


 	// <div id="fb-root"></div>
	create_fb_layer()
	{

		this.div_01.content				=		''

		this.div_01.id 					=		'fb-root'

		this.div_01.imgpath				=		''

		this.div_01.class 				=		''

		this.div_01.pcreate()

		this.content					+=		this.div_01.code

	}

	// <div class="mydiv"></div>
	create_mydiv_layer()
	{

		this.div_01.content				=		''

		this.div_01.id 					=		''

		this.div_01.imgpath				=		''

		this.div_01.class 				=		'mydiv'

		this.div_01.pcreate()

		this.content					+=		this.div_01.code
	}

	// <section id="main-content" class="container">
  	create_container()
    {
		this.miv_01						=	new ctn01_container_dog(this.thm)

  		//this.content					+=	'CONTAINER>'

  		this.content					+=	this.miv_01.code

	}

  	create_fb_script()
	{

  		this.script_01		=
  				new scr02_fbjs_script_dog(	this.thm	)


		this.content			+=	this.script_01.code

	}

	create_fb()
	{
		this.create_fb_layer()
		this.create_fb_script()
	}

  	create_scripts()
    {
		// Here we have two options
		// Scripts links for dev environment
		// Script tag for live environment

  		this.scripts_01		=
  				new scr01_js_dog(	this.thm	)

		this.content			+=	this.scripts_01.code
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
		// REVIEW !!!

		this.thm.pg.create_div()
		this.content			+=	this.thm.pg.code
	}

    build_data()
    {
	// Structure
	// [FB] [CONTAINER] [SCRIPTS] [SERVER_FOOTER]
		this.content			=	''

		this.create_ifnojs()

		// Create Layer and scripts
		this.create_imgpath()

		// Create Layer and scripts
		this.create_fb()

		// Structure pending  -  [MIDDLE] [LEFT] [RIGHT]
		this.create_container()

		this.create_scripts()

		this.create_mydiv_layer()

		// Pending to review
		this.create_server_footer()

		// FINISH BUCLE data-array content

		// Manage Json

		let data_bas 			= 	'r_data/simple_00'
		let data_str 			=	''

		for (var c=0 ; c<5 ; c++)
			data_str 			+= 	data_bas + c + '.json '

		this.data_array			=	data_str

		// PENDING

		this.pcreate()


		// Ok [18-02-02]
		// this.p('bdy01:cod ' + this.code)

		// this.p('bdy01:codl ' + this.code.length)

    }

}

exports.bdy01_body_dog = bdy01_body_dog
