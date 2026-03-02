//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.0.2]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Peloncita Structure Header
//-------------------------------------------------------------------------------------
//<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
//<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language  lang="<?php print $language ">
//------------------------------------------------------------------------------------
//<!DOCTYPE html>
//<html lang="en">
//<head>
//<body data-background = "url('images/Brqx_FondoVariado_300x200_Image11_i.png') repeat scroll left top"
//------------------------------------------------------------------------------------
// DOCTYPE
//HTML
//HEAD
//BODY
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)		

class htm02_fast_peloncita extends html_style {

	constructor(u = "", pg = "", method_to_load = "drupal", img_bg = "", body_class = "sidebars", html_lang = "es") 
	
	{

		this.n = "htm02_fast::"
		this.img_background = ""
		this.img_top = ""
		this.img_logo = ""
		this.img_icon = ""
		this.arr = Array()
		this.generated_code = "no_generated"
		this.body_class = "sidebars"
		this.html_lang = "es"
		this.method_to_load = "drupal"

		var img_background = "images/Brqx_FondoVariado_300x200_Image11_i.png"
		var img_top = "images/brqx_hozdepriegotajoosa_0512x0192.png"
		var img_logo = "images/brqx_tour_eiffel_logo_04_180_garland.gif"
		var img_icon = "images/brqx_tour_eiffel_logo_04_180_garland.gif"
		this.tag_type = "html"
		this.u = u
		this.method_to_load = method_to_load
		this.pg = pg
		this.body_class = body_class
		this.html_lang = html_lang
		this.img_background = this.u.site_url + img_background
		this.img_top = this.u.site_url + img_top
		this.img_logo = this.u.site_url + img_logo
		this.img_icon = this.u.site_url + img_icon
		super.constructor(this.tag_type)
		this.check_exist_all_files()
	}

	check_exist_all_files() //Para que se pueda usar la clase deben existir todos los ficheros de codigo
	{
		var arrays_line = "head footer header scripts left right"
		this.arr.types = arrays_line.split(" ")
		this.generated_code == "generated"
		{
			let _tmp_0 = this.arr.types

			for (var compo_type in _tmp_0) //$this.p($compo + '[' + $this.arr[$compo].loaded .']' + $this.arr[$compo].ram_alias_code_path)	
			{
				var compo = _tmp_0[compo_type]
				this.arr[compo] = new cn01_base(this.u, compo, this.method_to_load)
				this.generated_code = this.arr[compo].loaded
				if (this.generated_code != "generated") break
			}
		}

		if (this.generated_code == "generated") {
			this.body_01 = new html_style("body")
			this.div_01 = new html_style("div")
			this.section_01 = new html_style("section")
			this.row_01 = new html_style("div")
			this.div_search = new html_style("div")
			this.div_file = new html_style("div")
			this.div_middle = new html_style("div")
			this.build_data()
		}
	}

	create_server_footer() //Server information page - No cacheable in blocks
	{
		this.pg.create_div()
		this.body_01.content += this.pg.code
	}

	create_div() {
		this.div_01.id = "fb-root"
		this.div_01.pcreate()
		this.body_01.content += this.div_01.code
	}

	create_div_middle() //Falta reajustar esto
	{
		this.div_middle.class = "col-md-6 col-lg-7 middle-content col-md-push-3 col-lg-push-2-point-5"

		if (this.u.is_search_page == "yes") {
			this.p("Before search")
			this.create_div_search()
		} else if (this.u.is_file_page == "yes") {
			this.p("Before File")
			this.create_div_file()
		}

		this.div_middle.pcreate()
		this.row_01.content += this.div_middle.code
	}

	create_div_search() 
	{
		this.search_node = new sn01_garland()
		this.search_node.run_from_u(this.u, this.method_to_load)
		this.div_search = new sea03_div_peloncita_middle(this.search_node)
		this.div_middle.content += "SEA07_BLOCK</br>"
		this.div_middle.content += this.search_node.code
		this.div_middle.content += this.div_search.code
	}

	create_div_file() 
	{
		this.file_node = new fn01_file_structure(this.u, this.method_to_load)
		this.div_middle.content += "FILE07_BLOCK</br>"
		this.div_middle.content += "Ideal Uri " + this.u.slash_ideal_uri + this.br
		this.div_middle.content += "Real Structure " + this.u.real_sub_query + this.br
		this.div_middle.content += "NumFolders " + this.file_node.num_folders + this.br
		this.div_middle.content += "NumFiles " + this.file_node.num_files + this.br

		if ((this.file_node.num_files > 0) || 
			(this.file_node.num_folders > 0) )
			{
				var ideal_elems = "Ideal elems to browse ( "

				for (var fol of Object.values(this.file_node.arr.ide)) ideal_elems += fol + " - "

				ideal_elems += ")"
				this.div_middle.content += ideal_elems + this.br
				if (this.file_node.num_folders > 0) 
					var arri_aux = this.file_node.arr.folelse 
				if (this.file_node.num_files > 0) 
					arri_aux = this.file_node.arr.fil

				for (var fol of Object.values(arri_aux)) this.div_middle.content += fol + this.br
			}
	}

	create_row() 
	{
		this.row_01.class = "row"
		this.create_div_middle()
		this.row_01.content += this.arr.left.code
		this.row_01.content += this.arr.right.code
		this.row_01.pcreate()
		this.section_01.content = this.row_01.code
	}

	create_section() //create row
	{
		this.create_row()
		this.section_01.class = "container"
		this.section_01.id = "main-content"
		this.section_01.pcreate()
		this.body_01.content += this.section_01.code
	}

	body_cache() 
	{
		this.body_01.class = "b-lazy"
		this.body_01.data_src = this.img_background
		this.body_01.content += this.arr.header.code
		this.create_section()
		this.create_div()
		this.body_01.content += this.arr.footer.code
		this.body_01.content += this.arr.scripts.code
		this.create_server_footer()
		this.body_01.pcreate()
		this.content += this.body_01.code
	}

	build_data() 
	{
		this.content = ""
		this.lang = "en"
		this.content += this.arr.head.code
		this.body_cache()
		this.pcreate()
	}

}

exports.htm02_fast_peloncita = htm02_fast_peloncita