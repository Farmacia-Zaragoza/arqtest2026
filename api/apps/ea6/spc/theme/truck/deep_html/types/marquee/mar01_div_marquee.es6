//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Mail Div Class  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//<div class="marquee marquee-horizontal" data-speed="50" data-direction="horizontal" data-hover-method="toggleForward">
//<div class="marquee-wrapper">
//<div class="marquee-content">
//<!-- Convert below img to inline svg -->
//<img src="svg/email_address.svg">
//<p class='marquee-content'>
//-------------------------------------------------------------------------------------
//DIV
//DIV
//DIV
//SVG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--



const 	{ html_style } 				= require(	cons.JS_BASE + 'com/objects/html/html_style.es6'										);

class mar01_div_marquee extends html_style {

	constructor(fnode, marquee_content = "", marquee_speed = "50", marquee_direction = "horizontal", marque_data_hover = "toggleForward")
	{
		let tag_type 					= "div"

		super(tag_type)

		this.n 							= "mar01_div_marquee::"
		this.marquee_content 			= ""
		this.marquee_direction 			= "horizontal"
		this.marquee_speed 				= "50"
		this.marquee_data_hover 		= "toggleForward"

		this.tag_type 					= "div"
		this.fnode 						= fnode
		this.marquee_content 			= marquee_content
		this.marquee_direction 			= marquee_direction
		this.marquee_speed 				= marquee_speed
		this.marquee_data_hover 		= marque_data_hover

		this.siv_01 					= new html_style("div")
		this.class 						= "marquee marquee-" + this.marquee_direction
		this.siv_01.class 				= "marquee-wrapper"
		this.build_data()
	}

	create_div_01() {
		this.siv_01.content = this.marquee_content
		this.siv_01.pcreate()
		this.content = this.siv_01.code
	}

	build_data()
	{
		this.content = ""
		this.create_div_01()
		this.data_speed = this.marquee_speed
		this.data_direction = this.marquee_direction
		this.data_hover_method = this.marquee_data_hover
		this.pcreate()

		//$this->dd('code >' . $this->code)
	}

}

exports.mar01_div_marquee = mar01_div_marquee
