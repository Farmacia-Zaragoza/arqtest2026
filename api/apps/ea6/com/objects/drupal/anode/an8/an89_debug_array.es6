// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 02 - 06 ] Anode Debug Array Class  [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// To Override object
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_debug_array > Anodes >  Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//-------------------------------------------------------------------------------------
// Methods Defined

// - d-darr-				:   Debug array on file
// - d-parr-				:   Debug array on screen


// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_debug_print_screen } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an9/an90_p_debug_print_screen.es6'))

class anode_debug_array extends anode_debug_print_screen {

	constructor()
	{		
		super()
		this.n 							= 	'anode_debug_array::'			
	}
           
	// Debug array
	darr(a_passed)
	{
		if ( Array.isArray(a_passed) ) 
			// foreach (a_passed as pos => elem) 	
				this.d(pos + ' - ' + elem )								
	}

	// Debug array
	parr(a_passed)
	{
		// REVISAR BUCLE
		if ( Array.isArray(a_passed) ) 
			//foreach (a_passed as pos => elem) 	
			for (var pos in a_passed)
			{
				let elem 		= a_passed[pos]
				this.pnn(pos + ' - ' + elem )
			}								
	}
  
}

exports.anode_debug_array = anode_debug_array