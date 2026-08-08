// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flag Option Div Class  [V.0.0.4]  (2018-01-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Truck Structure Multi Language
//------------------------------------------------------------------------------------------------
//<a class="pop-container-L active" href="#" data-caption="Click to go to Chienese site">
//<img src="img/flags/brqx_flag_china_2016_320_200.svg">
//...
// A
//SVG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6'))),
		{ flg02_div_flags }			= 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/flags/flg02_div_flags.es6')));


class flg01_div_flags extends svg_style {

	constructor(thm)
	{
		let tag_type 								= "a"

		super(tag_type)
		this.n 										= "flg01_div::"
		this.flag_lang 								= ""
		this.flag_caption 							= ""
		this.flag_active 							= ""

		this.tag_type 								= "a"
		this.thm 									= thm
		this.fnode 									= this.thm.arr['fnode']['flag_list']
		this.class_name 							= "pop-container-L"
	}


	create_svg()
	{
		this.svg_path				= 	'r_img/flags/'
		this.svg_name 				= 	"brqx_flag_" + this.flag_lang + "_" + "2016_320_200.svg"

		this.svg_alt				=	''	 // Pending to compose

		this.create_svg_base()
		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}


	reload_contents(flag_lang = "", flag_caption = "", active = "")
	{
		this.flag_caption 	= flag_caption
		this.flag_lang 		= flag_lang
		this.flag_active 	= active
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	build_data()
	{
		this.content 			= ""
		this.class 				= this.class_name + " " + this.flag_active
		this.href 				= this.fnode.u.http_domainbar + this.flag_lang + "/" + this.fnode.u.compouri
		this.data_caption 		= this.flag_caption
		this.create_svg()

		// [PENDING TO REVIEW]
		this.style				=	"width:100px;height:60px;"
		this.pcreate()

		//Ok [17-12-02]
		// this.p('Code > ' + this.code.length)

	}

}

exports.flg01_div_flags = flg01_div_flags
