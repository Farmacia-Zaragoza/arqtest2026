// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Descriptions Class  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//	<div class="desc-list">
//<img src="svg/hamburger-toggle.svg">
//<div class="circular-overlay"></div>
//-------------------------------------------------------------------------------------
//DIV
//SVG
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ svg_style } 			= 	require(path.join(JS_BASE, 'com/objects/html/svg_style.es6'))
		const { html_style } = require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))

class dli01_div_list extends svg_style {

	constructor(fnode)
	{
		let tag_type 			= 	"div"

		super(tag_type)
		this.n 					= 	"dli01_div_list::"
		this.svg_name 			= 	""
		this.tag_type 			= 	"div"
		this.fnode 				= 	fnode
		this.class 				= 	"desc-list"

		this.div_01 			= 	new html_style("div")
		this.div_01.class 		= 	"circular-overlay"
		this.div_01.pcreate()
		this.build_data()
	}

	create_svg()
	{
		this.svg_path			= 	'r_img/lists/'
		this.svg_name 			= 	"hamburger-toggle.svg"

		this.svg_alt			=	''	 // Pending to compose

		this.create_svg_base()
		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}

	build_data()
	{
		this.content 			= 	""
		this.create_svg()
		this.content 			+= 	this.div_01.code
		this.pcreate()

		// Ok [17-11-02]
		// this.p('code >' + this.code)

	}

}

exports.dli01_div_list = dli01_div_list

