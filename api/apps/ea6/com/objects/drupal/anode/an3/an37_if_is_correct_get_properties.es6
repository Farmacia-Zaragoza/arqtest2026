// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode If is Correct Get Properties Class  [V.0.1.2]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 04]
// *anode_if_is_correct_get_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-if_is_correct_get_disk_code-				: 	Get code if is correct reload
// - d-if_is_correct_get_ram_code-				: 	Get code if is correct reload
// - d-if_is_correct_get_disk_properties-		:   Get properties if is correct | exist
// - d-if_is_correct_get_ram_properties-		:   Get properties if is correct | exist
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_if_exist_properties_reload_contents } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an3/an38_if_exist_properties_reload_contents.es6'))

class anode_if_is_correct_get_properties extends anode_if_exist_properties_reload_contents {
            
    constructor()
    {        
		super()
		this.n	=	'anode_if_is_correct_get_properties::'											
	}											

	if_is_correct_get_disk_code()
	{
		if (this.b.type_have_properties)
			this.get_current_code_disk()											
		
	}

	if_is_correct_get_ram_code()
	{
		if (this.b.type_have_properties)
			this.get_current_code_ram()								
	}


	if_is_correct_get_disk_properties()
	{
		if (this.b.type_have_properties)
			this.get_current_properties_disk()											
	}	  


	if_is_correct_get_ram_properties()
	{
		if (this.b.type_have_properties)
			this.get_current_properties_ram()											
	}	  
	  
}

exports.anode_if_is_correct_get_properties = anode_if_is_correct_get_properties
