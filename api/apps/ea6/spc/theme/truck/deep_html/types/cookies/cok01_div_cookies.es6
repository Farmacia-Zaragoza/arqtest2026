//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Cookies Div Truck Class  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="cookies">
//<div class="container text-center">
//This website uses cookies to enhance browsing experience. By continuing using this website you accept cookies. Please visit our
//<a href="cookie.html">Privacy and Cookies Policy page</a> for more information.
//-------------------------------------------------------------------------------------
// DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 					= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"	)

const 	{ html_style } 			= require(	cons.JS_BASE + '/com/objects/html/html_style.es6'			)


class cok01_div_cookies extends html_style {

	constructor(thm = "") 
	{
		let tag_type 						= "div"

		super(tag_type)
		this.n 							= "cok01_div_cookies::"

		this.cookies_msg_begin 			= ""
		this.cookies_msg_end 			= ""
		this.cookies_msg_uri 			= ""
		this.cookies_msg_uri_text 		= ""

		this.tag_type 					= "div"
		this.class 						= "cookies"
		this.thm 						= thm

		this.fnode_lang 				= this.thm.arr['fnode']['link_list_lang']
		this.fnode_common 				= this.thm.arr['fnode']['link_list_common']

		this.siv_01 					= new html_style("div")
		this.siv_01.class 				= "container text-center"
		this.a_01 						= new html_style("a")
		this.build_data()
	}

	create_cookies() {
		this.siv_01.content += this.fnode_lang.cookies_msg_01 + " "
		this.create_uri()
		this.siv_01.content += this.fnode_lang.cookies_msg_02
		this.siv_01.pcreate()
		this.content += this.siv_01.code
	}

	create_uri() {
		this.a_01.content += this.fnode_lang.cookies_msg_uritext
		this.a_01.href += this.fnode_common.u.lang_url + this.fnode_common.cookies_msg_uri
		this.a_01.pcreate()
		this.siv_01.content += this.a_01.code + " "
	}

	build_data() 
	{
		this.content = ""
		this.create_cookies()
		this.pcreate()

		//this.p('code >' + this.code)

		//$this->dd('code >' . $this->code)
	}

}

exports.cok01_div_cookies = cok01_div_cookies