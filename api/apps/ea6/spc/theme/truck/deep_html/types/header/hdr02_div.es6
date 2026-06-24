// [DOCHANGED_ES6]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Header Truck Class  [V.0.1.3]  (2017-07-07)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------

//*   <div class="pop-container">
//      <h1>
//  	  	TRUCK FIRM
//	    	<span class="visible-touch plus invisible_mobile">
//  			<img src="svg/plus_icon.svg" alt="">
//	    <span class="link-description">
//				This flat is for sale. Please contact immedeately. This flat is for sale.

//-------------------------------------------------------------------------------------
//* DIV
//   H1
//	  SPAN
//     SVG - External
//   SPAN
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 			= 	require(	cons.JS_BASE  + 'com/objects/html/svg_style.es6'		),
		{ html_style } 			= 	require(	cons.JS_BASE  + 'com/objects/html/html_style.es6'	);

class hdr02_div_header_truck extends html_style{

    constructor (   		thm											)
   {
        let tag_type               		  	= 	'div'

		super(tag_type)
		this.n								= '	hdr02_header_truck::'

		this.span_01						=	''


		this.link_title						=	''

		this.svg_name 						=	''

        this.tag_type               	  	= 	'div'
		this.class 							=	'pop-container'

		this.thm							=	thm

		this.fnode_site 					=	this.thm.arr['fnode']['site_info_lang']

		this.h1_01							=	new html_style('h1')

		this.span_02						=	new svg_style('span')
		this.span_02.fnode					=	this.fnode_site

		this.build_data()
    }


	create_svg()
	{

		this.span_02.content				=	''

		this.span_02.class 					=	'visible-touch plus invisible_mobile'

		this.span_02.svg_path				= 	'r_img/symbols/'
		this.span_02.svg_name 				= 	"plus_icon.svg"


		this.span_02.svg_alt				=	''	 // Pending to compose

		this.span_02.svg_class				=	'plus_icon_size'

		this.span_02.create_svg_base()

		this.span_02.pcreate()

		this.h1_01.content 					+= 	this.span_02.code

	}

	create_h1()
	{
		this.h1_01.content					+=	this.fnode_site.firm_name

		this.create_svg()

		this.h1_01.pcreate()

		this.content 						+=	this.h1_01.code
	}
//	    <span class="link-description">
//				This flat is for sale. Please contact immedeately. This flat is for sale.

	create_span()
	{
		this.span_01 						= 	new html_style('span')
		this.span_01.class  				= 	'link-description'
		this.span_01.content 				=	this.fnode_site.title_hover

		this.span_01.pcreate()

		this.content 						+=	this.span_01.code
	}

    build_data()
    {
		this.content						= 	''

		// this.p('Before_create_svg')

		this.create_h1()

		this.create_span()

	 	this.pcreate()

		// this.p('code >' + this.code)
	}

}

exports.hdr02_div_header_truck = hdr02_div_header_truck
