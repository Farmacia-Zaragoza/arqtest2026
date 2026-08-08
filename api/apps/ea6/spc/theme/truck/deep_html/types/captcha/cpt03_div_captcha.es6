// [DOCHANGED_ES6]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Captcha Div Class Level03  [V.0.0.6]  (2018-01-13)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// <div class="captcha-container media">
//<div class="media-left">
//<div class="media-body">
//<div id="captcha">  (external)
//<p class="wrong info">Wrong!, please try again.</p>
//<p class="redirecting info">Redirecting... Hold on</p>
//<p class="captcha_loading info">Loading... Hold on</p>
//DIV
//DIV x 2
//DIV - (external)
//P x 3
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6'),
		{ html_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		{ cpt02_div_captcha }	= 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/captcha/cpt02_div_captcha.es6'));

class cpt03_div_captcha extends html_style {

	constructor(thm)
	{
		let tag_type 		= 	"div"
		super(tag_type)

		this.tag_type 		= 	"div"

		this.n 				= 	"cpt03_div_captcha::"

		this.class 			= 	"captcha-container media"
		this.thm 			= 	thm
		this.fnode 			= 	this.thm.arr['fnode']['flag_list']
		this.fnode_site 	= 	this.thm.arr['fnode']['site_info_lang']
		this.miv_01 		= 	new svg_style("div")
		this.miv_01.fnode	=	this.fnode

		this.miv_02 		= 	new html_style("div")
		this.div_01 		= 	new cpt02_div_captcha(this.thm)
		this.p_01 			= 	new html_style("p")
		this.build_data()
	}

	create_div() {
		this.content += this.div_01.code
	}


	create_div_02() {
		this.miv_02.content 		= ""
		this.miv_02.class 			= "media-body"
		this.p_01.class 			= "security"
		this.p_01.content 			= this.fnode_site.captcha_check
		this.p_01.pcreate()
		this.miv_02.content 		+= this.p_01.code
		this.p_01.class 			= "why-captcha"
		this.p_01.content 			= this.fnode_site.captcha_why
		this.p_01.pcreate()
		this.miv_02.content 		+= this.p_01.code
		this.miv_02.pcreate()
		this.content 				+= this.miv_02.code
	}



	create_div_01()
	{

		this.miv_01.content					=		''

		this.miv_01.class 					=		'media-left'

		this.miv_01.svg_path				= 		'r_img/captcha/'
		this.miv_01.svg_name 				= 		"truck_cartoon.svg"

		this.miv_01.svg_alt					=		''	 // Pending to compose
		this.miv_01.svg_class				=		'cartoon-logo'

		this.miv_01.create_svg_base()

		this.miv_01.pcreate()

		this.content						+=		this.miv_01.code

	}


	create_p_01()
	//<p class="redirecting info">Redirecting... Hold on</p>
	//<p class="captcha_loading info">Loading... Hold on</p>
	{
		this.p_01.class 		= "wrong info"
		this.p_01.content 		= this.fnode_site.captcha_wrong
		this.p_01.pcreate()
		this.content 			+= this.p_01.code
		this.p_01.class 		= "redirecting info"
		this.p_01.content 		= this.fnode_site.captcha_redirect
		this.p_01.pcreate()
		this.content 			+= this.p_01.code
		this.p_01.class 		= "captcha_loading info"
		this.p_01.content 		= this.fnode_site.captcha_load
		this.p_01.pcreate()
		this.content 			+= this.p_01.code
	}

	build_data()
	{
		this.content = ""
		this.create_div_01()
		this.create_div_02()
		this.create_div()
		this.create_p_01()
		this.pcreate()

		// Ok [18-01-11]
		// this.p('Code > ' + this.code)
	}

}

exports.cpt03_div_captcha = cpt03_div_captcha
