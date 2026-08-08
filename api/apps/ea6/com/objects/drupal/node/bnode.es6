//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Block Fast Node Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Fast view load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-load_main_details-		: Load default details for block
//- d-prepare_properties-		: Load all drupal node details
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(	path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'))	

class bnode extends anode {
	constructor() {
		super()
		this.n = "bnode::"
	}

	load_main_details() {
		if (this.u.method_to_load == "drupal") 
			//Load only in new files - Only from drupal
			//$this->p('Generating block Type :  ' . $this->block_type . ' Id ' . $this->block_id)	
			{
				// DRUPAL CALL
				var block = module_invoke(this.block_type, "block", "view", this.block_id)
				var block_code = block.content
				this.code = block_code
			}
	}

	prepare_properties() //Common block properties
	{
		this.arr['properties'].push("b_id" + this.sep + this.block_id)
		this.arr['properties'].push("b_type" + this.sep + this.block_type)
	}

}

exports.bnode = bnode