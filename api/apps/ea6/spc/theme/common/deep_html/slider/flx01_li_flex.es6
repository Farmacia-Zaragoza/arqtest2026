//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Flex Slider LI Class  [V.0.0.1]  (2017-10-31)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure
//------------------------------------------------------------------------------------------------
//<ul class="slides">
// <li class="image-wrapper">
//<img src="data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII="
//data-flex-src="http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/flexslider/H/lucybrqx_opo15por_pers_-_portugal_-_oporto_00302_-_4608x3456.jpg|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/flexslider/H/lucybrqx_opo15por_pers_-_portugal_-_oporto_00302_-_4608x3456.jpg"
//data-flex-src-small="http://cica.dbrqx.com/rimg/cica/ratina1/Mobile/flexslider/H/lucybrqx_opo15por_pers_-_portugal_-_oporto_00302_-_4608x3456.jpg|http://cica.dbrqx.com/rimg/cica/ratina2/Mobile/flexslider/H/lucybrqx_opo15por_pers_-_portugal_-_oporto_00302_-_4608x3456.jpg" />
//------------------------------------------------------------------------------------------------
//LI
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flex Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Class: c-flx01_li_flex_middle-
//------------------------------------------------------------------------------------
//Methods:
//- load file       : Load dat file attributes
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')));


class flx01_li_flex extends html_style {

	constructor(fnode = "", slide_type = "slider")
	{

		let tag_type 							= "li"

		super(tag_type)
		this.n 									= "flx01_li_flex::"
		this.img_src 							= ""
		this.ratina_desktop_res_hi 				= ""
		this.ratina_desktop_res_lo 				= ""
		this.ratina_mobile_res_hi 				= ""
		this.ratina_mobile_res_lo 				= ""
		this.ratina_desktop_img_01 				= ""
		this.ratina_desktop_img_02 				= ""
		this.ratina_mobile_img_01 				= ""
		this.ratina_mobile_img_02 				= ""
		this.slide_type 						= "slide"

		this.tag_type 							= "li"
		this.class 								= ""
		this.slide_type 						= slide_type
		this.fnode 								= fnode
		this.img_01 							= new html_style("img")
		this.img_01.class 						= "b-lazy"
	}

	create_img(type = "carousel")
	{
		this.img_01.src = "data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII="
		this.img_01.data_src = this.ratina_desktop_img_02 + "|" + this.ratina_desktop_img_01
		this.img_01.data_src_small = this.ratina_mobile_img_02 + "|" + this.ratina_mobile_img_01
		this.img_01.pcreate()
		this.content = this.img_01.code
		this.pcreate()
	}

	reload_contents(pos = "", orientation_passed = "horizontal")
	{
		var orientation = orientation_passed.substr(0, 1)
		var slide_type = this.slide_type.substr(0, 1)
		var flex_type = slide_type + orientation

		this.ratina_desktop_res_hi = "su" + flex_type + "1"
		this.ratina_desktop_res_lo = "su" + flex_type + "0"

		this.ratina_mobile_res_hi = "su" + flex_type + "3"
		this.ratina_mobile_res_lo = "su" + flex_type + "2"

		// such1 - 103 - 139
		// this.p('Ratina ' + this.ratina_desktop_res_hi + ' L '+ this.fnode.arr[this.ratina_desktop_res_hi].length )

		this.ratina_desktop_img_01 	= this.fnode.arr[this.ratina_desktop_res_hi][pos]
		this.ratina_desktop_img_02 	= this.fnode.arr[this.ratina_desktop_res_lo][pos]
		this.ratina_mobile_img_01 	= this.fnode.arr[this.ratina_mobile_res_hi][pos]
		this.ratina_mobile_img_02 	= this.fnode.arr[this.ratina_mobile_res_lo][pos]
		this.create_img()

		// Ok [17-11-02]
		// this.p('Code : > ' + this.code )
	}

}

exports.flx01_li_flex = flx01_li_flex
