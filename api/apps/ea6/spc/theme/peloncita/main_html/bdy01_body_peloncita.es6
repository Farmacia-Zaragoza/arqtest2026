// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Html Div Class  [V.0.0.2]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
// <body class="b-lazy" data-src="images/Brqx_FondoVariado_300x200_Image11_i.png">
// 		<header data-background = "url('images/brqx_hozdepriegotajoosa_0512x0192.png')">
// 	  	<section id="main-content" class="container">
//		<footer id="footer">
//		<div id="fb-root"></div>
//		<scripts>
// ------------------------------------------------------------------------------------
//* BODY
//    HEADER 
//	  SECTION
//    FOOTER
//    DIV
//    SCRIPTS
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)		

class bdy01_body_peloncita extends html_style  {

    constructor (     thm						)
    {   
	    	this.header_01              =	''                          // Div dhtml object
	    	this.section_01             =	''                          // Div dhtml object
	    	this.footer_01              =	''                          // Div dhtml object
	
	    	this.scripts_01             =	''	
	        			

            this.tag_type     			= 	'body'							


        	super(				this.tag_type	)				

			this.thm						=	thm							

			// Tenemos que tener como un mapa del site
			this.thm.map					= 	'body/'								

			this.div_01					=	new html_style('div') 			
		
			this.build_contents()												

    }


	// 	  	<section id="main-content" class="container">
  	create_section()
    {
   	 	this.section_01		= 	
   					new sec01_section_peloncita( this.thm )	// Drupal theme structure
   					
  		this.content			+=	this.section_01.code							// 'SECTION>'
  		
	}

	// 		<header data-background = "url('images/brqx_hozdepriegotajoosa_0512x0192.png')">
  	create_header()
    {

  		this.header_01		= 	
  					new hdr01_header_peloncita(	this.thm	   )	

		this.content			+=  this.header_01.code				// 'HEADER>'		

	}

	//		<footer id="footer">
  	create_footer()
    {
  		this.footer_01		= 	new foo04_footer_peloncita(
  										this.thm					,
  										'Places Brqx 2016-2017'				)

		this.content			+=   this.footer_01.code			 // 'FOOTER>'		


	}

//		<div id="fb-root"></div>
  	create_div()
    {
		this.div_01.id		=	"fb-root"						
		this.div_01.pcreate()									
	
		this.content			+=  this.div_01.code					
	}

  	create_scripts()
    {
  		this.scripts_01		= 	
  				new scr01_js_peloncita(	this.thm	)			

		this.content			+=	this.scripts_01.code							
	}

  	create_server_footer()
    {

		this.thm.pg.create_div()
		this.content			+=	this.thm.pg.code							
	}


// <body class="b-lazy" data-src="images/Brqx_FondoVariado_300x200_Image11_i.png">

    build_data()
    {
	// Structure 
	// [HEADER] [SECTION] [DIV] [FOOTER] [SCRIPTS] [SERVER_FOOTER]
		this.content			=	''								

		// Here peloncita function
		// this.class			= "b-lazy"								
		//this.data_src	=	
		//		this.thm.img_background 

		this.create_header()										

		// Structure row -  [MIDDLE] [LEFT] [RIGHT]
		this.create_section()										
	
		// this.create_div()											

		this.create_footer()										

		this.create_scripts()										

		this.create_server_footer()								

		this.pcreate()											

		// this.d('bdy01:code >' + this.code)							

    }

}

exports.bdy01_body_peloncita = bdy01_body_peloncita
