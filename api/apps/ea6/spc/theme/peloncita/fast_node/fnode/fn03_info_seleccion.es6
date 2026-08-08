//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Fast Node Info Seleccion Class  [V.0.1.7]  (2016-11-24)
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

class fn03_info_seleccion extends fnode {

	constructor(nid = "", page_position = "_middle", fnode = "", stype = "info_seleccion") 
	{
		super()
		this.n = "fn03_info_seleccion::"

		this.page_position = page_position
		this.b = new bool()
		this.u = u
		this.s = this.u.s
		this.c = this.u.c
		this.b.copy(this.s.b)
		this.node_id = nid
		this.ftype = "fnode"
		this.ntype = "node"
		this.stype = stype
		this.type_name = this.stype
		this.type = "tabs_selection"
		this.short_type = "IFSH"
		var arrays_line = "txt typ id tab vna vle vfi"
		this.arr.types = arrays_line.split(" ")
		this.b.type_common = false
		this.b.type_have_taxonomy = false
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.ftype + "/" + this.ntype + "/" + this.stype + "/"
		this.suffix = this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".infosel"
		this.generate_load_from_disk_path()
		this.p("Infosel_Load1 " + " Path " + this.load_from_disk_path)

		if (this.s.load === "drupal") {
			this.run_from_drupal()
		} else {
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value) 
	{
		if (prop == "date") this.date = value
	}

	load_child_details() {
		if (this.s.load == "drupal") {
			this.load_one_field("field_text_blk_slider_%02d", "txt", "value", 10)
			this.load_one_field("field_type_blk_slider_%02d", "typ", "value", 10)
			this.load_one_field("field_id_blk_slider_%02d", "id", "value", 10)
			this.load_one_field("field_tabid_blk_slider_%02d", "tab", "value", 10)
			this.load_one_field("field_view_blk_slider_%02d", "vna", "value", 10)
			this.load_one_field("field_viewfield_blk_slider_%02d", "vfi", "value", 10)
			this.load_one_field("field_length_blk_slider_%02d", "vle", "value", 10)
			this.img_folder = this.details.field_img_folder[0].value
			this.img_url_folder = this.details.field_img_url_folder[0].value
		}
	}

}

