// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Span Span Structure  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<p>
//<strong>Chrome - </strong><a href="https://support.google.com/chrome/answer/95647?hl=en">https://support.google.com/chrome/answer/95647?hl=en</a>
//-------------------------------------------------------------------------------------
// P
//A
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons	 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"							);

const 	{ getset } 						= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'))),		
		{ html_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')));

class lnk01_p_strong extends html_style {
	constructor() {
		let tag_type					= 	'p'
		super(tag_type)

		this.n 							= 	"lnk01_p_strong::"
		this.passed_name 				= 	""
		this.passed_title 				= 	""
		this.passed_url 				= 	""

		this.tag_type 					= 	"p"
		this.a_01 						= 	new html_style("a")
	}


	reload_data(name = "", title = "", url = "") 
	{
		this.passed_name = name
		this.passed_title = title
		this.passed_url = url
		this.build_data()
	}

	create_a() {
		this.a_01.content = this.passed_title
		this.a_01.href = this.passed_url
		this.a_01.pcreate()
		this.content += this.a_01.code
	}

	build_data() {
		this.content = "<strong>" + this.passed_name + " - " + "</strong>"
		this.create_a()
		this.pcreate()
	}

}

exports.lnk01_p_strong = lnk01_p_strong
