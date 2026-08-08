// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Minimize Solr Search connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-search-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-generate_entities- 				: Generate phpoto entities 
// - d-process_path-					: Process path 
// - d-process_path_generate_array-    	: Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ search_structure } 		= require(	'/brqx/base/rcode/es6/com/objects/search/solr/search_structure.es6'					),
		const { search_entity_letter } 	= require(	'/brqx/base/rcode/es6/com/objects/search/solr/entity/search_entity_letter.es6'		),
		url						 	= require(	'/brqx/base/rcode/es6/com/libs/string/url.es6'										),
		empty		 				= require(	'/brqx/base/react/zcommon/node_modules/is_empty'									),
		pad 						= require(	'/brqx/base/react/zcommon/node_modules/pad'											);

class search extends search_structure {

    constructor (uri_to_process		=	''				)  
    {   

		super(uri_to_process)											

		this.n								= 	'search::'								
		this.m								=	'constructor' 

		// Same for all languages	
		this.codes_file						=	'codes.dat' 					
		this.years_file						=	'years.dat' 					
	
		// Possible Different for all languages	
	
		// this.cities_file					=	'cities.dat' 				
		this.cities_file					=	'places.dat' 				

		this.countries_file					=	'countries.dat' 			
		this.places_file					=	'places.dat' 				
		this.nature_file					=	'nature.dat' 				
		this.circunstances_file				=	'circunstances.dat'			
	
		this.entities_file					=	'entities.dat' 				
		this.letters_file					=	'letters.dat'				
		
	//	this.url_path						=	'portugal/lisboa/recuerdo/1024/waterfall/bridge/2007/070101/escapada/l/mos08bos/portugal/cascada/l/l'	
	//	this.url_path						=	'bridge'	
	// 	this.url_path						=	'paris'	
		// Objects Search entity
		
		this.countries						=	''						
		this.cities							=	''						
		this.codes							=	''						
		this.dates							=	''						
		this.nature							=	''						
		this.circunstances					=	''						
	
		this.entities						=	''							
		this.years							=	''						
		this.places							=	''						
	    
    
    	// this.p('Before_Generate_Entities')
		this.generate_entities() 										

		// this.process_path() 							

		// Hemos procesado. Los parametros pueden ser incorrectos pero la query esta formada
		// En una busqueda estricta en este caso no deberiamos hacer nada
		// Luego tenemos tambien query or generada. 
		// A su vez el array deberia estar ordenado y estar generada la cadena de busqueda 

    }

	// ------------------------- GENERATE ENTITIES ----------------------------------
	generate_entities()
	{
		this.m								=	'generate_entities' 

		// Entity no lang
		this.places 			= new search_entity_letter('es'	,this.places_file				, 	'sm_vid_Lugar'	,
									this.langs_arr, this.structure_path_arr )

		this.letters 			= new search_entity_letter('es'	,this.letters_file				, 	'sm_vid_Letra'	,
									this.langs_arr, this.structure_path_arr )

		this.countries 			= new search_entity_letter('lang'	,this.countries_file		, 	'sm_vid_Pais'		,
									this.langs_arr, this.structure_path_arr )

		// no tenemos ciudades implementadas en cica. Usaremos lugares
		this.cities 			= new search_entity_letter('es'	,this.cities_file				, 	'sm_vid_Lugar'		,
									this.langs_arr, this.structure_path_arr )

		this.codes 				= new search_entity_letter('es'	,this.codes_file				, 	'sm_vid_Code'			,
									this.langs_arr, this.structure_path_arr )

		this.nature 			= new search_entity_letter('lang'	,this.nature_file			, 	'sm_vid_Naturaleza',
									this.langs_arr, this.structure_path_arr )

		this.circunstances 		= new search_entity_letter('lang'	,this.circunstances_file	, 	'sm_vid_Circunstancia',
									this.langs_arr, this.structure_path_arr )

		this.years 				= new search_entity_letter('es'	,this.years_file				, 	'sm_vid_Año',
									this.langs_arr, this.structure_path_arr )

		this.entities 			= new search_entity_letter('es'	,this.entities_file				, 	'sm_vid_Entidad',
									this.langs_arr, this.structure_path_arr )

	}

	// ------------------------- PROCESS PATH ----------------------------------
	process_path()
	{
		// q es un array de queries

		this.m								=	'process_path' 

		// Cambiamos args_arr_to_cache por this.arr['arg']							

		// this.p('Before Generate Array')
		this.process_path_generate_array()			

		// this.p('Before Sort Array')
				
		this.process_path_sort_array()						
	}

