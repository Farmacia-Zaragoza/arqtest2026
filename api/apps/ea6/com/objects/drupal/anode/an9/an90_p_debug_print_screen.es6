// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 02 - 07 ] To Override Class  [V.0.1.8]  (2017-09-21)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// To Override object
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 02] [Global Level 07]
//-------------------------------------------------------------------------------------
// *anode_debug_screen > Anodes >  Definitions 

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//-------------------------------------------------------------------------------------
// Methods Defined

// - d-p-				:   Debug file adding method
// - d-pt-				:   Print type
// - d-pn-				:   Print name
// - d-pm-				:   Print only method


// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const echo 				= require(	'/brqx/base/react/zcommon/node_modules/node-echo'		)

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);


var { anode_debug_save_file } 		= require(	cons.JS_BASE + 'com/objects/drupal/anode/an9/an91_d_debug_save_file.es6'		)

class anode_debug_print_screen extends anode_debug_save_file{

	constructor()
	{
		super()		
		this.n 							= 	'anode_debug_print_screen::'			
	}           


	pt(msg)
	{
		// Print type too
		// Agile debug method. To load with deb - brqx alias
	    let puting_contents=this.n + this.m + ' - ' + this.type + ' - ' + msg  + this.br 						
//		if (this.type == 'page')
		echo (puting_contents)											
	}

	pm(msg)
	{
		// Prinn only method
		// Agile debug method. To load with deb - brqx alias
	    let puting_contents=this.m + '-' + msg  + this.br 						
		echo (puting_contents)											
	}

	pn(msg)
	{
		// Prinn only name of calling class
		// Agile debug method. To load with deb - brqx alias
	    let puting_contents=this.n + msg  + this.br 						
		echo (puting_contents)											
	}
  
}

exports.anode_debug_print_screen = anode_debug_print_screen