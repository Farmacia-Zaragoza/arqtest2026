//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Flex Slider Truck Class  [V.0.1.6]  (2017-07-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//  <div id="flex-slider-H" class="flexslider"> External
//		<ul class="slides"> - External
//			<li class="image-wrapper">
//[0]	<div class="email pop-container pop-container-social hidden-sm"> External
//[1]	<div class="phone pop-container pop-container-social hidden-sm"> External
//[2]	<div class="desc-list"> - External
//[3]	<div class="overlay"></div> -
//[4]	<div class="outline"></div>
//[5]	<div class="descriptions text-justified"> - External
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


const 	{ html_style } 					= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		{ flx02_ul_product_flex }		= require( 	path.join(JS_BASE, 'spc/theme/common/deep_html/slider/flx02_ul_product_flex.es6'),
		{ flx02_ul_flex }				= require( 	path.join(JS_BASE, 'spc/theme/common/deep_html/slider/flx02_ul_flex.es6'),
		{ mai03_div_email }				= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/email/mai03_div_mail.es6'),
		{ phn03_div_phone }				= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/phone/phn03_div_phone.es6'),
		{ dli01_div_list }				= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/desc_list/dli01_desc_list.es6'),
		{ des02_div_descriptions }		= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/descriptions/des02_div_descriptions.es6'));



class flx03_div_flex_slider extends html_style {

	constructor(thm = "")
	{
		let tag_type 						= "div"
		super(tag_type)

		this.n 								= "flx03_flex_mid_truck::"
		this.arr_div 						= Array()
		this.flex_type 						= "slider"

		this.tag_type 						= "div"
		this.thm 							= thm
		this.fnode 							= this.thm.arr['fnode']['image_list']
		this.id 							= "flex-slider-H"
		this.class 							= "flexslider"


		this.ul_01							= 	''

		if (this.thm.b.page_product)
		{
			this.ul_01 = new flx02_ul_product_flex(this.fnode, "slider")
		}
		else
			this.ul_01 = new flx02_ul_flex(this.fnode, "slider")

		this.arr_div[0] = new mai03_div_email(this.thm)
		this.arr_div[1] = new phn03_div_phone(this.thm)
		this.arr_div[2] = new dli01_div_list(this.fnode)
		this.arr_div[3] = new html_style("div")
		this.arr_div[4] = new html_style("div")
		this.arr_div[5] = new des02_div_descriptions(this.thm, "text-justified")

		this.arr_div[3].class = "overlay"
		this.arr_div[3].pcreate()
		this.arr_div[4].class = "outline"
		this.arr_div[4].pcreate()

		this.build_data()
	}

	create_ul()
	{
		this.content += this.ul_01.code
	}

	create_divs() {
		for (var div of Object.values(this.arr_div))
		{
			this.content += div.code
		}
	}

	build_data()
	{
		this.content = ""
		this.create_ul()
		this.create_divs()
		this.pcreate()

		//Ok [17-11-01]
		// this.p('code >' + this.code.length	)
		// this.p('code >' + this.code	)

	}

}

exports.flx03_div_flex_slider = flx03_div_flex_slider
