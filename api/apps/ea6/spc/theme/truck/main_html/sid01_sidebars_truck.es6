// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Truck Sidebar Class  [V.0.0.1]  (2017-10-17)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
// <div class="fullwidth-container  clearfix">
// 		<div class="left-sidebar">
//		<div class="container clearfix
//		<div class="right-sidebar">
// ------------------------------------------------------------------------------------
//* DIV
//    DIV
//	  DIV
//    DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 				= require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const { ctn01_container_truck } = require(path.join(JS_BASE, 'spc/theme/truck/main_html/ctn01_container_truck.es6'))

class sid01_sidebars_truck extends html_style  {

    constructor (     thm									)
    {
		let tag_type						=	'div'
       	super(				tag_type	)

        this.tag_type     					= 	'div'

		this.n								=				'sid01_truck::'

	// Html Objects

		this.container_01					=	''

    	this.riv_01							=	''

    	this.div_01							=	''

    	this.liv_01							=	''

		// Theme object
		this.thm							=	thm

		this.class 							=	'fullwidth-container clearfix'

		this.liv_01 						=	new html_style('div')
		this.riv_01 						=	new html_style('div')

		// Tenemos que tener como un mapa del site
		this.thm.map						= 	'body/sidebar'

		this.build_data()

    }

	// <div class="left-sidebar">
  	create_liv()
    {
		this.liv_01.class   			=	'left-sidebar'
		this.liv_01.pcreate()
  		this.content					+=	this.liv_01.code

		// this.content					+=  'LEFT>'

	}

	// <div class="right-sidebar">
  	create_riv()
    {
		this.riv_01.class   			=	'right-sidebar'
		this.riv_01.pcreate()

		// this.content					+=  'RIGHT>'

  		this.content					+=	this.riv_01.code
	}

  	create_container()
    {

  		this.container_01		=
  					new ctn01_container_truck(	this.thm	   )

		//this.content			+=  'CONTAINER>'

		this.content			+=  this.container_01.code

	}

    build_data()
    {
	// Structure sidebar
	// [LIV] [CONTAINER] [RIV]
		this.content			=	''

		this.create_liv()

		this.create_container()

		this.create_riv()

		this.pcreate()

		// Pending [17-06-24]
		// this.p('code >' + this.code.length)

    }

}

exports.sid01_sidebars_truck = sid01_sidebars_truck

