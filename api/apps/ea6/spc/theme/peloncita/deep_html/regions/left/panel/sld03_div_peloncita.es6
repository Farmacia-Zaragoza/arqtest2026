//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js Html panel_Div MenuAndContent Class  [V.0.2.1]  (2017-02-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//DIV_PANEL
//
//Aqui tenemos tres variantes
//    <div class="tab_start icons" role="tabpanel">
//<ul class="nav nav-tabs nav-tabs-responsive" role="tablist">   External
//
//<div class="tab-content clearfix">   						   External
//-------------------------------------------------------------------------------------
//DIV
//UL	(multi-type texts - icons - itexts)
//DIV	(multi-type texts - icons - itexts)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div	      : Create div_dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)


class sld03_div_peloncita extends html_style {

	constructor(fnode = "", fnode01 = "", menu_type_selector = "icons", menu_type_content = "icons") 
	{

		this.tag_type 				= "div";

		this.n 						= "sld03_div_peloncita::";
		this.num_elements_menu 		= "";

		this.menu_type_selector 	= menu_type_selector;
		this.menu_type_content 		= menu_type_content;
		super.constructor(this.tag_type);
		this.fnode 					= fnode;
		this.fnode_01 				= fnode01;
		this.zone 					= fnode.zone;
		this.map 					= fnode.map + "panel_" + this.zone + "iv/";
		this.fnode.map 				= this.map;
		this.fnode_01.zone 			= this.zone;
		this.ul_01 					= new sld02_ul_peloncita_left(this.fnode, this.menu_type_selector);
		this.fnode.map 				= this.map;
		this.div_01 				= new sld02_div_peloncita(this.fnode, this.fnode_01, this.menu_type_content);
		this.build_data();
	}

	update_menu_type() //Valido para todas las combinaciones de icons && texts
	{
		this.class = "tab_start icons all-combs";
		this.role = "tabpanel";
	}

	create_div() 
	{
		this.update_menu_type();
		this.content += this.ul_01.code;
		this.content += this.div_01.code;
		this.pcreate();
	}

	build_data() 
	{
		this.create_div();
	}

};

exports.sld03_div_peloncita = sld03_div_peloncita
