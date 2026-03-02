// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Search Entity Letter Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-query_letter-	  : Run queries regarding posible letters 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	qry 					= require(	'/brqx/base/rcode/es6/com/libs/search/solr/queries.es6'								),						
		{ search_entity	} 		= require(	'/brqx/base/rcode/es6/com/objects/search/solr/entity/search_entity.es6'		);

class search_entity_letter extends search_entity {
            
    constructor (			type					=	''				,
       						file					=	''				,
       						sm_vid					=	''				,	// Cadena a lanzar para solr
       						langs_arr				=	''				,	// Array de idiomas definidos
       						structure_path_arr 		=	''				)	// Array de paths generado en search  
    {   

		super(				type		,	
							file		,	
							sm_vid		,
							langs_arr	,	
							structure_path_arr
							)											

    }

	// ------------------------- QUERY_LETTER ----------------------------------
	query_letter(					arg				, 
									arr_qrys 		, 
									arr_letters		, 
									pos				,	// posicion del argumento - Igual no es necesario devolverla ya
									arg_lang		,	// Argumento en espanol o en el idioma del portal
									no_repeat  		)   // Check de repetido para no generar dos veces la misma query
	{
		// Hace una busqueda en todo el array (dos dimiensiones) chequeando el argumento y comprobando repeticiones
		// devuelve arr_qrys y pos
		// Simple - no es multi lang
		let status		=	false 		 // Por defecto devuelve false que es que no la encuentra

		let pos_repeat	= -1 			 // Posicion del repetido - no impotante
		
		var odom 			= ''		// Objeto de dominio
				
		if (this.type == 'es')
		{
			// Unique lang query - Array de strings
			if	(qri.exist_in_array(this.entity_arr,arg , pos))					
			{
					if (qri.exist_in_array(arr_letters , arg , pos_repeat ))		
					{
//						echo "Repetido" + arg + this.lf 		 
						no_repeat = false 						  
					}
					else
					{
						odom = new qri.create_solr_query_field( qry_string, this.sm_vid , arg)
						qry_string = odom.result
												
						arr_qrys.push(		qry_string	) 															
						arr_letters.push(	qry_string	) 															
					}
					status = true 																		 
			}
		}
		else
		{
		// Multi lang query - Array de arrays	
			if	(qri.exist_in_array_langs(this.entity_arr_arr,arg , pos , lang))					
			{
				if (lang != 'es')	arg_lang = this.entity_arr_arr['es'][pos]							

				// Miramos si ya existe en al array de queries
				if (qri.exist_in_array(arr_letters , arg_lang , pos_repeat ))		
				{
//						echo "Repetido" + arg + this.lf  
						no_repeat = false 						  
				}
				else
				{
					odom = qri.create_solr_query_field( qry_string, this.sm_vid , arg_lang)	
					qry_string = odom.result
										
					arr_qrys.push(		qry_string	) 															
					arr_letters.push(	qry_string	) 															

				}
				status 		= true 																		 
			}
		}

		this.pos		= pos
		this.arg_lang	= arg_lang
		this.no_repeat	= no_repeat
		this.arr_qrys 	= arr_qrys 

		return status  		
	}
	

  
}

exports.search_entity_letter		=	search_entity_letter