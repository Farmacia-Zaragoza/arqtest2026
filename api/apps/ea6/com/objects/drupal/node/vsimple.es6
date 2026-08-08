//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.1]  (2017-03-29)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Fast view load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-load_main_details-   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//View without arguments

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'))


class vsimple extends anode {
	constructor() {
		super()
		this.n = "vsimple::"
	}

	load_main_details() 
	//Load drupal details. Never must to enter here in disk load
	{
		if (this.u.method_to_load == "drupal") 
			{
				// Php load - Wont work on node
				this.details = node_load(this.node_id)
				this.view = views_get_view(this.name)
				var view_args = Array()
				this.code = views_build_view("embed", this.view, view_args, false, this.length)
			}
	}

	prepare_properties(fich = "") //node what run view. Needed to know values
	{
		this.arr.properties.push("v_name" + this.sep + this.name)
		this.arr.properties.push("v_leng" + this.sep + this.length)
		this.arr.properties.push("v_type" + this.sep + this.view_type)
	}

}

exports.vsimple = vsimple
