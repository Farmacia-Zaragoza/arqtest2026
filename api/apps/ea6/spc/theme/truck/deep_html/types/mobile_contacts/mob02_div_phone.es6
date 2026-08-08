// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Mobile Div Phone Truck Class  [V.0.1.7]  (2017-07-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//	<div class="phone pop-container pop-container-social clearfix" >
//<span class="link-description">Open from 10 AM to  10 AM
//<div class="address"><img src="svg/phone_no.svg"></div>
//<div class="icon"><svg src="img/email_icon_white.svg">
//-------------------------------------------------------------------------------------
//DIV
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		{ phn02_div_phone_icon }	= 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/phone/phn02_div_phone_icon.es6'),
		{ phn02_div_phone_address }	= 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/phone/phn02_div_phone_address.es6'));


class mob02_div_phone extends html_style {

	constructor(thm) {
		let tag_type 					= "div"

		super(tag_type)
		this.n 							= "mob02_div_phone_truck::"

		this.tag_type 					= "div"
		this.thm = thm
		this.fnode_site 				= this.thm.arr['fnode']['site_info_lang']
		this.class 						= "phone pop-container pop-container-social clearfix"
		this.div_02 					= new phn02_div_phone_icon(this.thm)
		this.div_01 					= new phn02_div_phone_address(this.thm)
		this.build_data()
	}

	create_span() {
		this.span_01 					= new html_style("span")
		this.span_01.class 				= "link-description"
		this.span_01.content 			= this.fnode_site.time_table
		this.span_01.pcreate()
		this.content 					+= this.span_01.code
	}

	build_data()
	{
		this.content = ""
		this.create_span()
		this.content 					+= this.div_01.code
		this.content	 				+= this.div_02.code
		this.pcreate()

		// Ok [17-11-02]
		//this.p('code >' + this.code)
	}

}

exports.mob02_div_phone = mob02_div_phone
