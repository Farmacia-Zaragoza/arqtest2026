// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Drupal Class  [V.0.2.0]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 01]
// *anode_run_from_drupal > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-run_from_drupal-				: Build object where method is drupal
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_get_current_properties } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an03_get_current_properties.es6'))

class anode_run_from_drupal extends anode_get_current_properties {

	constructor()
	{
        super()
		this.n	=	'anode_run_from_drupal::'											
    }

	run_from_drupal()
	{
		this.m				=	'run_from_drupal'					

		//this.p('02a - Before Common ' + this.type + ' Common ' + this.is_common_type)										

		// 1.Crea las rutas para la consulta
		this.check_common_and_create_paths()					

		// 2. Si existe el fichero recupera las propiedades ( methodo del hijo )
		//    Si no existe lo genera

		this.generate_object_info() 												 
		
		this.p('Sta_debugging_rundrup ' + this.type )							

		var to_continue = true  
		
		if (this.b.type_have_code) 
			to_continue = this.dont_exist_and_get_code()  				

		if (to_continue)
		{
			// this.p('03 - After code ' + this.type )						

			// Properties are results so are not needed other functions
			// Properties - Taxonomy
			this.if_is_correct_get_ram_properties() 							
			// RAM - DISK - PREPARE | SAVE

		}		
	}
	  
}

exports.anode_run_from_drupal = anode_run_from_drupal
