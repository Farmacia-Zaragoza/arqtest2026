//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Html LI Class  [V.0.0.3]  (2017-01-15)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure - Common content
//------------------------------------------------------------------------------------------------
//
//inner LI - COMMON CONTENT -  IMAGE - TEXT
//<div class="media-left image-wrapper text">
//<img  class="media-object b-lazy" data-src="images/slider-icons/aeroplane-white.svg"
//src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//<div class="media-body text">
//Primer vistazo
//   DIV
//IMG
//DIV
//
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Methods:
//- load file       : Load dat file attributes
//- clean_objects   : Empty bucle properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class com03_li_peloncita_left extends html_style {

	constructor(fnode = "") 
	{
		this.n = "com03_li_left::";
		this.url = "";
		this.img_url = "";
		this.text = "";
		this.description = "";
		this.div_01_class = "media-left image-wrapper text";
		this.div_02_class = "media-body text";

		this.tag_type = "div";
		this.fnode = fnode;
		this.fnode.map = this.map;
		super.constructor(this.tag_type);
		this.map = this.fnode.map;
		this.div_01 = new html_style("div");
		this.div_02 = new html_style("div");
		this.img_01 = new html_style("img");
		this.a_01 = new html_style("a");
	}

	reload_contents(url = "", text = "", img_url = "", position = "", div_01_class = "media-left image-wrapper text", div_02_class = "media-body text") {
		this.url = url;
		this.text = text;
		this.description = text;
		this.img_url = img_url;
		this.div_01_class = div_01_class;
		this.div_02_class = div_02_class;
		this.build_data();
	}

	create_div_02() {
		this.div_02.class = this.div_02_class;
		this.div_02.content = this.text;
		this.div_02.pcreate();
		this.content += this.div_02.code;
	}

	create_div_01()
	{
		this.img_01.class = "media-object b-lazy";
		this.img_01.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		this.img_01.data_src = this.img_url;
		this.img_01.pcreate();
		this.div_01.content = this.img_01.code;
		this.div_01.class = this.div_01_class;
		this.div_01.pcreate();
		this.content = this.div_01.code;
	}

	build_data() 
	{
		this.create_div_01();
		this.create_div_02();
	}

};

exports.com03_li_peloncita_left = com03_li_peloncita_left
