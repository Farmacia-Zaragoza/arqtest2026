// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Translate File Class  [V.0.2.0]  (2017-01-10)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 02]
// *anode_get_current_properties_ram > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-translate_file- 		: Translate a file
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_check_only_if_is_needed_to_reload_type } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an2/an22_check_only_if_is_needed_to_reload_type.es6'))

class anode_translate_file extends anode_check_only_if_is_needed_to_reload_type {

	constructor()
	{
		super()
		this.n	=	'translate_contents::'											
	}
            
    translate_file(arr_name = '' , part_name = '') 
    {   
		this.m			=	'translate_contents-'					

		// Algoritmo, hay que comprobar si existe el fichero sin idioma
	
		internal_translate = true 															
	
		common_path	= dirname (this.current_file_to_use) + '/' + part_name			
						
		file_lang_path = common_path	+ '_' + this.u.lang_site							

		// this.p('Common_File_to_Use ' + common_path)										

		// this.p('Lang_File_to_Use ' + common_path)										

		if (is_file(file_lang_path))			
			this.arr[arr_name]	=	file(file_lang_path, FILE_IGNORE_NEW_LINES)
		else
		{	
			if (this.u.translation_enabled)
			{
				// TRANSLATION ZONE						
				if (is_file(common_path))
				{
					// Toca traducir
					arr_common				=	file(common_path, FILE_IGNORE_NEW_LINES)				
		
					search = new multiline(this.u.lang_site) 

					// REVISAR BUCLE
					
					for (value in arr_common)
					//foreach (arr_common as pos => value)
					{
						search.read(value)			
		
						// this.pm('Tran_load ' + value + ' ' + true + ' :' +  ' M :' + this.is_translated +  ' S :' + search.is_translated )											
		
						if (search.is_translated)
						{
							// Convert accents to html entities format
							output = htmlentities(search.translated_line, 0, "UTF-8")
		
							if (output == "") 
							{
								// this.p('Traducido_ya_antes ' + value)												
		
							    value = htmlentities(utf8_encode(search.translated_line), 0, "UTF-8")
		
								// this.p('Traducido_ya_despues ' + value)												
							}					
							else 
							{
								value = search.translated_line															
							}
							
							// this.p('Traducido_ya_ ' + value)												
							
							internal_translate = ( internal_translate && search.is_translated )		
							
							search.is_translated = true  
			
						} // End If Translated
						
						// Insertamos en el array el valor ya se haya traducido o no
						this.arr[arr_name].push( value )												 															 
		
					} // End Foreach
					
					if (internal_translate)
					{
						// Habria que guardar el array en el fichero
						save_properties_to_file(	file_lang_path						, 
											this.arr[arr_name]						)
					}
					
				} // Ene If Exist
				
			} // End Translation
			else 
			{
				// No translation block
				if (is_file(common_path))
					this.arr[arr_name]	=	file(common_path, FILE_IGNORE_NEW_LINES)
			} // End No Translation
		} // End If Exist lang 	

	} // End Function
	
}

exports.anode_translate_file = anode_translate_file