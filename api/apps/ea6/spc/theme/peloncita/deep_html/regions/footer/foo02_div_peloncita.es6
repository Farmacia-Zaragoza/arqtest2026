//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS - Html Div Class  [V.0.0.1]  (2017-10-17)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure Footer
//------------------------------------------------------------------------------------------------
//	<div class="container"> - Main
//<div class="row">
//<div class="col-xs-12">
//<div class="message">       - External
//<div class="lang-weblinks"> - External
//<div class="brqx-flags">    - External
//...
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class foo02_div_peloncita extends html_style {

	constructor(thm) 
	{
		let tag_type 			= "div"
		super(this.tag_type)

		this.n 					= "foo02_div::"
		this.num_elements_menu 	= ""
		this.information 		= ""

		this.tag_type 			= "div"
		this.thm 				= thm
		this.fnode 				= this.thm.nid.arr.fnode.types_flags
		this.siv_01 			= new html_style("div")
		this.siv_02 			= new html_style("div")
		this.class 				= "container"
		this.siv_01.class 		= "row"
		this.siv_02.class 		= "col-xs-12"
		this.clean_objects()
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_div_01() {
		this.div_01 					= 	new flg02_div_message_footer(this.fnode)
		this.div_02 					= 	new flg02_div_lang_footer(this.fnode)
		this.div_03 					= 	new flg02_div_flag_footer(this.fnode)
		this.siv_02.content 			= 	this.div_01.code
		this.siv_02.content 			+= 	this.div_02.code
		this.siv_02.content 			+= 	this.div_03.code
		this.siv_02.pcreate()
		this.siv_01.content 			= 	this.siv_02.code
		this.siv_01.pcreate()
		this.content 					= 	this.siv_01.code
	}

	build_data() 
	{
		this.class = "container"
		this.create_div_01()
		this.pcreate()
		this.dd("Code > " + this.code)
	}

}

exports.foo02_div_peloncita = foo02_div_peloncita 