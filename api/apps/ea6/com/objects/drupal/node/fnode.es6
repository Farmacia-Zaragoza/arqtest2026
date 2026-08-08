//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Fast Node Class  [V.0.1.8]  (2016-12-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-load_main_details-  			: Load main details
//- d-prepare_properties-			: Prepare properties for fnode
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'))

class fnode extends anode {
	constructor() 
	{
		super()
		this.n = "fnode::"
	}

	load_main_details() 
	//1. Obtenemos los datos de drupal
	//$this->p('DANGER - Loading Drupal' . $this->type_name)											
	{
		if (this.method_to_load == "drupal") 
			{
				// Wont load on node
				this.details = node_load(this.node_id)

				if (this.node_have_taxonomy) 
				{
					this.taxonomy = this.details.taxonomy
				}

				this.title = this.details.title
				this.type = this.details.type
				this.path = this.u.site_url + this.details.path
			}
	}

	prepare_properties(fich = "") 
	{}

}

exports.fnode = fnode	