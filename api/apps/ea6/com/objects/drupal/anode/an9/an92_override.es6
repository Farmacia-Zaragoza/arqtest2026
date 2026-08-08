// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 00 - 05 ] To Override Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// To Override object
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 00] [Global Level 05]
//-------------------------------------------------------------------------------------
// *anode_override > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//-------------------------------------------------------------------------------------
// Methods Defined


// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const { strings } 		= require(path.join(JS_BASE, 'com/objects/drupal/strings/s01_strings.es6'))

class override extends strings {
		
	constructor()
	{		
		super()
		this.n 							= 	'override::'			
    }   

  	// Methods to override
  
  	prepare_specific_child_properties()				{}	
	get_current_properties()						{}
	get_child_properties(prop , value)	{}
  	prepare_child_properties()						{}
  	prepare_properties()							{}
	load_main_details()								{}
	load_main_details_drupal()						{}
	load_child_details()							{}
	load_child_details_drupal()						{}
	run_child_action()								{}

	run_from_disk()									{}
  
}

exports.override = override