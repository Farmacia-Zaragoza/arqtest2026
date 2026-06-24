//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Mobile Div Flex Truck Class  [V.0.1.2]  (2017-07-08)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// <div class="mobile-contacts visible-xs text-center">
//<div class="email clearfix pop-container pop-container-social"> - External
//<div class="phone pop-container pop-container-social clearfix"> - External
//-------------------------------------------------------------------------------------
//DIV
//DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	cons.JS_BASE + 'com/objects/html/html_style.es6'										),
		{ mob02_div_email }			= 	require( 	cons.JS_BASE + 'spc/theme/truck/deep_html/types/mobile_contacts/mob02_div_email.es6'	),
		{ mob02_div_phone }			= 	require( 	cons.JS_BASE + 'spc/theme/truck/deep_html/types/mobile_contacts/mob02_div_phone.es6'	);


class mob03_div_flex_mobile extends html_style {

	constructor(thm)
	{
		let tag_type = "div"

		super(tag_type)
		this.n 						= "mob03_div_flex_mobile_truck::"

		this.tag_type = "div"
		this.thm = thm
		this.class = "mobile-contacts visible-sm text-center"
		this.div_01 = new mob02_div_email(this.thm)
		this.div_02 = new mob02_div_phone(this.thm)
		this.build_data()
	}

	build_data()
	{
		this.content = ""
		this.content += this.div_01.code
		this.content += this.div_02.code
		this.pcreate()

		// Ok [17-11-02]
		// this.p('code >' + this.code)

	}

}

exports.mob03_div_flex_mobile = mob03_div_flex_mobile
