// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Properties Class  [V.0.1.1]  (2017-03-31)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON][PHP_56]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 03]
// *anode_array_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_prepare_array_properties-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-prepare_array_properties- 			: 	Update Array properties From Arr
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_only_save_properties } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an4/an41_only_save_properties.es6')),
	array_key_exists					= require(	'/brqx/base/react/zcommon/node_modules/locutus/php/array/array_key_exists'				);

class anode_prepare_array_properties extends anode_only_save_properties {

	constructor()
	{
		super()
		this.n	=	'anode_prepare_array_properties::'											
	}
            
	// ------------------------------- PREPARE_ARRAY_PROPERTIES -------------------------------            
	prepare_array_properties()
	{
		this.m				=	'prepare_array_properties'								
		this.n				=	'anode_prepare_array_properties::'											

		// En algun momento estamos perdiendo el separador el triple igual no permite comparar cadenas

		// this.p('saving_prop ' + this.arr['properties'].length ) 				


		if (( this.sep == '') || ( this.sep == ' '))	this.sep = '@'									
		
		if (array_key_exists('types', this.arr))
		{ 
			// this.p('saving_prepare_arr ' + this.arr['types'].length + ' First : ' +  this.arr['types'][0]  ) 				


			for (var type of Object.values(this.arr['types'])) 
			{	
				if (array_key_exists(type, this.arr))
				{ 
					for (var pos in this.arr[type]) 
					{
						var elem			=	this.arr[type][pos] 

						// this.p(pos + ' . ' + elem )																				
						// Si usamos este formato y pasamos 10 indices siempre se van a sobrescribir
						// ahqu que guardar lo siguiente this.arr['rur'][this.img_base_resolution]

						let save_line 							= 	'arr_' + type + "_" + pos  	+ this.sep  + elem								
						// this.p(type + ' Line : ' +  save_line  + ':') 									
	
						this.arr['properties'].push( save_line )									
					}
				}
				else
				{
					//  Checking keys
					this.p('Key_dont_exist ' +  type)
					
					
				}	
			}

		// this.p('saving ' + this.arr['properties'].length + ' First : ' +  this.arr['properties'][0]  ) 				
		}
	}

	  
}

exports.anode_prepare_array_properties = anode_prepare_array_properties
