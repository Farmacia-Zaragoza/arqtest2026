//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.0.6]  (2016-11-20)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// <div class="col-sm-6 col-md-3 places-links"> * NColumns
//<div class="tagadelic-container"> - External
// DIV - Repeat * Columns
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

class pla02_div_peloncita_footer extends html_style {

   constructor(fnode = "") 
   {
      this.tag_type = "div"

      this.n = "pla02_footer::"
      this.num_column = ""
      this.text = ""
      this.fnode = fnode
      super.constructor(this.tag_type)
      this.div_01 = new tag01_div_peloncita_footer(this.fnode)
      this.class = "col-sm-6 col-md-3 places-links"
   }

   reload_contents(num_column = "0") 
   {
      this.num_column = num_column
      this.content = ""
      var sw_active = 0

      if (undefined !== this.fnode.arr["a-" + this.num_column]) {
         let _tmp_0 = this.fnode.arr["a-" + this.num_column]

         for (var slide_num in _tmp_0) //General id General tabid 0-1
         //activa id General tabid 0-1
         {
            var slide_name = _tmp_0[slide_num]
            var current_alt = slide_name
            var current_href = this.fnode.arr["u-" + this.num_column][slide_num]
            var current_tit = this.fnode.arr["t-" + this.num_column][slide_num]
            var current_cls = this.fnode.arr["c-" + this.num_column][slide_num]

            if (!!slide_name) //04. Alt
               {
                  this.div_01.reload_contents(current_href, current_cls, current_tit, current_alt)
                  this.content += this.div_01.code
               }
         }
      }

      this.pcreate()
   }

}

