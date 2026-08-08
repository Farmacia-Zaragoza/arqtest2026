//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- get_current_taxonomy: Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(	path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'))	

class tnode extends anode {
	constructor(u = "", node_id = "", method_to_load = "drupal", taxonomy = "", stype = "cica_tax") 
	{
		super()
		this.n = "tnode::"
		this.u = u
		this.taxonomy = taxonomy
		this.is_common_type = false
		this.node_have_taxonomy = false
		this.node_is_taxonomy = true
		this.node_have_code = false
		this.node_have_properties = true
		this.node_have_specific_properties = false
		this.stype = stype
		this.type_name = this.stype
		this.node_id = node_id
		this.method_to_load = method_to_load
		this.type = "taxonomy_node"
		this.short_type = "TXN"
		this.suffix = this.node_id + "_tax"
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".tax"
		this.change = "/tnode/"
		this.generate_load_from_disk_path()
		var arrays_line = "tna tid tpa"
		this.arr.types = arrays_line.split(" ")

		if (this.method_to_load == "drupal") //create_paths - get_current_properties
			{
				this.run_from_drupal()
			} else //create_paths - get_current_properties_from_disk
			{
				this.run_from_disk()
			}
	}

	get_current_taxonomy(taxonomy) {
		this.taxonomy = taxonomy
		this.get_current_properties_ram()
	}

	load_data_from_taxonomy() 
	{
		this.sw_taxonomy = ""
		{
			let _tmp_0 = Array.from(this.taxonomy)

			for (var pos in _tmp_0) 
			{
				var term = _tmp_0[pos]

				this.sw_taxonomy = "hay_taxonomias"
				var term_name = "" + term.name
				if (term_name == "") term_name = "undef"
				var term_id = term.tid
			
				// Drupal load. Node wont work
				var term_path = drupal_get_path_alias("taxonomy/term/" + term_id)
				this.arr['tna'].push(term_name)
				this.arr['tid'].push(term_id)
				this.arr['tpa'].push(term_path)
			}
		}
	}

	prepare_specific_child_properties() {
		if (this.method_to_load == "drupal") 
			this.load_data_from_taxonomy()
	}

}

exports.tnode = tnode