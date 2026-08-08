//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flex Slider Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="flex-download">
//<div class="download-wrapper">
//<div class="quality"> (External)
//<span class="download-icon image-wrapper"> (External)
//-------------------------------------------------------------------------------------
//DIV
//DIV
//DIV
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flx02_div_download_middle extends html_style {

	constructor(fnode = "") 
	{
		this.tag_type = "div"

		this.n = "flx02_div_download_mid::"
		this.flex_type = "carousel"

		this.class = "flex-download"
		this.fnode = fnode
		this.div_01 = new html_style("div")
		this.div_02 = new flx01_div_download_middle()
		this.span_02 = new flx01_span_download_middle(this.fnode)
		super.constructor(this.tag_type)
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_div() {
		this.div_01.class = "download-wrapper"
		this.div_01.content = this.div_02.code
		this.div_01.content += this.span_02.code
		this.div_01.pcreate()
		this.content = this.div_01.code
	}

	build_data() 										
	{
		this.create_div()
		this.pcreate()
	}

}

exports.flx02_div_download_middle = flx02_div_download_middle
