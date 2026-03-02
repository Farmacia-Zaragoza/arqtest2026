//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Html UL Class  [V.0.0.3]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Theme UL Structure - Peloncita site
//------------------------------------------------------------------------------------------------
//   <ul class="nav nav-tabs nav-tabs-responsive" role="tablist">
//<li class="active" role="presentation">
//<a id="Primer-vistazo-tab" data-toggle="tab" href="#Primer-vistazo" role="tab" aria-controls="Primer-vistazo" aria-expanded="true">
//<span class="text"> Primer vistazo </span>
//<li class="next" role="presentation">
//<li role="presentation">
//UL
//LI - START REPEAT
//  A
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider UL Peloncita
//------------------------------------------------------------------------------------
//Methods:
//- clean_objects    : Empty bucle properties
//- load_file        : Load dat file from system
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	


class sld02_ul_peloncita_left extends html_style {

  constructor(fnode = "", menu_type = "icons", index_id = "txt") 
  {
    let tag_type = "ul"
	super(tag_type)
    this.n = "sld02_ul_menu_left::"
    this.num_elements_menu = ""
    this.zone = "l"
    this.index_id = "txt"


    this.tag_type = "ul"
    this.menu_type = menu_type
    this.index_id = index_id
    this.fnode = fnode
    this.zone = fnode.zone
    this.map = this.fnode.map + "menu_" + this.zone + "ul/"

    switch (this.menu_type) {
      case "texts":
        this.li_01 = new sld01_li_peloncita_texts(this.fnode)
        break

      case "icons":
        this.li_01 = new sld01_li_peloncita_icons(this.fnode)
        break

      case "itexts":
        this.li_01 = new sld01_li_peloncita_itexts(this.fnode)
        break
    }

    this.build_data()
  }

  clean_objects() {
    this.clean()
  }

  build_data() 
  {
    this.code = ""
    this.content = ""
    this.class = "nav nav-tabs nav-tabs-responsive"
    this.role = "tablist"
    var sw_active = 0

    if (this.index_id in this.fnode.arr) {
      let _tmp_0 = this.fnode.arr[this.index_id]

      for (var slide_num in _tmp_0) 
      {
        var slide_name = _tmp_0[slide_num]

        this.replace(slide_name , " ", "-")
        var slide_hyphen = this.result

        
        var span_text = slide_name
        var a_id = slide_hyphen
        var a_aria_controls = slide_hyphen
        var a_href = "#" + slide_hyphen

        if (!!slide_name) 
          {
            this.li_01.content = ""
            this.li_01.code = ""

            if (sw_active == 0) {
              var li_class = "active"
              var a_aria_expanded = "true"
            } else if (sw_active == 1) {
              li_class = "next"
              a_aria_expanded = ""
            } else {
              li_class = ""
              a_aria_expanded = ""
            }

            sw_active++
            this.li_01.reload_contents(li_class, span_text, a_id, a_aria_controls, a_aria_expanded, a_href, slide_num)
            this.content += this.li_01.code
          }
      }
    }

    this.pcreate()
  }

}

exports.sld02_ul_peloncita_left = sld02_ul_peloncita_left