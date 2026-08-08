// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Section Truck Class  [V.0.1.2]  (2017-06-19)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Section Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//*<section class="lang-grand clearfix">
//  <div class="arrow-left hidden-x-lg">
//  <div class="lang-container clearfix"> - External
//  <div class="arrow-right hidden-x-lg">
//-------------------------------------------------------------------------------------
// SECTION
//  DIV
//  DIV
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--



const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		{ svg_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6'),
		{ flg03_div_flags } 		= 	require(	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/flags/flg03_div_flags.es6'));


class sec01_section_lang_truck extends html_style{

    constructor ( thm )
   {
        let tag_type                 		=      'section'

        super(tag_type)

		this.n								=		'sec01_section_truck::'

    	this.svg_name						=		''
    	this.svg_code_path					=		''
    	this.svg_01_code					=		''

        this.tag_type                 		=      'section'

		this.class 							=		'lang-grand clearfix'

	  	this.thm							=		thm

		this.fnode							=		this.thm.arr['fnode']['flag_list']

	   	this.map							=		this.thm.map + 'section/'
	   	this.thm.map						=		this.map


		this.miv_01 						=		new svg_style('div')

		this.miv_01.fnode					=		this.fnode

		this.build_data()

    }

//  <div class="lang-container clearfix"> - External
	create_div_01()
	{
		this.div_01							=		new flg03_div_flags(	this.thm 			)

		// this.content 					+=		'LANG_CONTAINER>'
		this.content 						+=		this.div_01.code
	}

	create_svg_left()
	{

		this.miv_01.content					=		''

		this.miv_01.class 					=		'arrow-left hidden-x-lg'

		this.miv_01.svg_path				= 		'r_img/arrows/'
		this.miv_01.svg_name 				= 		"lang_arrow_left.svg"

		this.miv_01.svg_alt					=		''	 // Pending to compose
		this.miv_01.svg_class				=		'arrow'

		this.miv_01.create_svg_base()

		this.miv_01.pcreate()

		this.content						+=		this.miv_01.code

		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}


	create_svg_right()
	{

		this.miv_01.content					=		''

		this.miv_01.class 					=		'arrow-right hidden-x-lg'

		this.miv_01.svg_path				= 		'r_img/arrows/'
		this.miv_01.svg_name 				= 		"lang_arrow_right.svg"

		this.miv_01.svg_alt					=		''	 // Pending to compose

		this.miv_01.create_svg_base()

		this.miv_01.pcreate()

		this.content						+=		this.miv_01.code

		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}


    build_data()
    {

	  	this.create_svg_left()

	  	this.create_div_01()

	  	this.create_svg_right()

		this.pcreate()

		// Ok [17-11-02]
		// this.p('Code > ' + this.code)

	} // End Build Data

}

exports.sec01_section_lang_truck = sec01_section_lang_truck
