// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Minimize Solr Search connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - generate_full_entities   	  :  
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ search } 					= require(	'/brqx/base/rcode/es6/com/objects/search/solr/search.es6'							);
		const { search_entity_letter } = require(	'/brqx/base/rcode/es6/com/objects/search/solr/entity/search_entity_letter.es6'		);
		const empty = require(	'/brqx/base/react/zcommon/node_modules/is_empty'									);

class full_entities_search extends search {
    
    constructor (uri_to_process		=	''				)  
    {   
		super(uri_to_process)
		this.n		= 	'full_entities_search::'								

		this.generate_full_entities()

    }

	generate_full_entities()
	{
		this.entities 			= new search_entity_letter('lang'	,this.entities_file	, 	'sm_vid_Entity',
									this.langs_arr, this.structure_path_arr )
	}

	process_path_generate_full_entities_array(q = '' )
	{
		// Process path con objetos para generar el array de queries
        this.args_arr       =   this.url_path.split("/")			
		
		let arr_letters 		  =   Array()								 // Repeat array for letters

		let arr_mini_words		  =   Array()								 // Repeat array for mini words (por cubo )
			
		let pos	=	-1 													

		let cont = 0  
		// foreach (this.args_arr as arg)
		for (var elem_arg of Object.values(this.args)) 
		{

			if (!empty(elem_arg))
			{
				let no_repeat 				= true	 // Necesario para comprobar es el elemento esta o no repetido  

				var arg_lang 				= elem_arg 	 // Pasamos otra variable para que devuelva el parametro en el idioma convertido
				
				let arg_len	= elem_arg.length   

				let	status					=	false

				if (arg_len == 1) 
				{
					// query especial para letras
					status 				= 
						this.letters.query_letter(arg, q , arr_letters , pos , arg_lang , no_repeat)		

					// En este caso es muy complejo comprobarlo pues la probabilidad de que se repita una letra es altisima
					// queda pendiente de implementar
					
					if (no_repeat)		
					{
						var str_aux = new url.replace( arg_lang , "/\r|\n/" , ""	)
						this.arr['arg'].push( 	str_aux.result	)
						
					}
					
				}
				else if (arg_len <= 4 ) 
				{
					// QUERY_SHORT
						status 		= this.years.query_letter(			elem_arg, q , arr_mini_words ,pos , arg_lang, no_repeat)
					 	pos			= this.years.pos
					 	arg_lang 	= this.years.arg_lang
					 	no_repeat  	= this.years.no_repeat 		
									
					if (status == false) 
					{
						status 		= this.nature.query_letter(			elem_arg, q , arr_mini_words ,pos , arg_lang, no_repeat)			
					 	pos			= this.nature.pos
					 	arg_lang 	= this.nature.arg_lang
					 	no_repeat  	= this.nature.no_repeat 		
					}
					if (status == false) 
					{
						status 		= this.circunstances.query_letter(	elem_arg, q , arr_mini_words ,pos , arg_lang, no_repeat)			
					 	pos			= this.circunstances.pos
					 	arg_lang 	= this.circunstances.arg_lang
					 	no_repeat  	= this.circunstances.no_repeat 		
					}
					if (status == false) 
					{
						status 		= this.codes.query_letter(			elem_arg, q , arr_mini_words ,pos , arg_lang, no_repeat)			
					 	pos			= this.codes.pos
					 	arg_lang 	= this.codes.arg_lang
					 	no_repeat  	= this.codes.no_repeat 		
					}
					if (status == false) 
					{
						status 		= this.countries.query_letter(		elem_arg, q , arr_mini_words ,pos , arg_lang ,no_repeat)			
					 	pos			= this.countries.pos
					 	arg_lang 	= this.countries.arg_lang
					 	no_repeat  	= this.countries.no_repeat 		
					}
					if (status == false) 
					{
						status 		= this.cities.query_letter(			elem_arg, q , arr_mini_words ,pos , arg_lang, no_repeat)						
					 	pos			= this.cities.pos
					 	arg_lang 	= this.cities.arg_lang
					 	no_repeat  	= this.cities.no_repeat 		
					}
					if (status == false) 
					{
						status 		= this.places.query_letter(			elem_arg, q , arr_mini_words ,pos , arg_lang, no_repeat)			
						pos			= this.places.pos
						arg_lang 	= this.places.arg_lang
						no_repeat  	= this.places.no_repeat 		
					}
					if (status == false)
					{
//						echo "Incorrecto - " + arg + this.lf														
						this.incorrect_parms	= "true"				 // Activamos el flag de parametros incorrectos
					}
					else 
					{
						// que pasa si se busca algo ya repetido
						if (no_repeat)		
						{
							var str_aux = new url.replace( arg_lang , "/\r|\n/" , ""	)
							this.arr['arg'].push( 	str_aux.result	)
						}
					}
				}
				else 
				{
										 status 	= this.years.query(	elem_arg, q , pos , arg_lang, no_repeat ,'year')
										 // q			= this.years.arr_qrys -- arrays always by reference
										 pos		= this.years.pos
										 arg_lang 	= this.years.arg_lang
										 no_repeat  = this.years.no_repeat 		
					if (status == false)
					{ 
										 status 	= this.nature.query(			elem_arg, q , pos , arg_lang, no_repeat ,'nature')
										 pos		= this.nature.pos
										 arg_lang 	= this.nature.arg_lang
										 no_repeat  = this.nature.no_repeat 		
					
					}			
					if (status == false) 
					{
										 status 	= this.circunstances.query(		elem_arg, q , pos , arg_lang, no_repeat ,'circunstance')
										 pos		= this.circunstances.pos
										 arg_lang 	= this.circunstances.arg_lang
										 no_repeat  = this.circunstances.no_repeat 		
					}
					if (status == false)
					{ 
										 status 	= this.codes.query(				elem_arg, q , pos , arg_lang, no_repeat ,'code')
										 pos		= this.codes.pos
										 arg_lang 	= this.codes.arg_lang
										 no_repeat  = this.codes.no_repeat 		
					}			
					if (status == false)
					{ 
										 status 	= this.countries.query(			elem_arg, q , pos , arg_lang, no_repeat ,'country')
										 pos		= this.countries.pos
										 arg_lang 	= this.countries.arg_lang
										 no_repeat  = this.countries.no_repeat 		

					}			
					if (status == false)
					{ 
										 status 	= this.entities.query(			elem_arg, q , pos , arg_lang, no_repeat	, 'entity')
										 pos		= this.entities.pos
										 arg_lang 	= this.entities.arg_lang
										 no_repeat  = this.entities.no_repeat 		

					}						
					if (status == false)
					{ 
										 status = this.cities.query(			elem_arg, q , pos , arg_lang, no_repeat , 	'city ')
										 pos		= this.cities.pos
										 arg_lang 	= this.cities.arg_lang
										 no_repeat  = this.cities.no_repeat 		
					}						
					if (status == false) 
					{
									     status = this.places.query(			elem_arg, q , pos , arg_lang, no_repeat , 'place')
										 pos		= this.places.pos
										 arg_lang 	= this.places.arg_lang
										 no_repeat  = this.places.no_repeat 		
					}			
					if (status == false)
					{
//						echo "Incorrecto - " + arg + this.lf														
						this.incorrect_parms	= "true"				 // Activamos el flag de parametros incorrectos
					}
					else 
					{
						// que pasa si se busca algo ya repetido
						if (no_repeat)		
						{
							var str_aux = new url.replace( arg_lang , "/\r|\n/" , ""	)
							this.arr['arg'].push( 	str_aux.result	)
						}
					}
				}

			}
		}
	}

}

exports.full_entities_search		=	full_entities_search
