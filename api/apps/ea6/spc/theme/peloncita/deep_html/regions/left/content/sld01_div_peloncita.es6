//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.0.2]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure
//------------------------------------------------------------------------------------------------
//<div ">
// <div id="Primer-vistazo" class="tab-pane fade active in" aria-labelledby="Primer-vistazo-tab">
//[BLOCK CONTENT]
//DIV
//[BLOCK CONTENT]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class sld01_div_peloncita_left extends html_style {

	constructor(fnode, fnode_01, menu_type) {

		this.n = "sld01_div_left::"
		this.block_type = ""
		this.block_id = ""
		this.zone = "l"
		this.option_menu_type = "block"

		this.tag_type = "div"
		var tag_for_zone = "iv"
		this.menu_type = menu_type

		super.constructor(this.tag_type)
		this.fnode = fnode
		this.fnode_01 = fnode_01
		this.map = this.fnode.map + "content_" + this.zone + tag_for_zone + "/"
		this.fnode.map = this.map
		this.fnode_01.map = this.map
	}

	clean_objects() {
		this.clean()
	}

	reload_contents(block_id = "", block_type = "", div_class = "", div_id = "", div_aria_labelledby = "", option_menu_type = "block") 
	{
		this.clean_objects()
		this.class 				= "tab-pane fade"
		this.aria_labelledby 	= "-tab"
		this.block_id 			= block_id
		this.block_type 		= block_type
		this.option_menu_type 	= option_menu_type
		this.class 				= this.class + div_class
		this.id 				= div_id + this.fnode.page_position
		this.aria_labelledby 	= div_aria_labelledby + this.fnode.page_position + this.aria_labelledby
		this.build_data()
	}

	build_data() 
	{
		if (this.option_menu_type == "block") 
			{
				if (this.block_id != "" && this.block_type != "") 
					{
						this.bnode = new bn01_base(this.block_type, this.block_id, this.fnode)
						this.content = this.bnode.code
					}
			} else if (this.option_menu_type == "node") 
			{
				var block_01 = new lst02_ul_peloncita(this.fnode_01, this.menu_type)
				this.content = block_01.code
			} else if (this.option_menu_type == "complexnode") 
			{}

		this.role = "tabpanel"
		this.pcreate()
	}

}

exports.sld01_div_peloncita_left = sld01_div_peloncita_left
