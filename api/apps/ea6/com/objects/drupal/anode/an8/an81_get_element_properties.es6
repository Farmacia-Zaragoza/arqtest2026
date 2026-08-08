// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Anode Get Element Properties Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Drupal Details Filesystem Type - independent of drupal
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_get_element_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Defined methods
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// d-load_contents-					: 
// d-get_element_properties- 		: Create paths special for common types
// d-exist_element_properties-		:
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_savenode } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an8/an85_savenode.es6')))


class anode_get_element_properties  extends anode_savenode{

	constructor()
	{
    	super()
		this.n						= 'anode_get_element_properties::'				    		
   }
            
	// PENDIENTE

    get_element_properties(elem) {
			   
		// Intentamos cargar el archivo existente. Si no existe hay que generarlo
		this.m 					= 	'get_element_properties'				.
			
		// OJO ESTO ESTA MUY EN DESUSO
							        
        if ( this.exist_element_properties(elem) )
        {
        // Cada linea es una propiedad SEPARADOR (@) su valor

			for (var pos in this.contents)        
          {
          	sLinea 					= 	this.contents[pos]

            html_arr      		 	=   sLinea.split("@")
            prop           		=   trim(html_arr[0])   // Obtiene el CN

			// Nueva prueba con un array de dos dimensiones para que valga para cualquier tipo sin saberlo previamente
            arr_prop				=	prop.substr( 0,4) 		
            arr_name				=	trim (prop.substr( 4,3)) 		
            
            value         			=   ''

		
            len_arr        = html_arr.length 
                            
            if (len_arr > 1 )
            value     						=   trim(html_arr[1])   // Obtiene el valor

			// REVISAR ARRAY DOS DIMENSIONES
            if 	   ( prop 		== "title"					)		this.title						=	value			
			else if ( prop 		== "type"					)		this.type							=	value			
			else if ( prop 		== "path"					)		this.path							=	value			
			else if ( arr_prop 	== "arr_" 				    )		this.arr[arr_name].push(value)			

			this.get_child_properties(prop, value) // Metodo especifico de cada tipo

            
          } // End foreach    

			
        } // End if
    }

	load_contents()
	{

		this.is_there_contents = false 
		
		if (is_dir (this.path))
		{		
			// REVISAR FUNCIONES ITERAR DIRECTORIOS

			di = new RecursiveDirectoryIterator(	this.path								)
	
			it = new RecursiveIteratorIterator(di)											
	

			for (pos in it)
			{
				var elemento = it[pos]
				// this.d('elem ' + elemento)																	
	
				if (!is_dir(elemento) )
				{
					this.is_there_contents = true  
	
					// El tipo es el nombre del fichero (linea_menu)
					// Iteramos cada archivo  linea_menu	
					this.type		= 	path.basename(elemento , ".dat")
			
					// this.d('Tipo ' + this.type + ' - elem  ' + elemento)	
					
					if (this.type != 'tax')
					{
						this.get_element_properties(elemento)
					}
					else 
					{
						this.get_tax_properties(elemento)						
					}
					this.d('Num ' + this.arr.length)	
					 
				}
			}				
		}
	}

	exist_element_properties(elem)
	{
		// Comprueba si existe y ademas si el metodo no es reload
        if ( ( elem						!= '' 	) && 
        	 ( file_exists(elem	)				) &&
        	 ( 0 != filesize( elem ) 				) )
			{
				// Recover an array
				this.contents = file(elem)			
				return true														
			}	
		return false 													 		
	}

  
}


exports.anode_get_element_properties = anode_get_element_properties