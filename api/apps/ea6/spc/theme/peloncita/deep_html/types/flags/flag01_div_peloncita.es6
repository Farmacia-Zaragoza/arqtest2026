//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.0.2]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure Footer
//------------------------------------------------------------------------------------------------
//	 <div class="media">  - Level 07
//<div class="media-left"> - Level 08
//<div class="flag-wrapper image-wrapper"> -Level 09
//<div class="flag flag-icon-background b-lazy" data-src="https://it.svg">  - Level 10
//<div class="media-body">
//Italian
//...
//DIV
//DIV
//DIV
//DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flag01_div_peloncita extends html_style {

  constructor(thm) 
  {
    this.tag_type = "div"

    this.n = "flag01::"
    this.flag_file = ""
    this.flag_name = ""

    super.constructor(this.tag_type)
    this.thm = thm

    if ("types_flags" in this.thm.nid.arr.fnode) {
      this.fnode = this.thm.nid.arr.fnode.types_flags
      this.div_08a = new html_style("div")
      this.div_08b = new html_style("div")
      this.div_09 = new html_style("div")
      this.div_10 = new html_style("div")
      this.load_file()
    }
  }

  reload_contents(flag_file = "", flag_name = "") //print $this->n . ' File ' . $flag_file . ' Name ' . $flag_name	. $this->lf 
  {
    this.flag_file = flag_file
    this.flag_name = flag_name
    this.build_data()
  }

  clean_objects() {
    this.clean()
  }

  load_file() //Load dat file searching TAME for TAGS
  //End foreach
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
      if (tame == "liv_d07_p01") this.reload("div", tame, class_name, style, id)
      if (tame == "liv_d08_p01") this.div_08a.reload("div", tame, class_name, style, id)
      if (tame == "liv_d08_p02") this.div_08b.reload("div", tame, class_name, style, id)
      if (tame == "liv_d09_p01") this.div_09.reload("div", tame, class_name, style, id)
      if (tame == "liv_d10_p01") this.div_10.reload("div", tame, class_name, style, id)
    }
  }

  create_div_10() {
    var icon_site = "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.7.0/flags/4x3/"
    this.div_10.data_src = icon_site + this.flag_file
    this.div_10.pcreate()
  }

  create_div_09() {
    this.create_div_10()
    this.div_09.content = this.div_10.code
    this.div_09.pcreate()
  }

  create_div_08a() {
    this.create_div_09()
    this.div_08a.content = this.div_09.code
    this.div_08a.pcreate()
  }

  create_div_08b() {
    this.div_08b.content = this.flag_name
    this.div_08b.pcreate()
  }

  create_div_07() {
    this.create_div_08a()
    this.create_div_08b()
    this.content = this.div_08a.code
    this.content += this.div_08b.code
  }

  build_data() //$puting_contents=$this->n . 'code >' . $this->code . '>' 	
  //$GLOBALS['putcont'].=$puting_contents
  {
    this.content = ""
    this.create_div_07()
    this.pcreate()
  }

}

exports.flag01_div_peloncita = flag01_div_peloncita
