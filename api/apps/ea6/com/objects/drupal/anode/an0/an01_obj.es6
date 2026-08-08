//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//[01 - 0n - 0n ] Node Js - Anode Drupal Class  [V.0.0.2]  (2017-10-21)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 
//-------------------------------------------------------------------------------------
//Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
//Inheritance Line [Inner Level 00]
//anode > Anodes > Definitions
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Classes:
//-------------------------------------------------------------------------------------
//- c-anode-							: Unique definion Anode Class
//-------------------------------------------------------------------------------------
//Methods:
//-------------------------------------------------------------------------------------
//- d-check_common_and_create_paths-	: Check and create paths
//- d-create_paths-  	  				: Create paths for fast object
//- d-create_paths_for_common_types-    : Create paths special for common types
//- d-prepare_child_properties- 		: Prepare properties and properties array
//- d-update_taxonomy_to_type-			: Load drupal taxonomy on type
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 							= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"						);

const 	{ anode_run_from_drupal } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an02_run_from_drupal.es6'))

class anode extends anode_run_from_drupal {
	constructor() 
	{
		super()
		this.n = "anode::"
	}

	// ------------------ CHECK_COMMON_AND_CREATE_PATHS ----------------------------
	check_common_and_create_paths() {
		
		this.m			=	'check_common_and_create_paths'

		if (this.b.type_common) 
		{
			//Tipo comun
			this.create_paths_for_common_types()
		} 
		else 
		//Nodo o tipo especifico
		{
			this.create_paths()
		}
	}

	// ---------------------------- CREATE_PATHS ----------------------------
	create_paths() 
	{
		this.m			=	'create_paths'
		
		if (this.b.type_user) 
		{
			if (this.u.user_type == "anonymous") 
				this.update_paths_anon()
			else 
				this.update_paths_auth()
		} 
		else 
			this.update_paths_nouser()
	}


	// ---------------------------- CREATE_PATHS_FOR_COMMON_TYPES ----------------------------
	create_paths_for_common_types()
	{
		// Necesitamos una clase bool -. Boolean types
		if (this.b.type_user)
		{
			// Las rutas son relativas al tipo de usuario
			if (this.u.user_type == 'anonymous')		
				this.update_paths_anon_for_common_types() 															
			else
				this.update_paths_auth_for_common_types() 															
		
		}
		else 
		{
				// Tipo ajeno a usuarios (mismo path para auth que para anon)
			this.update_paths_nouser_for_common_types() 															
			
						
		}
	}


	// ---------------------------- UPDATE_TAXONOMY_TO_TYPE ----------------------------
	update_taxonomy_to_type() 
	{
		this.m = "update_taxonomy_to_type"

		// SOLUTION_BUCLE_SIMPLE
		// foreach ($this->arr['tax_types'] as $type )

		for (var type of Object.values(this.arr['tax_types'])) 
		{
			this.arr[type] = this.tnode.arr[type]
		}
	}

	prepare_child_properties() 
	{
		this.m = "prepare_child_properties"
		this.prepare_properties()
		this.prepare_specific_child_properties()
		this.prepare_array_properties()
	}

}

exports.anode = anode