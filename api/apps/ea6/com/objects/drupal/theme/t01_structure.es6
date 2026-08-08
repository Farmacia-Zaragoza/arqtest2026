// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 00 - 00 ] Theme Structure Class  [V.0.2.1]  (2017-03-29)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// *Theme Structure
//-------------------------------------------------------------------------------------
// Store structure of nodes and files needed in theme
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

var { theme_nid } 		= require(path.join(JS_BASE, 'com/objects/drupal/theme/t02_nid.es6'))

class theme_structure extends theme_nid {

	constructor()
	{
		super()
		this.n					=	'thm_struct::'				
	    
	    // Arrays
	    
		// Page Structure
             
 	}
  
}

exports.theme_structure = theme_structure