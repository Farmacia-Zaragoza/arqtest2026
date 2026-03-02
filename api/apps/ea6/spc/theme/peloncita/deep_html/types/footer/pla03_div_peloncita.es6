//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.0.6]  (2016-11-20)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// <div class="container all-places-content">
//<div class="row">
//<div class="col-xs-12">
//<div id="block-block-7" class="block block-block collapsiblock-processed">
//<div class="content">
//<div class="row">
//<div class="col-sm-6 col-md-3 places-links"> * NColumns - External
// DIV
//NDIV
//DIV - Repeat * Columns
//DIV external
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider Div02 Peloncita Class
//------------------------------------------------------------------------------------
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class pla03_div_peloncita_footer extends html_style {

  constructor(fnode = "") 
  {
    this.tag_type = "div"

    this.n = "pla03_mid::"
    this.num_columns = ""
    this.text = ""

    this.fnode = fnode
    super.constructor(this.tag_type)
    this.div_01 = new pla02_div_peloncita_footer(this.fnode)
    this.siv_01 = new html_style("div")
    this.siv_02 = new html_style("div")
    this.siv_03 = new html_style("div")
    this.siv_04 = new html_style("div")
    this.siv_05 = new html_style("div")
    this.class = "container all-places-content"
    this.siv_01.class = "row"
    this.siv_02.class = "col-xs-12"
    this.siv_03.id = "block-block-7"
    this.siv_03.class = "block block-block collapsiblock-processed"
    this.siv_04.class = "content"
    this.siv_05.class = "row"
    this.num_columns = this.fnode.num_columns
    this.build_data()
  }

  build_data() 
  {
    this.content = ""
    var sw_active = 0
    var column = 0

    while (column < this.num_columns) {
      this.div_01.reload_contents(column)
      this.siv_05.content += this.div_01.code
      column++
    }

    this.siv_05.pcreate()
    this.siv_04.content = this.siv_05.code
    this.siv_04.pcreate()
    this.siv_03.content = this.siv_04.code
    this.siv_03.pcreate()
    this.siv_02.content = this.siv_03.code
    this.siv_02.pcreate()
    this.siv_01.content = this.siv_02.code
    this.siv_01.pcreate()
    this.content = this.siv_01.code
    this.pcreate()
  }

}

exports.pla03_div_peloncita_footer = pla03_div_peloncita_footer