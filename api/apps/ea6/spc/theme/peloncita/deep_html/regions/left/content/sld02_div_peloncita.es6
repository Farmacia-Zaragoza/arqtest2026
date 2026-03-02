//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Html content_Div Bucle Class  [V.0.0.5]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//Tres variantes
//	<div class="tab-content">
//<div id="Primer-vistazo" class="tab-pane fade active in" aria-labelledby="Primer-vistazo-tab">
//<div id="Algunos-paises" class="tab-pane fade">
//DIV
//DIV - START REPEAT
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider Div02 Peloncita Class
//------------------------------------------------------------------------------------
//Methods:
//-------------------------------------------------------------------------------------
//- load_file        : Load dat file from system
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class sld02_div_peloncita extends html_style {

   constructor(fnode = "", fnode_01 = "", menu_type = "icons", index_id = "txt") 
   {
      let tag_type = "div"
		
	  super(tag_type)
      this.n = "sld02_div_peloncita::"
      this.num_elements_menu = ""
      this.index_id = "txt"
      this.tag_type = "div"

      var tag_for_zone = "iv"
      this.index_id = index_id
      this.menu_type = menu_type
      this.fnode = fnode
      this.fnode_01 = fnode_01
      this.zone = this.fnode.zone
      this.map = this.fnode.map + "content_" + this.zone + tag_for_zone + "/"
      this.fnode.map = this.map
      this.fnode_01.map = this.map
      this.div_01 = new sld01_div_peloncita_left(this.fnode, this.fnode_01, this.menu_type)
      this.build_data()
   }

   clean_objects() {
      this.clean()
   }

   build_data() 
   {
      this.code = ""
      this.content = ""
      var sw_active = 0
      var div_first_element_class = " active in"
      var div_next_elements_class = ""

      if (this.index_id in this.fnode.arr) {
         let _tmp_0 = this.fnode.arr[this.index_id]

         for (var slide_num in _tmp_0) 
         {
            var slide_name = _tmp_0[slide_num]
            var option_menu_type = this.fnode.arr['mnu'][slide_num]
            
            this.replace(slide_name , " ", "-")
            var slide_hyphen = this.result
            
            
            var div_id = slide_hyphen

            if (!!slide_name) 
               {
                  this.div_01.content = ""
                  this.div_01.code = ""
                  var div_aria_labelledby = slide_hyphen

                  if (sw_active == 0) {
                     var div_class = div_first_element_class
                  } else {
                     div_class = div_next_elements_class
                  }

                  sw_active++
                  var current_block_id = this.fnode.arr['id'][slide_num]
                  var current_block_type = this.fnode.arr['typ'][slide_num]
                  this.div_01.reload_contents(current_block_id, current_block_type, div_class, div_id, div_aria_labelledby, option_menu_type)
                  this.content += this.div_01.code
               }
         }
      }

      this.class = "tab-content clearfix iconText icons text"
      this.pcreate()
   }

}

exports.sld02_div_peloncita = sld02_div_peloncita