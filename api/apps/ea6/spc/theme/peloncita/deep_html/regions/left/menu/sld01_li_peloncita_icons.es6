//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html LI Class  [V.0.0.3]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure
//------------------------------------------------------------------------------------------------
//<ul ">
//    <li role="presentation">
//LI - type image
//<a id="Primer-vistazo-left-tab" data-toggle="tab" href="#Primer-vistazo-left" role="tab" aria-controls="Primer-vistazo-left" aria-expanded="true">
//<span class="text image-wrapper">
//<img class="img-responsive b-lazy" data-src="images/slider-icons/aeroplane-white.svg"
//src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//</ul><!-- end menu -->
//
//LI
//A
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Methods:
//- load file       : Load dat file attributes
//- clean_objects   : Empty bucle properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class sld01_li_peloncita_icons extends html_style {
	

	constructor(fnode = "") //El constructor debe cargar las propiedades del archivo
	//Inner LI common content
	{

		super();
		this.n = "sld01_menu_li_icons::";
		this.span_text = "";
		this.a_id = "";
		this.a_aria_controls = "";
		this.a_aria_expanded = "";
		this.a_href = "";
		this.position = "";
		this.img_url = "";
		this.map_print = "";

	
		this.tag_type = "li";
		super.constructor(this.tag_type);
		this.fnode = fnode;
		this.zone = this.fnode.zone;
		this.map = this.fnode.map + "menu_" + this.zone + "li/";
		this.img_01 = new html_style("img");
		this.span_01 = new html_style("span");
		this.a_01 = new html_style("a");
		this.com_03 = new com03_li_peloncita_left(this.fnode);
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
		this.img_url = this.fnode.u.site_url + this.fnode.u.cot.process_contents(this.map_print);
		this.create_img();
		this.span_01.class = "text ";
		this.span_01.class += "image-wrapper";
		this.span_01.content = this.img_01.code;
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

exports.sld01_li_peloncita_icons = sld01_li_peloncita_icons