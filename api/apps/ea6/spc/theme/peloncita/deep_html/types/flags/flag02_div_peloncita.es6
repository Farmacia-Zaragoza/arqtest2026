//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.0.2]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure Footer
//------------------------------------------------------------------------------------------------
// <div class="option">  - Level 06
//<div class="media">  - Level 07
//...
//DIV
//DIV - external
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flag02_div_peloncita extends html_style {

  constructor(thm) 
  {
    this.tag_type = "div"
    this.n = "flag02::"
    this.flag_file = ""
    this.flag_name = ""

    super.constructor(this.tag_type)
    this.thm = thm

    if ("types_flags" in this.thm.nid.arr.fnode) {
      this.fnode = this.thm.nid.arr.fnode.types_flags
      this.div_07 = new flag01_div_peloncita(this.thm)
      this.load_file()
    }
  }

  reload_contents(flag_file = "", flag_name = "") 
  {
    this.flag_file = flag_file
    this.flag_name = flag_name
    this.build_data()
  }

  clean_objects() {
    this.clean()
  }

  load_file() 
  {
    this.clean_objects()

    for (var sLinea of Object.values(this.fnode.dat_contents)) 
    {
      var html_arr = sLinea.split("@")
      var tame = html_arr[0].trim()
      var class_name = ""
      var style = ""
      var id = ""
      var name = ""
      var value = ""
      var len_arr = html_arr.length
      if (len_arr > 1) class_name = html_arr[1].trim()
      if (len_arr > 2) style = html_arr[2].trim()
      if (len_arr > 3) id = html_arr[3].trim()
      if (len_arr > 4) name = html_arr[4].trim()
      if (len_arr > 5) value = html_arr[5].trim()
      if (len_arr > 6) var href = html_arr[6].trim()
      if (tame == "liv_d06_p01") this.reload("div", tame, class_name, style, id)
    }
  }

  build_data() 
  {
    this.div_07.reload_contents(this.flag_file, this.flag_name)
    this.content = this.div_07.code
    this.pcreate()
  }

}

exports.flag02_div_peloncita = flag02_div_peloncita