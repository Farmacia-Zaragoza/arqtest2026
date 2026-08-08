// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 03 - 07 ] Anode SaveNode Class  [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Savenode object - Multiple type save node
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_savenode > Anodes > Definitions 
//-------------------------------------------------------------------------------------
// Defined methods
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// d-save_node-					 	: Save node or drupal or disk
// d-save_code-						: Save code for ram or disk
//-------------------------------------------------------------------------------------
// Methods to override

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_savenode_disk } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an8/an86_savenode_disk.es6'))

class anode_savenode extends anode_savenode_disk {

	constructor()
	{
		super()
		this.n 							= 	'an85_savenode::'				
    }  

	// ------------------------- SAVE_NODE -------------------------           
	save_node()
	{
		this.m							=	'save_node'											
		this.n 							= 	'an85_savenode::'				

		this.load_main_details()			 									

			// this.pm('SAVE_Saving_02 ' )

		// 2. Cargamos esos datos en variables y arrays (metodo del hijo) (level +2)
		//    Aqui habria que gestionar la taxonomia
			this.load_child_details()			 									

			// this.pm('SAVE_Saving_03 ' )

		// 3. Preparar propiedades - generar array y campos
			this.prepare_child_properties()	


			this.if_is_correct_save_all()						
			
										
		// 6. Igual falta linkar	
	}									

	// ------------------------- SAVE_CODE -------------------------           
	save_code()
	{
		if (this.is_common_type)
			this.save_code_common()										
		else 
			this.save_code_general()										
	}
}

exports.anode_savenode = anode_savenode