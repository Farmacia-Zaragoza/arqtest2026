// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Mail Svg Address Truck Class  [V.0.1.2]  (2018-01-11)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// <div class="address">
//<div class="backward"> (Inner)
//<div class="marquee marquee-horizontal" data-speed="50" data-direction="horizontal" data-hover-method="toggleForward"> (External)
//<svg_left_arrow>  (Inline)
//<svg_right_arrow> (Inline)
//<div class="forward">  (Inner)
//-------------------------------------------------------------------------------------
//DIV
//IMG
//SVG - Repeat
//POLYGON
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Class: c-mai02_div_mail_address-
//-------------------------------------------------------------------------------------
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const 	{ html_style } 				= 	require(	cons.JS_BASE  + 'com/objects/html/html_style.es6'									),
		{ svg_style } 				= 	require(	cons.JS_BASE  + 'com/objects/html/svg_style.es6'									),
		{ mar01_div_marquee }		= 	require( 	cons.JS_BASE  + 'spc/theme/truck/deep_html/types/marquee/mar01_div_marquee.es6'		);

class mai02_div_mail_address extends html_style {

	constructor(thm) 
	{
		let tag_type = "div"

		super(tag_type)
		this.n 								= "mai02_div_mail_address::"

		this.tag_type 						= "div"

		this.thm 							= thm
		this.fphone_common 					= this.thm.arr['fnode']['email_phone_common']
		this.fphone_lang 					= this.thm.arr['fnode']['email_phone_lang']
		this.class 							= "address"
		
		this.siv_forward 					= new svg_style("div")
		this.siv_forward.fnode				= this.fphone_lang
		
		this.siv_backward 					= new svg_style("div")
		this.siv_backward.fnode				= this.fphone_lang

		// Only containers. Never will be div layers
	
		this.siv_marquee_content 			= new svg_style("div")
		this.siv_marquee_content.fnode		= this.fphone_lang

		this.build_data()
	}


	create_marquee() {

		this.create_marquee_content()

		this.div_marquee 						= 		new mar01_div_marquee(
															this.fphone_common			, 
															this.siv_marquee_content.code	)
															
		this.content 							+= 		this.div_marquee.code
	}

	create_backward()
	{

		this.siv_backward.content				=		''													

		this.siv_backward.class 				=		'backward'							

		this.siv_backward.svg_path				= 		'r_img/arrows/'
		this.siv_backward.svg_name 				= 		"db-triangle-backward-H.svg"
		
		this.siv_backward.svg_alt				=		''	 // Pending to compose
		
		this.siv_backward.create_svg_base()

		this.siv_backward.pcreate()															
		
		this.content							+=		this.siv_backward.code											

	}

	create_forward()
	{

		this.siv_forward.content				=		''													

		this.siv_forward.class 					=		'forward'							

		this.siv_forward.svg_path				= 		'r_img/arrows/'
		this.siv_forward.svg_name 				= 		"db-triangle-forward-H.svg"
		
		this.siv_forward.svg_alt				=		''	 // Pending to compose
		
		this.siv_forward.create_svg_base()

		this.siv_forward.pcreate()															
		
		this.content							+=		this.siv_forward.code	

	}

	create_marquee_content()
	{

		this.siv_marquee_content.content		=		''													

		this.siv_marquee_content.svg_code_path	=		this.fphone_lang.email_svg_absolute_path
		this.siv_marquee_content.svg_code_url	=		this.fphone_lang.email_svg_absolute_url

		this.siv_marquee_content.class			=		'marquee-content'							

		this.siv_marquee_content.svg_alt		=		''	 // Pending to compose
		
		this.siv_marquee_content.create_svg_base_with_full_path()

		this.siv_marquee_content.pcreate()															
		
	}

	build_data() 
	{
		this.content = ""
		this.create_backward()
		this.create_marquee()
		this.create_forward()
		this.pcreate()
		
		// Ck [17-11-02]
		// this.p('Code : > ' + this.code )
	}

}

exports.mai02_div_mail_address = mai02_div_mail_address