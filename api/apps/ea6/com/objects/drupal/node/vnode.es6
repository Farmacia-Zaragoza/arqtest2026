//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Drupal Views Vnode Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Fast view load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-load_main_details-   	  : Build html final code for object
//- d-prepare_properties-       	: Load all drupal node details
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(	cons.JS_BASE + 'com/objects/drupal/anode/an0/an01_obj.es6'	)	

class vnode extends anode {
	constructor() {
		super()
		this.n = "vnode::"
	}

	load_main_details() //Load drupal details. Never must to enter here in disk load
	{
		if (this.u.method_to_load == "drupal") 
			{
				// Drupal code - Wont load on node
				this.details = node_load(this.node_id)
				this.view = new view(this.node_id, this.name, this.args, this.length)
				this.code = this.view.code
			}
	}

	prepare_properties() 
	{
		this.arr['properties'].push("v_name" + this.sep + this.name)
		this.arr['properties'].push("v_args" + this.sep + this.args)
		this.arr['properties'].push("v_node" + this.sep + this.node_id)
		this.arr['properties'].push("v_leng" + this.sep + this.length)
		this.arr['properties'].push("v_type" + this.sep + this.view_type)
	}

}

exports.vnode = vnode