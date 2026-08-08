// [DOCHANGED_ES6]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Captcha Div Class  [V.0.0.6]  (2018-01-12)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// <div class="captcha-chat">
//<div class="captcha-container media">
//<button class="chat-icon btn-common">
//DIV
//DIV - (external)
//BUTTON
//IMGx2
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6'))),
		{ html_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		{ cpt03_div_captcha }	= 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/captcha/cpt03_div_captcha.es6')));


class cpt04_div_captcha extends html_style {

	constructor(thm)
	{
		let tag_type = "div"
		super(tag_type)

		this.n 							= 	"cpt04_div_captcha::"
		this.tag_type 					= 	"div"
		this.class 						= 	"captcha-chat"
		this.thm 						= 	thm
		this.fnode 						= 	this.thm.arr['fnode']['flag_list']
		this.div_01 					= 	new cpt03_div_captcha(this.thm)

		this.button_01 					= 	new svg_style("button")
		this.button_01.fnode 			=	this.fnode
		this.build_data()
	}

	create_div() {
		this.content += this.div_01.code
	}

	create_message_icon_and_cross_icon()
	{

		this.button_01.content				=		''

		this.button_01.class 				=		'chat-icon btn-common'

		this.button_01.svg_path				= 		'r_img/symbols/'
		this.button_01.svg_name 			= 		"message_icon.svg"
		this.button_01.svg_class 			= 		"message-icon"

		this.button_01.svg_alt				=		''	 // Pending to compose

		this.button_01.create_svg_base()

		this.button_01.svg_name 			= 		"cross_icon.svg"

		this.button_01.svg_alt				=		''	 // Pending to compose
		this.button_01.svg_class 			= 		"cross-icon shown"

		this.button_01.create_svg_base()

		this.button_01.pcreate()

		this.content						+=		this.button_01.code
	}


	build_data()
	{
		this.content = ""
		this.create_div()

		this.create_message_icon_and_cross_icon()
		this.pcreate()

		// OK [18-01-12]
		// this.p('code >' + this.code)

	}
}

exports.cpt04_div_captcha = cpt04_div_captcha
