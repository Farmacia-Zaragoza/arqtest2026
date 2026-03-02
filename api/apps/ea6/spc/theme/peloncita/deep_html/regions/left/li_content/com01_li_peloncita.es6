//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html LI Class  [V.0.0.3]  (2017-01-15)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure - Common content
//------------------------------------------------------------------------------------------------
//
//inner LI - COMMON CONTENT -  IMAGE - TEXT
//<div class="media-left image-wrapper">
//<img class="b-lazy" data-src="../images/Link_font_awesome.svg"
//src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//<div class="media-body">
//<a class="pop-link" href="http://cica.dbrqx.com/gal/cp/contenido">
//Lugares visitados
//<span class="link-description">Recuerdos y selecciones de lugares</span>
//DIV
//IMG
//DIV
//     A
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Methods:
//- load file       : Load dat file attributes
//- clean_objects   : Empty bucle properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class com01_li_peloncita_left extends html_style {

	constructor(fnode = "") 
	{
		this.n = "com01_li_left::";
		this.url = "";
		this.img_url = "";
		this.text = "";
		this.description = "";
		this.div_01_class = "media-left image-wrapper";
		this.div_02_class = "media-body";
		this.span_01_class = "link-description";
		this.a_01_class = "pop-link";

		this.fnode = fnode;
		this.map = this.fnode.map;
		this.div_01 = new html_style("div");
		this.div_02 = new html_style("div");
		this.img_01 = new html_style("img");
		this.span_01 = new html_style("span");
		this.a_01 = new html_style("a");
	}

	reload_contents(url = "", text = "", img_url, position = "", div_01_class = "media-left image-wrapper", div_02_class = "media-body") {
		this.url = url;
		this.text = text;
		this.description = text;
		this.img_url = img_url;
		this.div_01_class = div_01_class;
		this.div_02_class = div_02_class;
		this.build_data();
	}

	create_div_02() {
		this.span_01.content = this.description;
		this.span_01.class = this.span_01_class;
		this.span_01.pcreate();
		this.a_01.class = "pop-link";
		this.a_01.href = this.url;
		this.a_01.content = this.text;
		this.a_01.content += this.span_01.code;
		this.a_01.pcreate();
		this.div_02.class = this.div_02_class;
		this.div_02.content = this.a_01.code;
		this.div_02.pcreate();
		this.content += this.div_02.code;
	}

	create_div_01() 
	{
		this.img_01.class = "b-lazy";
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

exports.com01_li_peloncita_left = com01_li_peloncita_left