// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Truck Phone Div Class  [V.0.1.1]  (2017-05-08)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// <div class="phone pop-container pop-container-social hidden-sm">
//<span class="link-description">Open from 10 AM to 8PM Open from 10
//<div class="icon"> - External
//<div class="address"> - External
//-------------------------------------------------------------------------------------
//DIV
//SPAN
//DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Class: c-phn03_div_phone-
//-------------------------------------------------------------------------------------
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= require(	cons.JS_BASE + 'com/objects/html/html_style.es6'										),
		{ phn02_div_phone_icon }	= require( 	cons.JS_BASE + 'spc/theme/truck/deep_html/types/phone/phn02_div_phone_icon.es6'		),
		{ phn02_div_phone_address }	= require( 	cons.JS_BASE + 'spc/theme/truck/deep_html/types/phone/phn02_div_phone_address.es6'	);

// NOTA: ESTE PHONE ES ELS QUE ESTA EN EL FLEX SLIDER. NO EL DEL MOBILE CONTACTS

class phn03_div_phone extends html_style {

	constructor(thm)
	{
		let tag_type 						= "div"
		super(tag_type)
		this.n 								= "phn03_div_phone_truck::"

		this.tag_type 						= "div"
		this.thm 							= thm
		this.fnode_site 					= this.thm.arr['fnode']['site_info_lang']
		this.class 							= "phone pop-container pop-container-social hidden-sm"
		this.div_02 						= new phn02_div_phone_icon(thm)
		this.div_01 						= new phn02_div_phone_address(thm)
		this.build_data()
	}

	create_span() {
		this.span_01 = new html_style("span")
		this.span_01.class = "link-description"
		this.span_01.content = this.fnode_site.time_table
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

		//Ok [17_07_10]
		// this.p('code >' + this.code)

	}

}

exports.phn03_div_phone = phn03_div_phone
