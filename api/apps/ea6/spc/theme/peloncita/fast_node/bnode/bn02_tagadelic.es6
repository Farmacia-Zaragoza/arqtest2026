//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-12-09)
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


class bn02_tagadelic extends bnode {

	constructor(fnode = "", block_type = "block", block_id = "", num_columns = "4", stype = "tagadelic")
	{
		this.n = "bn02_tagadelic::"

		this.fnode = fnode
		this.u = fnode.u
		this.block_id = block_id
		this.block_type = block_type
		this.type = "block"
		this.short_type = "BKT"
		this.stype = stype
		this.type_name = this.type + "_" + this.stype
		this.dom = new DOMDocument()
		this.num_columns = num_columns
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = true
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.type + "/" + this.stype + "/col_" + this.num_columns + "/"
		this.suffix = "common_" + this.block_id
		this.suffix_code = this.suffix + "_code" + ".tagadelic"
		this.generate_load_from_disk_path()
		var arrays_line = "url alt tit cls "
		var num = 0

		while (num < this.num_columns) {
			var line = "u-" + num + " a-" + num + " t-" + num + " c-" + num + " "
			num++
			arrays_line += line
		}

		this.arr.types = arrays_line.split(" ")

		if (this.s.load == "drupal") //create_paths - get_current_properties
		{
			this.run_from_drupal()
		}
		else //create_paths - get_current_properties_from_disk
		{
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value) {
		if (prop == "b_id") this.block_id = value
		else if (prop == "b_type") this.bock_type = value
		else if (prop == "b_columns") this.num_columns = value
	}

	load_child_details()
	{
		if (this.s.load == "drupal") this.load_properties_dmode_tagadelic()
	}

	prepare_specific_child_properties() {
		this.prepare_properties_dmode_tagadelic()
	}

}

exports.bn02_tagadelic = bn02_tagadelic

