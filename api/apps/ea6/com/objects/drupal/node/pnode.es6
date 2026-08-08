//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.2.1]  (2016-12-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast page load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//Inheritance Line
//savedisk > .. > anode > *pnode
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- prepare_properties			: Update common properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(	path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6')))	


class pnode extends anode {
	constructor() 
	{
		super()
		this.n = "pnode::"
	}

	prepare_properties() 
	{
		this.arr['properties'].push("u_real" + this.sep + this.u.drupal_real_dash_uri)
		this.arr['properties'].push("u_alias" + this.sep + this.u.dash_uri)
		this.arr['properties'].push("u_user" + this.sep + this.u.drupal_user_uid)
		this.arr['properties'].push("ep_nid" + this.sep + this.error_page_nid)
		this.arr['properties'].push("ep_na" + this.sep + this.error_page_node_alias)
	}

}

exports.pnode = pnode