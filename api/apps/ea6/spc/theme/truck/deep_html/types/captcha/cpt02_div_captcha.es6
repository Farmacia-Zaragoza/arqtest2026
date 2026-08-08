//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Captcha Div Class Level02  [V.0.0.5]  (2017-07-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//<div id="captcha">
//<div class="controls">
//<input class="user-text btn-common" placeholder="Type here" type="text" />
//<button class="validate btn-common"> (external)
//<button class="refresh btn-common">  (external)
//DIV - bucle repeat
//DIV
//INPUT
//BUTTON
//BUTTON
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 					= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));
		const { cpt01_button_captcha }		= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/captcha/cpt01_button_captcha.es6'));


class cpt02_div_captcha extends html_style {

	constructor(thm)
	{
		let tag_type 					= "div"

		super(tag_type)
		this.n 						= "cpt02_div::"
		this.button_class 			= ""
		this.button_name 			= ""
		this.button_alt 			= ""

		this.tag_type 				= "div"
		this.id 					= "captcha"
		this.thm 					= thm

		this.fnode_site = this.thm.arr['fnode']['site_info_lang']

		this.div_01 				= new html_style("div")
		this.div_01.class 			= "controls"
		this.input_01 				= new html_style("input")
		this.button_01 				= new cpt01_button_captcha(this.thm)
		this.build_data()
	}

	create_button_01() {
		this.button_class = "validate btn-common"
		this.button_name = "enter_icon.svg"
		this.button_alt = "submit icon"
		this.button_01.reload_data(this.button_name, this.button_class, this.button_alt)
		this.div_01.content 				+= this.button_01.code
	}

	create_button_02() {
		this.button_class 					= "refresh btn-common"
		this.button_name 					= "refresh_icon.svg"
		this.button_alt 					= "refresh icon"
		this.button_01.reload_data(this.button_name, this.button_class, this.button_alt)
		this.div_01.content 				+= this.button_01.code
	}

	create_input() {
		this.input_01.class 				= "user-text btn-common"
		this.input_01.placeholder 			= this.fnode_site.captcha_text
		this.input_01.type 					= "text"
		this.input_01.pcreate()
		this.div_01.content 				+= this.input_01.code
	}

	create_div() {
		this.div_01.content = ""
		this.create_input()
		this.create_button_01()
		this.create_button_02()
		this.div_01.pcreate()
		this.content += this.div_01.code
	}

	build_data()
	{
		this.content = ""
		this.create_div()
		this.pcreate()

		//Ok [17-06-24]
		//$this->dd('Code > ' . $this->code)

	}

}

exports.cpt02_div_captcha = cpt02_div_captcha
