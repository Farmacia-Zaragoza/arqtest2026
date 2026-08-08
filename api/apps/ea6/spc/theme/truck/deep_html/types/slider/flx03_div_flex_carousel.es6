// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flex Carousel Div Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//  <div id="flex-slider-H" class="flexslider only-flexslider"> External
//<ul class="slides"> - External
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



const 	{ html_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		{ flx02_ul_flex }		= 	require( 	path.join(JS_BASE, 'spc/theme/common/deep_html/slider/flx02_ul_flex.es6')));

class flx03_div_flex_carousel extends html_style {

	constructor(fnode = "")
	{
		let tag_type 		= "div"

		super(tag_type)
		this.n 				= "flx03_flex_carousel::"

		this.tag_type 		= "div"
		this.fnode 			= fnode
		this.id 			= "flex-carousel-H"
		this.class 			= "flexslider"
		this.ul_01 			= new flx02_ul_flex(this.fnode, "carousel")
		this.build_data()
	}

	build_data()
	{
		this.content 		= ""
		this.content 		+= this.ul_01.code
		this.pcreate()

		//$this->d('code >' . $this->code)
	}

}

exports.flx03_div_flex_carousel = flx03_div_flex_carousel
