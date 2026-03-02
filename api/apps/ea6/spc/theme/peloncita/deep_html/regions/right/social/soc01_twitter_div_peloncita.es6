//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Html Div Class  [V.0.1.8]  (2016-11-13)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Right Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<div class="social-container"> Twitter Block
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

class soc01_twitter_div_peloncita extends html_style {
	constructor() //El constructor debe cargar las propiedades del archivo
	{
		this.tag_type = "div"
		super.constructor(this.tag_type)
		this.div_01 = new html_style("div")
		this.a_01 = new html_style("a")
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_div() //Twitter Div
	{
		this.a_01.class = "twitter-timeline"
		this.a_01.href = "https://twitter.com/brqxng"
		this.a_01.data_lang = "es"
		this.a_01.data_dnt = "true"
		this.a_01.data_theme = "light"
		this.a_01.data_height = 400
		this.a_01.content = "Tweets by brqxng"
		this.a_01.pcreate()
		this.div_01.class = "twitter-page"
		this.div_01.content = this.a_01.code
		this.div_01.pcreate()
		this.class = "social-container"
		this.content = this.div_01.code
	}

	build_data() //$this->d('code >' . $this->code)											
	{
		this.create_div()
		this.pcreate()
	}

}

exports.soc01_twitter_div_peloncita = soc01_twitter_div_peloncita