// [DOCHANGED_ES6]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Captcha Button Class  [V.0.0.2]  (2017-06-19)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure Footer
//------------------------------------------------------------------------------------------------
//<button class="validate btn-common">
// <svg src="img/enter_icon.svg" alt="submit icon">
//...
// BUTTON
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6')),
		{ cpt03_div_captcha }	= 	require( 	'/brqx/base/rcode/es6/spc/theme/truck/deep_html/types/captcha/cpt03_div_captcha.es6'	);


class cpt01_button_captcha extends svg_style {

	constructor(thm)
	{
		let tag_type 					= "button"

		super(tag_type)
		this.n 						= "cpt01_button_captcha::"
		this.button_class 			= ""
		this.button_name 			= ""
		this.button_alt 			= ""
		this.img_name 				= ""

		this.tag_type 				= "button"
		this.thm 					= thm
		this.fnode 					= this.thm.arr['fnode']['flag_list']
	}

	create_svg()
	{
		this.svg_path				= 	'r_img/captcha/'
		this.svg_name 				= 	this.button_name

		this.svg_alt				=	''	 // Pending to compose

		this.create_svg_base()
		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}




	reload_data(button_name = "", button_class = "", button_alt = "")
	{
		this.button_name 			= button_name
		this.button_class 			= button_class
		this.button_alt 			= button_alt
		this.build_data()
	}

	build_data()
	{
		this.content 				= ""
		this.class 					= this.button_class
		this.create_svg()
		this.pcreate()

		//Ok [17-06-24]
		// this.p('code >' + this.code)

	}

}

exports.cpt01_button_captcha = cpt01_button_captcha
