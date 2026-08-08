//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flex Slider Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//  <div id="flex-slider-H" class="flexslider"> External
//<ul class="slides">
//<li class="image-wrapper">
//-------------------------------------------------------------------------------------
//DIV
//UL (external
//LI (external repeat )
//DIV (external - download)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flx03_div_flex_middle extends html_style {

	constructor(fnode = "", vnode = "", flex_type = "a") 
	{
		this.tag_type = "div"

		this.n = "flx03_flex_mid::"
		this.flex_type = "carousel"

		this.flex_type = flex_type
		this.id = "flex-slider-H"
		this.class = "flexslider"
		this.fnode = fnode
		this.ul_01 = new flx02_ul_flex_middle(this.fnode, this.flex_type)
		this.div_01 = new flx02_div_download_middle(this.fnode)
		super.constructor(this.tag_type)
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	build_data() 
	{
		this.content = ""
		this.content += this.ul_01.code
		this.content += this.div_01.code
		this.pcreate()
	}

}

