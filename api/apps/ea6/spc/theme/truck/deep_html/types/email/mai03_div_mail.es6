// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Truck Mail Div Class  [V.0.1.4]  (2018-01-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology - Truck [COMMON_EA6]
//-------------------------------------------------------------------------------------
//<div class="email pop-container pop-container-social hidden-sm">
//<span class="link-description">Please remove _nospam to answer
//<div class="icon pop-container pop-container-social"> - External
//<div class="address"> - External
//-------------------------------------------------------------------------------------
//DIV
//SPAN
//DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')),
		{ mai02_div_mail_icon }			= 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/email/mai02_div_mail_icon.es6')),
		{ mai02_div_mail_address_flex } = 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/email/mai02_div_mail_address_flex.es6'));

// NOTA: ESTE EMAIL ES ELS QUE ESTA EN EL FLEX SLIDER. NO EL DEL MOBILE CONTACTS

class mai03_div_email extends html_style {

	constructor(thm)
	{
		let tag_type 					= "div"

		super(tag_type)
		this.n 							= "mai03_div_email_truck::"
		this.tag_type 					= "div"
		this.thm 						= thm
		this.fnode_site 				= this.thm.arr['fnode']['site_info_lang']
		this.class 						= "email pop-container pop-container-social hidden-sm"
		this.div_01 					= new mai02_div_mail_icon(this.thm)
		this.div_02 					= new mai02_div_mail_address_flex(this.thm)
		this.build_data()
	}

	create_span() {
		this.span_01 = new html_style("span")
		this.span_01.class = "link-description"
		this.span_01.content = this.fnode_site.anti_spam
		this.span_01.pcreate()
		this.content += this.span_01.code
	}

	build_data()
	{
		this.content = ""
		this.create_span()
		this.content += this.div_01.code
		this.content += this.div_02.code
		this.pcreate()

		// Ok [18-01-12]
		// this.p('code >' + this.code)
	}

}

exports.mai03_div_email = mai03_div_email
