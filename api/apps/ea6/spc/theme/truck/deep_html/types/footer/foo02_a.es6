// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Footer Truck Class  [V.0.1.1]  (2017-03-16)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------

// <a class="pop-link skew" href="#">
//    <span class="inverse-skew">Other link</span>
//    <span class="visible-touch inverse-skew plus">
//       <img src="r_img/plus_icon.svg">
//
//-------------------------------------------------------------------------------------
//  A
//    SPAN
//	  SPAN
// 		IMG
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents   	  : Build html final code for object
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		scpf 						= require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'));


class foo02_a_footer extends html_style{

    constructor (   thm									)
   {
		let tag_type                 		= 	'a'

        super(tag_type)

        this.tag_type                 		= 	'a'

		this.thm							=	thm

		this.fnode_common					=	this.thm.arr['fnode']['link_list_common']

		// this.p('site_path_footer02' . this.fnode.u.site_path 	)

		this.span_01						=	new html_style('span')
		this.span_02						=	new html_style('span')

		// Flat
		// this.span_01.class 				=	'visible-touch plus'
		// Truck
		this.span_01.class 					=	'inverse-skew'
		this.span_02.class 					=	'visible-touch inverse-skew plus'

		this.class 							=	'pop-link skew'

    }

//    	<a href="#">Fotocasa
//		<div class="line left1"></div>

	create_svg()
	{
		this.svg_name	= 'plus_icon.svg'

		// this.p('Before_read_svg ' . this.svg_name)

		this.svg_code_path = this.fnode_common.u.site_path + 'r_img/symbols/'  + this.svg_name

		this.svg_01_code = scpf.file_get_svg_code(this.svg_code_path)									 // READ_FILE


	}

	create_span_01()
	{
		this.span_01.content 	= 	this.link_text
		this.span_01.pcreate()
		this.content			+=	this.span_01.code
	}

	create_span_02()
	{
		this.span_02.content 	= 	this.svg_01_code
		this.span_02.pcreate()
		this.content			+=	this.span_02.code
	}

	create_a()
	{
		this.href 			= 	this.link_http
		this.target			=	this.link_target

		this.create_svg()

		this.create_span_01()
		this.create_span_02()


	}

    reload_contents(link = '' , text = ''  , target = '_blank')
    {
		this.content	= 		''

		this.link_http		=	link
		this.link_text		=	text
		this.link_target		=	target

		this.create_a()

	 	this.pcreate()

		// Ok [17-11-02]
		// this.p('code >' + this.code)

	}

}

exports.foo02_a_footer = foo02_a_footer
