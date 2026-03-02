//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Fast Node Recuerdo Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-get_child_properties-  				: Get specific child properties
//- d-load_child_details-    				: Recover from drupal child properties
//- d-prepare_specific_child_properties- 	: Prepare properties to save in array
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Para poder extender debe haberse incluido antes

class fn01_recuerdo extends fnode {

	constructor(nid = "", page_position = "_middle", fnode = "", stype = "cica_recuerdo") 
	{

		super()
		this.n = "fn01_recuerdo::"

		this.page_position = page_position
		this.fnode = fnode
		this.u = fnode.u
		this.b = new bool()
		this.s = this.u.s
		this.c = this.u.c
		this.b.copy(this.s.b)
		this.img_folder = this.fnode.img_folder
		this.img_url_folder = this.fnode.img_url_folder
		this.node_id = nid
		this.ftype = "fnode"
		this.ntype = "node"
		this.stype = stype
		this.type_name = this.stype
		this.type = "recuerdo"
		this.short_type = "RCD"
		this.resolutions_to_generate = "6100x3050 4608x3456 3264x2448 2560x1920 1280x0960 1024x0768 "
		this.resolutions_to_generate += "0884x0663 0640x0480 0442x0332 0384x0288 0320x0240 0145x0109 0082x0062 0041x0031"
		this.full_resolutions_to_generate = "2048x1536 " + this.resolutions_to_generate
		this.prepare_resolutions()
		this.is_common_type = false
		this.node_have_taxonomy = true
		this.node_have_code = false
		this.node_have_properties = true
		this.node_have_specific_properties = true
		this.change = "/" + this.ftype + "/" + this.ntype + "/" + this.stype + "/"
		this.suffix += "rec_" + this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".remember"
		this.generate_load_from_disk_path()
		var arrays_tax_line = "tna tid tpa"
		this.arr.tax_types = arrays_tax_line.split(" ")
		this.arrays_line = arrays_tax_line + " "
		this.resolutions_to_generate = "6100x3050 4608x3456 3264x2448 2560x1920 1280x0960 1024x0768 "
		this.resolutions_to_generate += "0884x0663 0640x0480 0442x0332 0384x0288 0320x0240 0145x0109 0082x0062 0041x0031"
		this.full_resolutions_to_generate = "2048x1536 " + this.resolutions_to_generate
		this.prepare_resolutions()
		this.inode = new in01_path(this.fnode, this.resolutions_to_generate, "glob")

		if (this.method_to_load == "drupal") //fnode - Fast node load
			{
				this.run_from_drupal()
			} else //fdisk - Fast disk load
			{
				this.run_from_disk()
			}
	}

	get_child_properties(prop, value) 
	{
		if (prop == "date") this.date = value
		else if (prop == "img_folder") this.img_folder = value
		else if (prop == "img_url_folder") this.img_url_folder = value
	}

	load_child_details() {
		this.m = "load_child_details"

		if (this.method_to_load == "drupal") 
			{
				this.load_one_field("field_fotorecuerdo_%02d", "img", "filepath", 6)
				this.load_one_field("field_fotorecuerdo_%02d", "tit", "title", 6)
				this.date = this.details.field_fecha[0].value.substr(2, 8)
				this.img_folder = this.details.field_img_folder[0].value
				this.img_url_folder = this.details.field_img_url_folder[0].value
				var cont = 0
				this.img_url_folder = this.fnode.u.site_url + this.img_url_folder
				if (this.img_url_folder.substr(-1) != "/") this.img_url_folder += "/"
				this.inode.img_folder = this.img_folder
				this.inode.img_url_folder = this.img_url_folder

				if (!empty(this.arr['img'])) 
					{
						{

							for (var slide_num in this.arr.img) 										
							{
								var img_name = this.arr['img'][slide_num]
								if (img_name != "") this.generate_array_for_all_resolutions(img_name)
							}
						}
					}
			}
	}


	prepare_specific_child_properties() 
	{
		this.arr.properties.push("date" + this.sep + this.date)
		this.arr.properties.push("img_folder" + this.sep + this.img_folder)
		this.arr.properties.push("img_url_folder" + this.sep + this.img_url_folder)
		this.load_taxonomy()
	}

}
