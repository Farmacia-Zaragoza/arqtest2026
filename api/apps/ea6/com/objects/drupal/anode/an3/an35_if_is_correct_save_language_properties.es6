// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Properties Class  [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 04]
// *anode_if_is_correct_save_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-if_is_correct_save_all_language_properties- 		: 	Save properties without check
// - d-if_is_correct_save_lang_properties_ram
// - d-if_is_correct_save_lang_properties_ssd
// - d-if_is_correct_save_lang_properties_disk
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_if_is_correct_get_properties } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an3/an37_if_is_correct_get_properties.es6'))

class anode_if_is_correct_save_language_properties extends anode_if_is_correct_get_properties {
            
    constructor()
    {        
		super()
		this.n	=	'anode_if_is_correct_save_properties::'											
	}											

	if_is_correct_save_all_language_properties()
	{
		this.m			= 'if_is_correct_save_all_language_properties'												

		// this.p('Saving_all_properties ' + this.short_type + ' ' + this.type)													

		this.if_is_correct_save_lang_properties_disk() 												
		this.if_is_correct_save_lang_properties_ssd() 													

		this.if_is_correct_save_lang_properties_ram() 													

		// this.if_is_correct_sync_lang_properties_to() 															

	}



	if_is_correct_save_lang_properties_ram()
	{
		// Cuando grabar las propiedades
		let ready_to_save = false 		 
		
		// 2. Disk   - cuando se indique
		if ( !this.arr['nfo']['generate_or_reload_properties_ram'] ) 
		{	
				this.only_save_lang_properties_to_ram()						
				// this.p('Save_Properties_RAM  ' + this.type  +  ' P ' +  this.ssd_alias_path )  
											
		}
	}

	if_is_correct_save_lang_properties_ssd()
	{
		// Cuando grabar las propiedades
		let ready_to_save = false 		 
		
		// 2. Disk   - cuando se indique
		if ( !this.arr['nfo']['generate_or_reload_properties_ssd'] ) 
		{	
				this.only_save_lang_properties_to_ssd()						
				// this.p('Save_Properties_SSD  ' + this.type  +  ' P ' +  this.ssd_alias_path )  
											
		}
	}

	if_is_correct_save_lang_properties_disk()
	{
		// Cuando grabar las propiedades
		let ready_to_save = false 		 

		// this.p('Grabando_Disk ' + this.type + ' ' + this.short_type )								 		
		// 2. Disk   - cuando se indique
		if ((
			( this.arr['nfo']['generate_or_reload_properties_disk'] == false ) && 
			( this.b.type_human									    == false ) 	)	
			||
			( this.b.type_translation)
		   )				 
		{	
				// this.p('Grabando_Diskdd '  + this.type + ' ' + this.short_type )								 		
								
				this.only_save_lang_properties_to_disk()													
				// Only save properties					
											
		}
	}

	  
}

exports.anode_if_is_correct_save_language_properties = anode_if_is_correct_save_language_properties