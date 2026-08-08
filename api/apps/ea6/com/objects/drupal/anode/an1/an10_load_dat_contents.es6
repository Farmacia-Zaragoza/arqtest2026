// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Node Js - Anode Load Dat Contents Class  [V.0.2.0]  (2017-01-10)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 02]
// *anode_get_current_properties_ram > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_load_dat_contents-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-load_dat_contents- 		: Load dat contents
// - d-no_comments- 			: Avoid comments lines when read files
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

// Deben ser funciones negativas pues estamos filtrando

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const	{ anode_translate_contents } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an1/an11_translate_contents.es6')),
		ffi									= require(	path.join(JS_BASE, 'com/libs/file/full_path/level_01/f_file.es6')),
		fs 									= require(	'fs'																				),
		path 								= require(	'path'																				);

class anode_load_dat_contents extends anode_translate_contents {

	constructor()
	{
		super()
		this.n	=	'an10_load_dat_contents::'											
	}

	// -------------------------------- LOAD_DAT_CONTENTS --------------------------------             
    load_dat_contents() 
    {   
		this.m			=	'load_dat_contents'					
		this.n	=	'an10_load_dat_contents::'											

		// Requiere un array de contents ya generado
		// Si es yaml ya se ha cargado en contents
	
		// this.p('BEFORE_YAML_QUEST ' + this.type +  ' ' + this.short_type) 					
		
		if (!this.b.file_yaml)
		{
			// this.p('AFTER_YAML_QUEST ' + this.type +  ' ' + this.short_type) 					
			
			var arr_divs = Array()
			for (var pos in this.contents)
	      	//foreach (this.contents as sLinea)
	      	{
				var sLine	=	this.contents[pos]	
	            // Cada linea tiene el formato
	            // propiedad    @    valor
	            // El separador debe serl la arroba pues las clases css tienen dos puntos y almoadillas 
	            // Habra que estar muy atento a estos valores
	            let html_arr      		 	=   sLine.split("@")
	            let prop     	      		=   html_arr[0].trim()   // Obtiene el CN
	
				let arr_divs 				= prop.split ('_') 			
	
				let arr_name 				= '' 								
				let arr_pos 				= '' 								
	
	
				// arr_sua4_4@
	            let arr_prop				=	arr_divs[0]									
				let count_arr_divs 			= arr_divs.length

	            if (count_arr_divs >1)
	            {  
	            	arr_name				=	arr_divs[1]
	            		
	            }									
	
	            if (count_arr_divs >2)  
					arr_pos                =  	arr_divs[2]									
				
				// if ( arr_prop 	== "arr" 	)	            
				//	this.p('Arr' + arr_prop  + ' Nam ' + arr_name + 'Pos' + arr_pos)		
				
	            let value         					=   ''
			
	            let len_arr        					= html_arr.length  
	                            
	            if (len_arr > 1 )
	            	value     						=   html_arr[1].trim()   // Obtiene la clase
	
	            // child properties - pendiente de revisar y pasar a los distintos tipos
	            
				// Move properties to types
	            // if 	   ( prop 		== "title"					)		this.title						=	value			
				// elseif ( prop 		== "type"					)		this.type							=	value			
				// elseif ( prop 		== "path"					)		this.path							=	value			
				
				if ( 	 arr_prop 	== "arr" 				    )		
				{
					// this.p('Array_Names ' + arr_name )
					this.arr[arr_name][arr_pos]		= 	value
				}			
				else if ( arr_prop 	== "efile" 				    )		
				{
					// this.p ('Load_prop_path_r ' + file_path)																	

					// External file  -like a letter  - or yaml
					let file_path 		= path.dirname (this.current_file_to_use) + '/' + value																
					// this.p ('Load_prop_path_r ' + file_path)																	

					var ff_arr 			= new ffi.properties_from_file(file_path)
					// test_arr	=	file(file_path, FILE_IGNORE_NEW_LINES)
					this.arr[arr_name] 	= ff_arr.arr			 
				}					
				else if (this.b.type_have_specific_properties)
				{				
					// this.p ('Load_SPEC_prop_ ' + prop)																	

					this.get_child_properties(prop, value) // Metodo especifico de cada tipo
					
									
	        	}
	      	} // End foreach    

		}

		this.run_child_action()																							


		// Hay que preparar las propiedades antes de grabar
		this.prepare_child_properties() 												

		
		/// hay que grabar el codigo pero se grabara solo si no es 0
		// el codigo debe ser solo si tiene codigo
		this.if_is_correct_save_all() 												

		// this.p('After_SaveAll')														
			
    }

}

exports.anode_load_dat_contents = anode_load_dat_contents