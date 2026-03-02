//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Selection Div Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//Generate an Item - Could be a recuerdo or a selection
//-------------------------------------------------------------------------------------
//	<div class="item active">
//<h2 class="title">
//<a href="/seleccion/2009/reunion/anse_cascades/cascadas_anse">2009_Reu - Anse Cascades - Cascadas Anse - Reunion - seleccion</a>
//<ul class="links inline">   - Taxonomy
//<div class="tab_start">
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class sld03_div_seleccion_middle extends html_style {

	constructor() 
	{
		this.tag_type = "div"

		this.n = "sld03_mid::"
		this.item_active = ""
		super.constructor(this.tag_type)
		this.a_01 = new html_style("a")
		this.h2_01 = new html_style("h2")
	}

	reload_contents(fnode = "", ifnode = "", item_active = "") 
	{
		this.item_active = item_active
		this.fnode = fnode
		this.ifnode = ifnode
		this.clean_objects()
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_h2() {
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
		this.div_01 = new sel03_div_peloncita_middle(this.fnode, this.ifnode)
		this.content += this.div_01.code
	}

	create_ul() 
	{
		this.ul_01 		= new tax02_ul_peloncita(this.fnode.tnode)
		this.content 	+= this.ul_01.code
	}

	build_data() 
	{
		this.code = ""
		this.content = ""
		this.class = "item flex-slider" + this.item_active
		this.create_h2()
		this.create_ul()
		this.create_div()
		this.pcreate()
	}

}
