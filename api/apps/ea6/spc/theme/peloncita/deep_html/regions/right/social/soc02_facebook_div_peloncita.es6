//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.8]  (2016-11-13)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Right Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//  <div class="social-container"> Facebook Block
//<div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
//<blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote>
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- load_file        : Load dat file from system
//- load_social      : Load dat social file from system
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class soc02_facebook_div_peloncita extends html_style {

	constructor() 
	{
		this.tag_type = "div"

		this.n = "soc02_facebook_div::"

		super.constructor(this.tag_type)
		this.div_01 = new html_style("div")
		this.a_01 = new html_style("a")
		this.blockquoute_01 = new html_style("blockquote")
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_blockquote() {
		this.a_01.href = "https://www.facebook.com/brqxwork"
		this.a_01.content = "Facebook Brqx"
		this.a_01.pcreate()
		this.blockquoute_01.cite = "https://www.facebook.com/brqxwork"
		this.blockquoute_01.class = "fb-xfbml-parse-ignore"
		this.blockquoute_01.content = this.a_01.code
		this.blockquoute_01.pcreate()
		this.div_01.content = this.blockquoute_01.code
	}

	create_div() {
		this.create_blockquote()
		this.div_01.class = "fb-page"
		this.div_01.data_href = "https://www.facebook.com/brqxwork"
		this.div_01.data_tabs = "timeline"
		this.div_01.data_small_header = "false"
		this.div_01.data_adapt_container_width = "true"
		this.div_01.data_hide_cover = "false"
		this.div_01.data_show_facepile = "true"
		this.div_01.pcreate()
		this.class = "social-container"
		this.content = this.div_01.code
		this.pcreate()
	}

	build_data() 
	{
		this.create_div()
	}

}

exports.soc02_facebook_div_peloncita = soc02_facebook_div_peloncita
