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


class bn01_base extends bnode {

	constructor(block_type = "", block_id = "", fnode = "", stype = "list")
	{
		this.n = "bn01_base::"
		this.fnode = fnode
		this.u = fnode.u
		this.b = new bool()
		this.u = u
		this.s = this.u.s
		this.c = this.u.c
		this.b.copy(this.s.b)
		this.block_id = block_id
		this.block_type = block_type
		this.type = "block"
		this.short_type = "BKB"
		this.stype = stype
		this.type_name = this.type + "_" + this.stype
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = true
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.type + "/" + this.stype + "/typ_" + this.block_type + "/"
		this.suffix = "common_" + this.block_id
		this.suffix_code = this.suffix + "_code" + ".block"
		this.generate_load_from_disk_path()

		if (this.s.load === "drupal")
			{
				this.run_from_drupal()
			} else
			{
				this.run_from_disk()
			}
	}

	get_child_properties(prop, value) {
		if (prop == "b_id") this.block_id = value
		else if (prop == "b_type") this.bock_type = value
	}

	load_child_details()
	{}

	load_child_details_b()
	{
		var block_code = this.code

		this.replace(block_code , "img src=", "img data-src=")
		this.code = this.result
	}

	prepare_specific_child_properties()
	{}

}

exports.bn01_base = bn01_base

