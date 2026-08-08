// [DOCHANGED_ES6]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Mail Icon Truck Class  [V.0.1.8]  (2018-01-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<div class="icon">
//<img width="30" src="img/phone_icon_white.svg" alt="Trcuk phone icon">
//-------------------------------------------------------------------------------------
//DIV
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_img       : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ svg_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6')));

class mai02_div_mail_icon extends svg_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)

		this.n 						= 	"mai02_div_mail_icon::"
		this.tag_type 				= 	"div"
		this.thm 					= 	thm
		this.fnode		 			= 	this.thm.arr['fnode']['site_info_lang']
		this.class 					= 	"icon"
		this.build_data()
	}

	create_svg()
	{
		this.svg_path				= 	'r_img/email/'
		this.svg_name 				= 	"email_icon_white.svg"
		this.svg_class				=	"email_icon_white"

		this.svg_alt				=	''	 // Pending to compose

		this.create_svg_base()
		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}

	build_data()
	{
		this.content = ""
		this.create_svg()
		this.pcreate()

		// oK [18-01-02]
		// this.p('code >' + this.code)
	}

}

exports.mai02_div_mail_icon = mai02_div_mail_icon
