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
//- d-get_child_properties-  				: Get specific child properties
//- d-load_child_details-    				: Recover from drupal child properties
//- d-prepare_specific_child_properties- 	: Prepare properties to save in array
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Para poder extender debe haberse incluido antes

class fn09_yearfada extends fnode {

	constructor(nid_object = "", u = "", nid_id = "", position_id = "", stype = "yearfada") 
	{
		super()
		this.n = "fn09_yearfada::"

		this.page_position = nid_object.arr.position[position_id]
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
		this.type = "yearfada"
		this.short_type = "YFD"
		var arrays_line = "uri pfs"
		this.arr.types = arrays_line.split(" ")
		this.b.type_common = false
		this.b.type_have_taxonomy = false
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.ntype + "/" + this.stype + "/"
		this.suffix = "zone" + this.page_position + "_" + this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".year"
		this.generate_load_from_disk_path()

		if (this.s.load == "drupal") {
			this.run_from_drupal()
		} else {
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value) 
	{
		if (prop == "temporadas") this.temporadas = value
	}

	load_child_details() {
		if (this.s.load == "drupal") {
			this.load_one_field("field_nombre_parrafada_%02d", "pfs", "value", 10)
			this.load_one_field("field_uri_%02d", "uri", "value", 10)
		}
	}

	prepare_specific_child_properties() {
		this.arr.properties.push("temporadas" + this.sep + this.temporadas)
	}

}
