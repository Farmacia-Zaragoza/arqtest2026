// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Anode Load One Field Class  [V.0.1.1]  (2017-04-31)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Drupal Product by Filesystem Structure
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_load_one_field > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-load_one_field-   	   	: Load one field - Auto generate fields for drupal 
// - d-load_multi_fields-      	: Auto generate multiple fields for drupal
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_generate_load_from_disk } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an8/an80_generate_load_from_disk.es6')))


class anode_load_one_field extends anode_generate_load_from_disk {

	constructor()
	{

	 	super()
	 	this.n 						= 	'anode_load_one_field::'
	}				

	load_one_field(	field_name		= 	"field_nombre_parrafada_%02d" 	,
									arr_index		= 	"pfs"							, 
									drupal_index	=	"value"							, 
									max_value 		=	10								,
									min_value		=	1								)
	{

		this.m 					=	'load_one_field'								
		
		// Names
		cont = min_value  

		while (cont <= max_value) 
		{
			cont_str= '0' + cont 

 			fieldName 					= sprintf(field_name , cont_str)												
		    fieldLink 					= this.details.fieldName																	
    		this.arr[arr_index].push( fieldLink[0][drupal_index] )															
	 
	      	cont++  
		}

	}

	load_multi_fields(	field_name			= 	"field_lista_enlace_%02d" 				,
										arr_index_str		= 	"tit_url"								, 
										drupal_index_str	=	"title_url"								, 
										max_value 			=	10										,
										min_value			=	1										)
	{

		this.m 					=	'load_multi_fields'								
					
		this.arr['arr-index'] 		= arr_index_str.split('_') 				 
		this.arr['drupal-index'] 	= drupal_index_str.split('_') 			 


		cont = min_value  
		
		while (cont <= max_value) 
		{
			if (cont < 10) 
				cont_str= '0' + cont 
			else 
				cont_str = cont  

 			// fieldName = sprintf("field_lista_enlace_%02d", cont_str)												
 			
 			// ESTA PARTE ESTA PENDIENTE
 			fieldName = sprintf(field_name , cont_str)												
		    fieldLink = this.details.fieldName																	


			for (pos in this.arr['arr-index'])
			{
				let index = this.arr['arr-index'][pos]
				
				drupal_index = this.arr['drupal-index'][pos] 								
				// this.p('index : ' + index + ' Drupal '. drupal_index)						
				// this.arr['tit'] = fieldLink[0]['title']
	    		this.arr[index].push(fieldLink[0][drupal_index])								
			}

          	cont++  
		}
		
		// fn08_paisfada::field_lista_enlace_%02d 60
					  
	}
  
}

exports.anode_load_one_field = anode_load_one_field