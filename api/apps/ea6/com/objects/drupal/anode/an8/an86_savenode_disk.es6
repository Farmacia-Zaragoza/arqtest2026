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
// d-save_node_disk-					 	: Save node or drupal or disk
//-------------------------------------------------------------------------------------
// Methods to override

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

var { anode_debug_array } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an8/an89_debug_array.es6'))

class anode_savenode_disk extends anode_debug_array {

	constructor()
	{
		super()
		this.n 							= 	'an86_savenode_disk::'				
	}

	// ------------------------------------ SAVE_NODE_DISK ------------------------------------             
	save_node_disk()
	{
		this.m 							=	'save_node_disk'
		this.n 							= 	'an86_savenode_disk::'				

		// Ya tenemos las propiedades si se han podido obtener sino las vamos a sacar 
		// [LOAD CHILD_DETAILS - PREPARE_CHILD_PROPERTIES - SAVE_ALL]

		// 1. Cargamos esos datos en variables y arrays (metodo del hijo) (level +2)
		    // Por ejemplo generar la pagina

			// this.p('an86_Before_Load_Child')											
		
			// Node Method
			this.load_child_details()			 									

			// this.p('an86_Before_Prepare ' + this.arr['properties'].length  + ' Code ' + this.code.length)											

		// 2. Preparar propiedades - generar array y campos ( se supone que ya lo ha hecho)
			this.prepare_child_properties()	

			//this.p('an86_Before_Save ' + this.arr['properties'].length  + ' Code ' + this.code.length)											
			
			this.if_is_correct_save_all()								

			// this.p('an86_After_Save ' + this.arr['properties'].length  + ' Code ' + this.code.length)											

		// 3. Actulizamos en RAM (igual falta lincar)

			// this.p('an85_SavedAll ' + this.type)											

	}									

  
}

exports.anode_savenode_disk = anode_savenode_disk
