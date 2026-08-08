//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Fast Node Cica Slider Class  [V.0.2.1]  (2017-01-10)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-load_child_details-			: Load child details
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Para poder extender debe haberse incluido antes

//Load child details is loaded in Fnode
//Prepare child properties is loaded in Fnode
class fn04_cica_slider extends fnode {

	constructor(nid_object = "", u = "", nid_id = "", datcontent_id = "", position_id = "", stype = "cica_slider") 
	{
		super()
		this.n = "fn04_cica_slider::"

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
		this.type = "side_slider"
		this.short_type = "SS"
		var arrays_line = "txt typ mnu id node"
		this.arr.types = arrays_line.split(" ")
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.ntype + "/" + this.stype + "/"
		this.suffix = "zone" + this.page_position + "_" + this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".slider"
		this.generate_load_from_disk_path()

		if (this.s.load == "drupal") {
			this.run_from_drupal()
		} else {
			this.run_from_disk()
		}
	}

	load_child_details() {
		if (this.s.load == "drupal") {
			this.load_one_field("field_text_blk_slider_%02d", "txt", "value", 10)
			this.load_one_field("field_type_blk_slider_%02d", "typ", "value", 10)
			this.load_one_field("field_menu_blk_slider_%02d", "mnu", "value", 10)
			this.load_one_field("field_id_blk_slider_%02d", "id", "value", 10)
			this.load_one_field("field_node_blk_slider_%02d", "node", "value", 10)
			this.img_folder = this.details.field_img_folder[0].value
			this.img_url_folder = this.details.field_img_url_folder[0].value
		}
	}

}

