//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Para poder extender debe haberse incluido antes

class vn01_images extends vnode {

		constructor(fnode = "", name = "", args = "", length = "", sort = "rand", random = "001") 
		{
				super()
				this.n = "vn01_images::"

				this.fnode = fnode
				this.b = new bool()
				this.u = u
				this.s = this.u.s
				this.c = this.u.c
				this.b.copy(this.s.b)
				this.node_id = fnode.node_id
				this.name = name
				this.args = args
				this.length = length
				this.sort = sort
				this.random = random
				this.dom = new DOMDocument()
				this.type = "view"
				this.short_type = "VWI"
				this.view_type = "imgs"
				this.stype = this.view_type
				this.type_name = this.type + this.stype + "_" + this.name
				if (this.sort == "") this.sort = "alfa"
				if (this.random == "") this.random = "001"
				this.resolutions_to_generate = "6100x3050 4608x3456 3264x2448 2560x1920 1280x0960 1024x0768 "
				this.resolutions_to_generate += "0884x0663 0640x0480 0442x0332 0384x0288 0320x0240 0145x0109 0082x0062 0041x0031"
				this.full_resolutions_to_generate = "2048x1536 " + this.resolutions_to_generate
				this.prepare_resolutions()
				this.b.type_common = true
				this.b.type_have_taxonomy = false
				this.b.type_have_code = false
				this.b.type_have_properties = true
				this.b.type_have_specific_properties = true
				this.change = "/" + this.type + "/" + this.view_type + "/"
				this.suffix = this.name
				this.suffix_disk = this.suffix
				this.suffix_code = this.suffix + "_code" + ".vimages"
				this.generate_load_from_disk_path()

				if (this.s.load === "drupal") //create_paths - get_current_properties
						{
								this.run_from_drupal()
						} else //create_paths - get_current_properties_from_disk
						{
								this.run_from_disk()
						}
		}

		get_child_properties(prop, value) //Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
		//Luego cada tipo tendra un ajuste como este
		{
				if (prop == "v_name") this.name = valueelse if (prop == "v_type") this.view_type = valueelse if (prop == "v_args") this.args = valueelse if (prop == "v_leng") this.length = valueelse if (prop == "v_node") this.node_id = value
		}

		load_child_details() 
		{
				if (this.s.load == "drupal") 
						{
								var dom_h3 = new dom(this.code, "h3", 1)
								var dom_img = new dom(this.code, "img", 1)
								dom_h3.create()
								dom_img.create()
								var multiple_images = ""
								this.resolutions_to_generate = "6100x3050 4608x3456 3264x2448 2560x1920 1280x0960 1024x0768 "
								this.resolutions_to_generate += "0884x0663 0640x0480 0442x0332 0384x0288 0320x0240 0145x0109 0082x0062 0041x0031"
								this.full_resolutions_to_generate = "2048x1536 " + this.resolutions_to_generate
								this.inode = new in01_path(this.fnode, this.resolutions_to_generate, "glob")
								this.img_url_folder = this.fnode.u.site_url + this.img_url_folder
								if (this.img_url_folder.substr(-1) != "/") this.img_url_folder += "/"
								this.inode.img_folder = this.img_folder
								this.inode.img_url_folder = this.img_url_folder

								for (var elem of Object.values(dom_img.out)) //http://cica.dbrqx.com/files/images/paises/fotomapas/brqx_fotomap_mapa_alaska_usa_2010.gif
								//Original images
								{
										this.dom.loadHTML(elem)
										var xpath = new DOMXPath(this.dom)
										var ssd_img = xpath.evaluate("string(//img/@src)")
										this.arr.img.push(ssd_img)
										if (ssd_img != "") this.generate_array_for_all_resolutions(ssd_img)
										var title = xpath.evaluate("string(//img/@title)")
										this.arr.tit.push("" + title)
								}

								this.arr.rko = this.inode.arr.rko
								this.arr.rfu = this.inode.arr.rfu
								this.arr.sfu = this.inode.arr.sfu
								this.p("Num " + this.inode.arr.oic.length + "  " + this.arr.oic.length)
						}
		}

}
