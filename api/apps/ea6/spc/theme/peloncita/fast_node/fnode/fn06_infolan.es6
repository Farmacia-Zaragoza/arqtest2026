//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Fat node Inforlan Class  [V.0.1.7]  (2016-11-24)
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

class fn06_infolan extends fnode {

	constructor(nid_object = "", u = "", nid_id = "", datcontent_id = "", position_id = "", stype = "cica_infolan") 
	{
		super()
		this.n = "fn06_infolan::"

		this.page_position = nid_object.arr.position[position_id]
		this.dat_contents = nid_object.arr.datcontent[datcontent_id]
		this.b = new bool()
		this.u = u
		this.s = this.u.s
		this.c = this.u.c
		this.b.copy(this.s.b)
		this.node_id = nid_object.arr.nid[nid_id]
		this.ftype = "fnode"
		this.ntype = "node"
		this.stype = stype
		this.type_name = this.stype
		this.type = "lan_information"
		this.short_type = "LAN"
		var arrays_line = "sta nfo des tit url flg foc"
		this.arr.types = arrays_line.split(" ")
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.ntype + "/" + this.stype + "/"
		this.suffix = "zone" + this.page_position + "_" + this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".infolan"
		this.generate_load_from_disk_path()

		if (this.s.load == "drupal") {
			this.run_from_drupal()
		} else {
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value) //Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	//Luego cada tipo tendra un ajuste como este
	{
		if (prop == "information") this.information = value
		else if (prop == "img_folder") this.img_folder = value
		else if (prop == "img_url_folder") this.img_url_folder = value
	}

	load_child_details() {
		if (this.s.load == "drupal") //Lnk   menu Array
			{
				this.load_one_field("field_status_blk_slider_%02d", "sta", "value", 10)
				this.load_one_field("field_info_blk_slider_%02d", "nfo", "value", 10)
				this.load_one_field("field_desc_blk_slider_%02d", "des", "value", 10)
				this.load_one_field("field_flag_blk_slider_%02d", "flg", "value", 10)
				this.load_one_field("field_focu_blk_slider_%02d", "foc", "value", 10)
				this.load_multi_fields("field_link_blk_slider_%02d", "url_tit", "url_title", 10)
				this.information = this.details.field_informacion[0].value
				this.img_folder = this.details.field_img_folder[0].value
				this.img_url_folder = this.details.field_img_url_folder[0].value
			}
	}

	prepare_specific_child_properties() {
		if (this.s.load === "drupal") {
			this.arr.properties.push("information" + this.sep + this.information)
			this.arr.properties.push("img_folder" + this.sep + this.img_folder)
			this.arr.properties.push("img_url_folder" + this.sep + this.img_url_folder)
		}
	}

}
