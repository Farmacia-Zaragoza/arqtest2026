//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.0.5]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// <div class="row"> - level 02
//<div class="col-xs-12 col-md-3 col-lg-2-point-5 no-padding-xs"> - level 03
//<div id="lang_select"> - level 04
//<div id="lang_selected"> - level 05
//<div class="media"> - EXTERNAL - Level 06
//<div class="options"> - 	LEVEL 05
//<div class="option"> EXTERNAL - Level 06
//DIV
//DIV
//DIV
//DIV
//div - external
//   DIV - bucle repeat
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

class flag03_div_peloncita extends html_style {

	constructor(thm) 
	{
		this.tag_type = "div"

		this.n = "flg03::"
		this.num_elements_menu = ""

		super.constructor(this.tag_type)
		this.thm = thm

		if ("types_flags" in this.thm.nid.arr.fnode) {
			this.fnode = this.thm.nid.arr.fnode.types_flags
			this.div_03 = new html_style("div")
			this.div_04 = new html_style("div")
			this.div_05a = new html_style("div")
			this.div_05b = new html_style("div")
			this.div_06b = new flag02_div_peloncita(this.thm)
			this.div_06a = new flag01_div_peloncita(this.thm)
			this.load_file()
			this.build_data()
		}
	}

	reload_contents()
	{
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	load_file() 
	{
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
			if (tame == "liv_d02_p01") this.reload("div", tame, class_name, style, id)
			if (tame == "liv_d03_p01") this.div_03.reload("div", tame, class_name, style, id)
			if (tame == "liv_d04_p01") this.div_04.reload("div", tame, class_name, style, id)
			if (tame == "liv_d05_p01") this.div_05a.reload("div", tame, class_name, style, id)
			if (tame == "liv_d05_p02") this.div_05b.reload("div", tame, class_name, style, id)
		}
	}

	create_bucle_options() 
	{
		var options_content = ""
		{
			let _tmp_0 = this.fnode.arr.sta

			for (var slide_num in _tmp_0) 
			{
				var current_status = _tmp_0[slide_num]
				var current_info = this.fnode.arr.nfo[slide_num]
				var current_title = this.fnode.arr.tit[slide_num]
				var current_href = this.fnode.arr.url[slide_num]
				var current_fla = this.fnode.arr.flg[slide_num]

				if (!!current_status) {
					this.div_06b.reload_contents(current_fla, current_title)
					options_content += this.div_06b.code
				}
			}
		}
		this.div_05b.content = options_content
		this.div_05b.pcreate()
		this.div_04.content += this.div_05b.code
	}

	create_div_05() //idioma por defecto
	{
		var slide_num = 0
		var current_title = this.fnode.arr.tit[slide_num]
		var current_fla = this.fnode.arr.flg[slide_num]
		this.div_06a.reload_contents(current_fla, current_title)
		this.div_05a.content = this.div_06a.code
		this.div_05a.pcreate()
		this.div_04.content += this.div_05a.code
	}

	create_div_04() {
		this.create_div_05()
		this.create_bucle_options()
		this.div_04.pcreate()
		this.div_03.content += this.div_04.code
	}

	create_div_03() {
		this.create_div_04()
		this.div_03.pcreate()
		this.content += this.div_03.code
	}

	build_data() {
		this.content = ""

		if (("sta" in this.fnode.arr ) && 
			("nfo" in this.fnode.arr ) &&
			("url" in this.fnode.arr ) && 
			("flg" in this.fnode.arr)) 
		{
			this.create_div_03()
			this.pcreate()
		}
	}

}

exports.flag03_div_peloncita = flag03_div_peloncita