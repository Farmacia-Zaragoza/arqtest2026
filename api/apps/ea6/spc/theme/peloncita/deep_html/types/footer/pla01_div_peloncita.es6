//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Places Class  [V.0.0.3]  (2017-03-05)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure - Selections
//------------------------------------------------------------------------------------------------
// <div class="all-places">
//<div class="container-fluid">
//<div class="right-menu">
//<div class="lugares collapsiblock collapsiblockCollapsed">
//<h2 class="menu-item">Lugares
//<span class="closeIcon"></span>
//DIV
//DIV
//DIV
//DIV
//H2
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//-d-build_data-  	 : Build html final code for object
//-d-create_div_N-  : Generate divs
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class pla01_div_peloncita_footer extends html_style {

	constructor(fnode = "", text = "") 
	{
		let tag_type = "div"
		super(tag_type)

		this.tag_type = "div"

		this.n = "pla01_foo::"
		this.text = ""
		this.fnode = fnode
		this.text = text
		this.div_01 = new html_style("div")
		this.div_02 = new html_style("div")
		this.div_03 = new html_style("div")
		this.h2_01 = new html_style("h2")
		this.span_01 = new html_style("span")
		this.build_data()
	}

	create_div_03() {
		this.h2_01.class = "menu-item"
		this.h2_01.content = this.text
		this.h2_01.pcreate()
		this.div_03.content = this.h2_01.code
		this.span_01.class = "closeIcon"
		this.span_01.pcreate()
		this.div_03.content += this.span_01.code
		this.div_03.class = "lugares collapsiblock collapsiblockCollapsed"
		this.div_03.pcreate()
		this.div_01.content += this.div_03.code
	}

	create_div_01() {
		this.div_02.class = "right-menu"
		this.div_02.pcreate()
		this.div_01.content = this.div_02.code
		this.create_div_03()
		this.div_01.class = "container-fluid"
		this.div_01.pcreate()
		this.content = this.div_01.code
	}

	build_data() //245
	//this->dd('Code ' . this->code)											
	{
		this.class = "all-places"
		this.create_div_01()
		this.pcreate()
	}

}
