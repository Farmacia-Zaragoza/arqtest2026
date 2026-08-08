//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Menu LI Class  [V.0.0.3]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure
//------------------------------------------------------------------------------------------------
//<ul ">
//LI - type image - text - pending
//   <li class="active" role="presentation">
//<a class="" id="Primer-vistazo-left-tab2" data-toggle="tab" href="#Primer-vistazo-left2" role="tab" aria-controls="Primer-vistazo-left2" aria-expanded="true">
//<div class="media">
//<div class="media-left image-wrapper text">
//<!-- text class on these two divs is non semantic class so as to satisfy bootstrap tabs functionality -->
//<img class="media-object b-lazy" data-src="http://cica.dbrqx.com/rimg/cica/images/aeroplane-white.svg" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//<div class="media-body text">
//Primer vistazo
//LI
//A
//DIV - External - media type
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Methods:
//- reload_contents       : Reload content from UL
//- create_span		   : Create html object
//- create_a		       : Create html object
//- clean_objects         : Empty bucle properties
//- build_data            : Generate LI object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class sld01_li_peloncita_itexts extends html_style {

	constructor(fnode = "") 
	{
		this.n = "sld01_menu_li_itexts::";
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

		this.tag_type = "li";
		super.constructor(this.tag_type);
		this.fnode = fnode;
		this.zone = this.fnode.zone;
		this.map = this.fnode.map + "menu_" + this.zone + "li/";
		this.a_01 = new html_style("a");
		this.com_03 = new com03_li_peloncita_left(this.fnode);
	}

	clean_objects() {
		this.clean();
		this.a_01.clean();
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

	create_span() 
	{
		this.img_url = this.fnode.u.site_url + this.fnode.u.cot.process_contents(this.map_print);
		this.com_03.reload_contents(this.a_href, this.span_text, this.img_url, this.position);
		this.a_01.content = this.com_03.content;
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

exports.sld01_li_peloncita_itexts = sld01_li_peloncita_itexts
