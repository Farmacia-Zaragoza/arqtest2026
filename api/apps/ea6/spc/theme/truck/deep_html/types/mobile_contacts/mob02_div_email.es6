// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Mobile Email Flex Slider Class  [V.0.1.8]  (2018-01-10)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Truck Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//	<div class="email clearfix pop-container pop-container-social">
//<span class="link-description">Please remove _nospam to answer
//<div class="icon">
//<div class="address">
//-------------------------------------------------------------------------------------
//DIV
//SPAN
//DIV (external)
//DIV (external)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')),
		{ mai02_div_mail_icon }		= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/email/mai02_div_mail_icon.es6')),
		{ mai02_div_mail_address }	= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/email/mai02_div_mail_address.es6'));

class mob02_div_email extends html_style {

	constructor(thm)
	{
		let tag_type 			= "div"

		super(tag_type)
		this.n 					= "mob02_div_email_truck::"

		this.tag_type 			= "div"
		this.thm 				= thm
		this.fnode_site 		= this.thm.arr.fnode.site_info_lang
		this.class 				= "email clearfix pop-container pop-container-social"
		this.div_01 			= new mai02_div_mail_icon(thm)
		this.div_02 			= new mai02_div_mail_address(thm)
		this.build_data()
	}

	create_span() {
		this.span_01 			= new html_style("span")
		this.span_01.class 		= "link-description"
		this.span_01.content 	= this.fnode_site.anti_spam
		this.span_01.pcreate()
		this.content 			+= this.span_01.code
	}

	build_data()
	{
		this.content 			= ""
		this.create_span()
		this.content 			+= this.div_01.code
		this.content 			+= this.div_02.code
		this.pcreate()

		// Ok [17-11-02]
		// this.p('code >' + this.code)
	}

}

exports.mob02_div_email = mob02_div_email
