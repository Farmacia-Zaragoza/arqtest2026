// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Translate Contents Class  [V.0.2.0]  (2017-01-10)
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
// - d-translate_contents- 		: Try to get current properties from ram
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_translate_file } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an1/an12_translate_file.es6'))

class anode_translate_contents extends anode_translate_file {

	constructor()
	{
		super()
		this.n	=	'translate_contents::'											
	}
            
    translate_contents() 
    {   
		this.m			=	'translate_contents-'					

		// Algoritmo, hay que comprobar si existe el fichero sin idioma
	

		this.contents = file(this.load_from_disk_path)			

		search = new multiline(this.u.lang_site) 

		
		if (!this.b.file_yaml)
		{
			// De entrada debe ser true
			this.is_translated = true  


			for (pos in this.contents)
		   	{
				var sLinea		= this.contents[pos]
	            // Cada linea tiene el formato
	            // propiedad    @    valor
	            // El separador debe serl la arroba pues las clases css tienen dos puntos y almoadillas 
	            // Habra que estar muy atento a estos valores
	            html_arr      		 	=   sLinea.split("@")
	            prop           		=   trim(html_arr[0])   // Obtiene el CN
	
				var arr_divs = prop.split ('_') 			
	
				arr_name = '' 								
				arr_pos = '' 								
	
	
				// this.p('Prop ' + prop) 													
				// arr_sua4_4@
				
				let arr_divs_len = arr_divs.length 
	            arr_prop					=	arr_divs[0]									
	            if (arr_divs_len >1)  
	            	arr_name				=	arr_divs[1]									
	
	            if (arr_divs_len >2)  
					arr_pos                =  	arr_divs[2]									
				
				// if ( arr_prop 	== "arr" 	)	            
				//	this.p('Arr' + arr_prop  + ' Nam ' + arr_name + 'Pos' + arr_pos)		
				
	            value         			=   ''
			
	            var len_arr        = html_arr.length  
	                            
	            if (len_arr > 1 )
	            value     						=   trim(html_arr[1])   // Obtiene la clase
	
	            // child properties - pendiente de revisar y pasar a los distintos tipos
	            
				// Move properties to types
	            // if 	   ( prop 		== "title"					)		this.title						=	value			
				// elseif ( prop 		== "type"					)		this.type							=	value			
				// elseif ( prop 		== "path"					)		this.path							=	value			

								
				// Aqui es la interfaz de traduccion
				search.read(value)			

				// this.pm('Tran_load ' + value + ' ' + true + ' :' +  ' M :' + this.is_translated +  ' S :' + search.is_translated )											


				if (search.is_translated)
				{
					// Aqui hay que codificarlo

					// this.pm('Tran_load_Before ' + value  +   ' to ' + search.translated_line )											

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
					
					this.is_translated = ( this.is_translated && search.is_translated )		
					
					search.is_translated = true  
				}

				
				if ( 	 arr_prop 	== "arr" 				    )		this.arr[arr_name][arr_pos]		= 	value			
				elseif ( arr_prop 	== "efile" 				    )		
				{
					// Traducimos el fichero
					this.translate_file(arr_name, value)
					 
				}					
				elseif (this.b.type_have_specific_properties)
				{				
					// this.p('Call_to_specific')									
					this.get_child_properties(prop, value) // Metodo especifico de cada tipo
	        
				}
	      	} // End foreach    

		} // End IF YAML
		// Si el metodo es reload nunca va a entrar aqui 
		// this.run_child_action()																							

	
		// this.p('TRANSLATED : ' + this.is_translated + ' - ' + true + ' : ')									
		/// hay que grabar el codigo pero se grabara solo si no es 0
		
		if (this.is_translated)
		{

			// Prepare array properties to save it
			this.prepare_child_properties() 																	

			// Funcion que guarda los ficheros en el nuevo idioma
			this.if_is_correct_save_all_language_properties() 												
			
		}		
			
    }

}

exports.anode_translate_contents = anode_translate_contents