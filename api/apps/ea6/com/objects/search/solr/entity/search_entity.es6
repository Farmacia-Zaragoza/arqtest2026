// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS.Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - generate_path_and_array: Generate path && array related to search 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ printlog } 		= require(	'/brqx/base/rcode/es6/com/objects/logs/printlog.es6'						);
		const fs = require(	'fs'																		);
		const qry = require(	'/brqx/base/rcode/es6/com/libs/search/solr/queries.es6'						);

class search_entity  extends printlog {

    constructor (		type					=	''				,
						file					=	''				,
						sm_vid					=	''				,	// Cadena a lanzar para solr
						langs_arr				=	''				,	// Array de idiomas definidos
						structure_path_arr 	 	=	''				)	// Array de paths generado en search  
    {   

		super()
		this.type					=	'es'						    // el tipo puede ser lang - es
		this.sm_vid					=	''

   	// PATH ZONE
// 			this.years_path						=	this.structure_path_arr['es'] + this.years_file			
   		this.path					=	''								
	
// 			this.countries_path_arr[lang]		=	this.structure_path_arr[lang] + this.countries_file		
		this.path_arr 				=	Array() 				

		this.path_arr['es']		=	Array()
		this.path_arr['fr']		=	Array()
		this.path_arr['en']		=	Array()
		this.path_arr['it']		=	Array()
		this.path_arr['de']		=	Array()
		this.path_arr['hi']		=	Array()
		this.path_arr['ru']		=	Array()
		this.path_arr['ja']		=	Array()

	// ARRAY ZONE
	
// 			load_array_file_in_array_master(this.constructions_arr	, 	this.constructions_path_arr[lang] 	, lang)
		this.entity_arr_arr			=	Array() 				 // Doble array - array of arrays

//			  		this.cities_arr					=	file(this.cities_path)				
	
		// Array que usamos para entidades. Deberia cambiarse o vaciarse
		this.entity_arr 			=	Array() 				 // Simple array - array of strings

	// Arrays de idiomas
	
		this.langs_arr 				=	Array() 				
	
		this.structure_path_arr		=	Array() 				
		
		// Array to manage queries
		this.arr_qrys				=	Array()
	
		this.sep					=	'@'						
		this.lf						=	"\n\r" 					

		this.type					=	type													
		this.file					=	file													
		this.sm_vid					=	sm_vid													
		
		this.langs_arr				=	langs_arr												
		this.structure_path_arr		=	structure_path_arr										
		
		this.generate_path_and_array()														

    }

	// ------------------------- GENERATE_PATH_AND_ARRAY----------------------------------
	generate_path_and_array()
	{
		// this.p('Generating_path ' + this.type)

		// Simple - no es multi lang
		if (this.type == 'es')
		{
				this.path					=	this.structure_path_arr['es'] + 	this.file		

				// this.p('Generating_path ' + this.type + ' Path ' + this.path )
			
				// Array of strings
				// this.entity_arr			=	file(this.path)
				this.entity_arr = fs.readFileSync(this.path).toString().split('\n');

				// this.p('Generating_path ' + this.type + ' Path ' + this.path + ' Len ' + this.entity_arr.length )
							
		}
		else 
		// Multiple debe existir un array de idiomas

			// foreach (this.langs_arr as lang)
			for (var lang of Object.values(this.langs_arr)) 
			{
				this.path_arr[lang]		=	this.structure_path_arr[lang] + 	this.file		
			
				// Array of arrays
				qry.load_array_file_in_array_master(this.entity_arr_arr	, 	this.path_arr[lang] 	, lang)
			}
		
	}

	// ------------------------- QUERY ----------------------------------
	query(					arg			, 
							arr_qrys 	,	// array de queries de salida 
							pos			,	// posicion del argumento - Igual no es necesario devolverla ya
							arg_lang	,	// Argumento en espanol o en el idioma del portal
							no_repeat  	,	// Check de repetido para no generar dos veces la misma query
							name	=	'common'	) // Added to control flow   
	{
		// devuelve arr_qrys y pos
		// Simple - no es multi lang

		let status		=	false 		 // Por defecto devuelve false que es que no la encuentra

		let pos_repeat	= -1 			 // Posicion del repetido - no impotante 

		let qry_string		=	''

		// entity_arr cambia con cada objeto de busqueda
		// this.parr(this.entity_arr)

		if (this.type == 'es')
		{
			// Unique lang query - Array de strings
			if	(qry.exist_in_array(this.entity_arr, arg , pos))					
			{
				// this.p('Quering ' + arg + ' T ' +  this.type)

					if (qry.exist_in_array(arr_qrys , arg , pos_repeat ))		
					{
						// this.p('NoQuering ' + arg + ' L ' +  arr_qrys.length)
						no_repeat = false 						  
					}
					else
					{
						qry_string		=	''
						var ogen = new qry.create_solr_query_field( qry_string, this.sm_vid , arg_lang)
						qry_string = ogen.result 

						// this.p('Insertando( ' + name + ' )' + arg + ' query_string: ' + qry_string + ':')
						arr_qrys.push( qry_string	) 															
					}
					status = true 																		 
			}
		}
		else
		{
		// Multi lang query - Array de arrays
			let lang		=	''	

			if	(qry.exist_in_array_langs(this.entity_arr_arr,arg , pos , lang))					
			{
				if (lang != 'es')	arg_lang = this.entity_arr_arr['es'][pos]							

				// Miramos si ya existe en al array de queries
				if (qry.exist_in_array(arr_qrys , arg_lang , pos_repeat ))		
				{
						no_repeat = false 						  
				}
				else
				{
					qry_string		=	''
					var ogen = new qry.create_solr_query_field( qry_string, this.sm_vid , arg_lang)
					qry_string = ogen.result 
												
					// this.p('Insertando ' + arg + ' query_string :' + qry_string + '::')
					arr_qrys.push( 	qry_string	) 															
				}
				status 		= true 																	 
			}
		}

		// this.p('After Insert ' + arg + ' query_string ' + qry_string)
		// this.parr(arr_qrys)

		this.pos		= pos
		this.arg_lang	= arg_lang
		this.no_repeat	= no_repeat
		this.arr_qrys 	= arr_qrys 
		return status  		
	}
  
} // End Class 

exports.search_entity		=	search_entity