	// ------------------------- PROCESS PATH_GENERATE_ARRAY ----------------------------------
	process_path_generate_array(q = '' )
	{
		this.m								=	'process_path_generate_array' 

		// q es el array de queries a devolver

		if (empty(q))
			q = this.arr['qrys']


		// Process path con objetos para generar el array de queries
        this.args_arr       		=   this.url_path.split("/")		
        	
		
		let arr_letters 		  	=   Array()								 // Repeat array for letters

		let arr_mini_words		  	=   Array()								 // Repeat array for mini words (por cubo )
			
		let pos	=	-1 													
		

		let cont = 0  

		//foreach (this.args_arr as arg)
		for (var elem_arg of Object.values(this.args_arr)) 
		{

			if (!empty(elem_arg))
			{
				// this.p('OJO - this_arg_arr ' + elem_arg)

				let no_repeat 				= true	 // Necesario para comprobar es el elemento esta o no repetido  

				var arg_lang 				= elem_arg 	 // Pasamos otra variable para que devuelva el parametro en el idioma convertido
				
				let arg_len	= elem_arg.length   

				let	status					=	false

				if (arg_len == 1) 
				{
					// QUERY_LETTER - query especial para letras
						status		= this.letters.query_letter(elem_arg, q , arr_letters , pos , arg_lang , no_repeat)		

					 	pos			= this.letters.pos
					 	arg_lang 	= this.letters.arg_lang
					 	no_repeat  	= this.letters.no_repeat 		

					// En este caso es muy complejo comprobarlo pues la probabilidad de que se repita una letra es altisima
					// queda pendiente de implementar
					
					if (no_repeat)
					{		
						var str_aux = new url.replace( arg_lang , "/\r|\n/"  , ""	)
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
							var str_aux = new url.replace( arg_lang , "/\r|\n/"  , ""	)
							this.arr['arg'].push( 	str_aux.result	)
							
						}	
					}
				}
				else 
				{
					// this.p('Query for ' + elem_arg )
					// QUERY_WORD
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
						// this.p("Incorrecto - " + elem_arg + ' P ' + this.circunstances.path )														
						this.incorrect_parms	= "true"				 // Activamos el flag de parametros incorrectos
					}
					else 
					{
						// this.p('CHECKING out '+ elem_arg)
						// que pasa si se busca algo ya repetido
						if (no_repeat)
						{		
							// this.p('CHECKING in '+ elem_arg)
							var str_aux = new url.replace( arg_lang , "/\r|\n/"  , ""	)
							this.arr['arg'].push( 	str_aux.result	)
						}		
					}
				} // End querys

			} // End If
		} // End Foreach
		
	}

	// ------------------------- PROCESS PATH_SORT_ARRAY ----------------------------------
	process_path_sort_array()				
	{
		this.m								=	'process_path_sort_array' 

		// En este punto tenemos el array pasado y traducido.
		// Por tanto ese array se podria usar como entrada para gestion de paths y categorias 

		// this.parr(this.arr['arg'])


		if (Array.isArray(this.arr['arg']))
		{
			// sort(this.arr['arg'])				 // sort is a procedure - sort array		

			this.arr['arg'].sort()				 // sort is a procedure - sort array		
	
			// this.parr(this.arr['arg'])
	
			let correct_elem_str='' // Cadena correca de posiciones y elementos pasados
			// es lo mismo spain/madrid que madrid/spain
	
			let arr_size = this.arr['arg'].length  		
			let cont = 0  
	
	
			//foreach (this.arr['arg'] as elem)
			for (var elem of Object.values(this.arr['arg'])) 
			{
				// pad('pad', 5, '+') // "pad++"
				// Generamos terminos nXX@madrid_
				// correct_cont		= 	str_pad(cont, 2, "0", STR_PAD_LEFT) // contador de dos posiciones
				let correct_cont		= 	pad(2, cont, "0") // contador de dos posiciones

				// this.p ('Contador ' + cont + ' pad ' + correct_cont )
				correct_elem_str 	+= 'n' + correct_cont + '@' + elem   
		
				if (cont < arr_size) correct_elem_str +=  '_'
	
				cont++
			}
	
			this.query_sorted	= correct_elem_str	
		}		
	}

}

exports.search			=	search