//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//Generate an Item - Could be a recuerdo or a selection
//-------------------------------------------------------------------------------------
//	<div class="item active">
//<h2 class="title">
//<a href="/recuerdo_path">2005_Esp - Aranjuez - Escapadita al río de Madrid - España - recuerdo</a>
//<ul class="links inline">   - Taxonomy
//<div class="recuerdo-images" tame="item_d02_p03">
//-------------------------------------------------------------------------------------
//DIV
//H2
//A
//UL
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class sld03_div_recuerdo_middle extends html_style {

	constructor()
	{
		this.tag_type = "div"

		this.n = "sld03_rec_mid::"
		this.num_elements_menu = ""
		this.item_active = ""
		super.constructor(this.tag_type)
		this.a_01 = new html_style("a")
		this.h2_01 = new html_style("h2")
	}

	reload_contents(fnode = "", item_active = "") {
		this.item_active = item_active
		this.fnode = fnode
		this.clean_objects()
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_h2()
	{
		this.h2_01.code = ""
		this.h2_01.content = ""
		this.a_01.href = this.fnode.path
		this.a_01.content = this.fnode.title
		this.a_01.pcreate()
		this.h2_01.class = "title"
		this.h2_01.content = this.a_01.code
		this.h2_01.pcreate()
		this.content += this.h2_01.code
	}

	create_div()
	{
		this.div_01.code = ""
		this.div_01.content = ""
		this.div_01 = new rec03_div_peloncita_middle(this.fnode)
		this.content += this.div_01.code
	}

	create_ul()
	{
		this.ul_01 = new tax02_ul_peloncita(this.fnode.tnode)
		this.content += this.ul_01.code
	}

	build_data()
	{
		this.code = ""
		this.content = ""
		this.class = "item"
		this.class += this.item_active
		this.create_h2()
		this.create_ul()
		this.create_div()
		this.pcreate()
	}

}

exports.sld03_div_recuerdo_middle = sld03_div_recuerdo_middle

