// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flag Div Class  [V.0.0.5]  (2017-06-19)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// <div class="lang-container clearfix">
//  <div class="flags">
//  <img src="img/flags/trucks_mini_flags_marker.svg" alt="background">

//DIV
//  DIV - (external)
//  SVG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 				= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const { svg_style } = require(path.join(JS_BASE, 'com/objects/html/svg_style.es6'))
		const { flg02_div_flags } = require(path.join(JS_BASE, 'spc/theme/truck/deep_html/types/flags/flg02_div_flags.es6'))

class flg03_div_flags extends html_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"
		super(tag_type)
		this.n 						= 	"flg03_div_flags::"

		this.tag_type 				= 	"div"
		this.class 					= 	"lang-container clearfix"
		this.thm 					= 	thm
		this.fnode 					= 	this.thm.arr['fnode']['flag_list']
		this.div_01 				= 	new flg02_div_flags(this.thm)

		this.miv_01					=	new svg_style('div')
		this.miv_01.fnode			=	this.fnode

		this.build_data()
	}

	create_div()
	{
		// External Div
		// this.content 			+= 	'LANG_CONTAINER >'
		this.content 				+= 	this.div_01.code
	}

	// Works
	// <img src="http://truck.dbrqx.com/index2/img/flags/trucks_mini_flags_marker.svg" alt="background"

	create_svg()
	{

		this.miv_01.content					=		''

		this.miv_01.class 					=		'ellipse'

		this.miv_01.svg_path				= 		'r_img/flag_selector/'
		this.miv_01.svg_name 				= 		"trucks_mini_flags_marker.svg"

		this.miv_01.svg_alt					=		''	 // Pending to compose

		this.miv_01.create_svg_base()

		this.miv_01.pcreate()

		this.content						+=		this.miv_01.code

	}

	build_data()
	{
		this.content = ""
		this.create_div()
		this.create_svg()
		this.pcreate()

		//Ok [17-11-02]
		// this.p('Code > ' + this.code)
	}

}

exports.flg03_div_flags = flg03_div_flags
