//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flag Option A Class  [V.0.0.4]  (2018-01-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Truck Structure Multi Language
//------------------------------------------------------------------------------------------------
//<a  href="dog.dbrqx.com/index2" >
//<img lang="bg" src="img/flags/brqx_flag_bangladesh_2016_320_200.svg"
// alt="" class="mobile-lang-item">
//<svg ... | img src="img/flags/brqx_flag_china_2016_320_200.svg">
//...
// A
//SVG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 				= 	require(	cons.JS_BASE  + 'com/objects/html/svg_style.es6'		)


class a01_mobile_langs_dog extends svg_style {

	constructor(thm)
	{
		let tag_type 				= "a"

		super(tag_type)
		this.n 						= "flg01_div::"
		this.flag_lang 				= ""
		this.flag_caption 			= ""

		this.tag_type 				= "a"
		this.thm 					= thm
		this.fnode 					= this.thm.arr['fnode']['flag_list']
	}


	create_svg()
	{
		this.svg_path				= 	'r_img/flags/'
		this.svg_name 				= 	"brqx_flag_" + this.flag_lang + "_" + "2016_320_200.svg"

		this.svg_alt				=	''	 // Pending to compose

		this.svg_lang				= 	this.flag_lang

		this.create_svg_base()
		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}


	reload_contents(flag_lang = "", flag_caption = "")
	{
		this.flag_caption 	= flag_caption
		this.flag_lang 		= flag_lang
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	build_data()
	{
		this.content 			= ""
		this.class 				= ''
		this.href 				= this.fnode.u.http_domainbar + this.flag_lang + "/" + this.fnode.u.compouri


		this.create_svg()

		// [PENDING TO REVIEW]
		this.pcreate()

		//Ok [17-12-02]
		// this.p('Code > ' + this.code.length)

	}

}

exports.a01_mobile_langs_dog = a01_mobile_langs_dog
