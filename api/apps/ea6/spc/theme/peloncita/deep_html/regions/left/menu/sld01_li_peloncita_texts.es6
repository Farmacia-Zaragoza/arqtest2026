//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html LI Class  [V.0.0.3]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure
//------------------------------------------------------------------------------------------------
//<ul ">
//    <li role="presentation">
//LI - text
//<a id="Nuestros-Viajes-tab" data-toggle="tab" href="#Nuestros-Viajes" role="tab" aria-controls="Nuestros-Viajes">
//<span class="text"> Nuestros Viajes </span>
//</ul><!-- end menu -->
//
//LI
//A
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Methods:
//- reload_content       : Load dat file attributes
//- clean_objects   : Empty bucle properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class sld01_li_peloncita_texts extends html_style {

	constructor(fnode = "") 
	{
		this.tag_type = "li";

		this.n = "sld01_menu_li_texts::";
		this.com_03 = "";
		this.zone = "l";
		this.span_text = "";
		this.a_id = "";
		this.a_aria_controls = "";
		this.a_aria_expanded = "";
		this.a_href = "";
		this.position = "";
		this.img_url = "";
		this.map_print = "";

		super.constructor(this.tag_type);
		this.fnode = fnode;
		this.zone = this.fnode.zone;
		this.map = this.fnode.map + "menu_" + this.zone + "li/";
		this.img_01 = new html_style("img");
		this.span_01 = new html_style("span");
		this.a_01 = new html_style("a");
	}

	clean_objects() {
		this.clean();
		this.a_01.clean();
		this.span_01.clean();
	}

	reload_contents(li_class = "", span_text = "", a_id = "", a_aria_controls = "", a_aria_expanded = "", a_href = "", position = "") 
	{
		this.span_text = span_text;
		this.a_id = a_id;
		this.a_aria_controls = a_aria_controls;
		this.a_aria_expanded = a_aria_expanded;
		this.a_href = a_href;
		this.position = position;
		this.map_print = this.map + position;
		this.clean_objects();
		this.class = li_class;
		this.build_data();
	}

	create_img() 
	{
		this.img_01.class = "img-responsive b-lazy";
		this.img_01.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		this.img_01.data_src = this.img_url;
		this.img_01.pcreate();
	}

	create_span() 
	{
		this.span_01.class = "text ";
		this.span_01.content = this.span_text;
		this.span_01.pcreate();
		this.a_01.content = this.span_01.code;
	}

	create_a() {
		this.create_span();
		this.a_01.id = "-tab";
		this.a_01.data_toggle = "tab";
		this.a_01.role = "tab";
		this.a_01.href = this.a_href + this.fnode.page_position + this.a_01.href;
		this.a_01.id = this.a_id + this.fnode.page_position + this.a_01.id;
		this.a_01.aria_controls = this.a_aria_controls + this.fnode.page_position + this.a_01.aria_controls;
		this.a_01.aria_expanded = this.a_aria_expanded;
		this.a_01.pcreate();
		this.content = this.a_01.code;
	}

	build_data() 
	{
		this.role = "presentation";
		this.create_a();
		this.pcreate();
	}

};

exports.sld01_li_peloncita_texts = sld01_li_peloncita_texts
