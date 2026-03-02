//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html LI Class  [V.0.0.3]  (2017-01-15)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure - Common content
//------------------------------------------------------------------------------------------------
//
//inner LI - COMMON CONTENT -  IMAGE - TEXT -
//  <div class="individual-link">
//<a class="image-wrapper shadow2 pop-link" href="http://cica.dbrqx.com/gal/cp/contenido/recuerdo" title="Listado de muchos recuerdos">
//<img class="img-responsive b-lazy" data-src="../own-icons/AlienAqua_the_gimp.png"
//src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//<span class="link-description">L i s t a d o</span>
//   DIV
//A
//IMG
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Methods:
//- load file       : Load dat file attributes
//- clean_objects   : Empty bucle properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class com02_li_peloncita_left extends html_style {

	constructor(fnode = "") //Es una composicion de contenido. No tiene mapa por ahora
	{
		this.n = "com02_li_left::";
		this.url = "";
		this.img_url = "";
		this.text = "";
		this.description = "";

		this.tag_type = "div";
		this.fnode = fnode;
		super.constructor(this.tag_type);
		this.img_01 = new html_style("img");
		this.span_01 = new html_style("span");
		this.a_01 = new html_style("a");
	}

	reload_contents(url = "", text = "", img_url = "", position = "") 
	{
		this.url = url;
		this.text = text;
		this.description = text;
		this.img_url = img_url;
		this.build_data();
	}

	create_div() {
		this.create_img_01();
		this.span_01.content = this.description;
		this.span_01.class = "link-description";
		this.span_01.pcreate();
		this.a_01.class = "image-wrapper shadow2 pop-link";
		this.a_01.href = this.url;
		this.a_01.title = this.text;
		this.a_01.content = this.img_01.code;
		this.a_01.content += this.span_01.code;
		this.a_01.pcreate();
		this.class = "individual-link";
		this.content = this.a_01.code;
	}

	create_img_01() 
	{
		this.img_01.class = "img-responsive b-lazy";
		this.img_01.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		this.img_01.data_src = this.img_url;
		this.img_01.pcreate();
	}

	build_data() 
	{
		this.create_div();
		this.pcreate();
	}

};

exports.com02_li_peloncita_left = com02_li_peloncita_left