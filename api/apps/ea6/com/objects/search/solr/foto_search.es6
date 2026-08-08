// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Minimize Solr Search connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-foto_search-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-generate_fotoentities-   	  :
// - d-process-
// - d-process_entities-  
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	qry 						= require(	'/brqx/base/rcode/es6/com/libs/search/solr/queries.es6'							);
		const empty = require(	'/brqx/base/react/zcommon/node_modules/is_empty'								);
		const { search_structure } = require(  '/brqx/base/rcode/es6/com/objects/search/solr/search_structure.es6' 			);
		const { search } = require(	'/brqx/base/rcode/es6/com/objects/search/solr/search.es6'						);
		const { search_entity_letter } = require(  '/brqx/base/rcode/es6/com/objects/search/solr/entity/search_entity_letter.es6' 	);

class foto_search extends search {

    constructor (uri_to_process		=	''				)  
    {   
		super(uri_to_process)											
		this.n										= 	'foto_search::'								
		this.m										=	'constructor' 
	
		// Attributes
	
		this.resolutions_file						=	'resolutions.dat'		
		this.sendas_file							=	'sendas.dat'			

		// Query strings
		
		this.foto_query 							= 	''						
	
		// Objects Search entity
		
		this.foto_countries							=	''					
		this.foto_resolution						=	''						
		this.foto_cities							=	''						
		this.foto_codes								=	''					
		this.foto_dates								=	''					
		this.foto_delight							=	''						
		this.foto_nature							=	''						
		this.foto_constructions						=	''					
		this.foto_circunstances 					=	''						
		this.foto_years								=	''					
		this.foto_sendas							=	''						
		this.foto_places							=	''

		this.foto_entities							=	''
	
    	// this.p('Before_Generate_FOTO_Entities')
		
		this.generate_fotoentities() 											
    }

	// ------------------------- PROCESS ----------------------------------
	process(path = '' )
	{
		this.m										=	'process' 

		if (!empty(path) ) 
			this.url_path				=	path								

		// this.p('Before process entities ' + this.url_path)
		// To process entities we need path

		// Process entities and foto entities
		this.process_entities() 											

		// Hemos procesado. Los parametros pueden ser incorrectos pero la query esta formada
		// En una busqueda estricta en este caso no deberiamos hacer nada
		// Luego tenemos tambien query or generada. 
		// A su vez el array deberia estar ordenado y estar generada la cadena de busqueda 

		// this.p('Before generate query')

		this.generate_query() 													
		
	}

	// ------------------------- GENERATE FOTOENTITIES ----------------------------------
	generate_fotoentities()
	{
		this.m						=	'generate_fotoentities'

		this.foto_places 			= new search_entity_letter('es'	,this.places_file			, 	'sm_vid_FotoLugar'		,
									this.langs_arr, this.structure_path_arr )

		// No existen las ciudades en Cica
		this.foto_cities 			= new search_entity_letter('es'	,this.cities_file			, 	'sm_vid_FotoLugar'		,
									this.langs_arr, this.structure_path_arr )

		this.foto_countries 		= new search_entity_letter('lang'	,this.countries_file	, 	'sm_vid_FotoPais'		,
									this.langs_arr, this.structure_path_arr )

		this.foto_codes 			= new search_entity_letter('es'	,this.codes_file			, 	'sm_vid_FotoCode'		,
									this.langs_arr, this.structure_path_arr )

		this.foto_years 			= new search_entity_letter('es'	,this.years_file			, 	'sm_vid_FotoTemporada'	,
									this.langs_arr, this.structure_path_arr )

		this.foto_nature 			= new search_entity_letter('lang'	,this.nature_file		, 	'sm_vid_FotoNaturaleza'	,
									this.langs_arr, this.structure_path_arr )

		this.foto_sendas 			= new search_entity_letter('es'	,this.sendas_file			, 	'sm_vid_FotoSenda'		,
									this.langs_arr, this.structure_path_arr )

		// this.p('Before_call_Res_File ' + this.resolutions_file )

		this.foto_resolutions 		= new search_entity_letter('es'	,this.resolutions_file	, 		'sm_vid_FotoResolucion'	,
									this.langs_arr, this.structure_path_arr )

		this.foto_entities 			= new search_entity_letter('es'	,this.entities_file			, 		'sm_vid_FotoEntity'	,
									this.langs_arr, this.structure_path_arr )

		// this.p('After_call_Res_File ' + this.foto_resolutions.path )
	
	}

	// ------------------------- PROCESS ENTITIES ----------------------------------
	process_entities()
	{
		this.m										=	'process_entities' 

		// Debemos saber que tipo de busqueda quiere el usuario
		// 1. Recuerdos y selecciones
		// 2. Fotos
		// 3. Fast images or fast photo (pending)
		// 4. Todo

			// A. Check Entities
			var hay_recuerdos 	= false 
			var hay_fotos 		= false
			
			// query string
			var q				=	''  
	        	
			// Initial argument array
	        //this.arr['ini']       =   explode("/", this.url_path)			

			// this.p('Url Path ' + this.url_path )
			this.arr['ini'] = this.url_path.split("/");

			// this.parr(this.foto_resolutions.entity_arr)										

			// uri recuerdo/paris		
			// arr - ini -- Valores iniciales sin filtrar
					
			if 	(
				qry.exist_in_array(			this.arr['ini'] , 'recuerdo' 	) ||
				qry.exist_in_array(			this.arr['ini'] , 'seleccion' 	)
				)
				{
				// this.p('Hay recuerdos o selecciones ')
				// Tipo 1 de momento
				hay_recuerdos 	= true								

				}
			// En cica resolutions only for images
			if 	(
				qry.exist_in_array(				this.arr['ini'] , 'image' 		) || 
				qry.exist_in_array_resolutions(	this.arr['ini'] , this.foto_resolutions.entity_arr	)  
				)
				{
				// Tipo 1 de momento
				hay_fotos		=	true							
				}
			// B.Query generation

			if ( hay_recuerdos && hay_fotos )
			{
				// this.p('Processing all ')

				this.process_path() 	
				this.process_fotopath() 	
				// Llamarlos con un OR por defecto
			}
			else if ( hay_recuerdos )
			{
				// this.p('Processing recuerdos ')
				// Pasamos el array y lo perdemos ( espera una query)
				var passed_arr_q = this.arr['qrys']

				this.process_path()

				// this.p('End Processing recuerdos ')
				// this.parr(this.arr['qrys'])

				// Generate and sort array	
			}
			else if ( hay_fotos		)
			{

				this.process_fotopath()
			}	
			else
			{
				// Ni hay recuerdos ni fotos pero pueden ser los dos
				this.process_path()	
				this.process_fotopath()	
			}
 	
	}

	// ------------------------- PROCESS FOTOPATH ----------------------------------
	process_fotopath(q = '')
	{
		this.m						=	'process_fotopath' 

		// this.p('Before Process FotoPath Generate Array')				

		this.process_fotopath_generate_array(q)						
		
		this.process_path_sort_array()								
	}

	// ------------------------- PROCESS FOTOPATH_GENERATE_ARRAY ----------------------------------
	process_fotopath_generate_array(q = '' )
	{
		this.m						=	'process_fotopath_generate_array' 

		if (empty(q))
			q = this.arr['fotoqrys']

		// q es el array de queries a devolver

		// Process path con objetos para generar el array de queries
        this.args_arr       		=   this.url_path.split('/')			
		
		var arr_letters 		  	=   Array()								 // Repeat array for letters
	
		let pos	=	-1 													

		let cont = 0  
		// foreach (this.args_arr as arg)
		for (var arg of Object.values(this.args_arr)) 
		{

			if (!empty(arg) )
			{
				let no_repeat 				= true	 // Necesario para comprobar es el elemento esta o no repetido  

				let arg_lang 				= arg 	 // Pasamos otra variable para que devuelva el parametro en el idioma convertido

				let status 					=	false 				
//				echo "Param: " + arg + this.lf 								

				if (arg.length <= 3) 
				{
				// QUERY_LETTER - query especial para letras

						status = this.foto_resolutions.query_letter(arg, q , arr_letters , pos , arg_lang, no_repeat)			
					if (status == false) 
						status = this.foto_years.query_letter(		arg, q , arr_letters ,pos , arg_lang, no_repeat)			
					if (status == false) 
						status = this.foto_codes.query_letter(		arg, q , arr_letters ,pos , arg_lang, no_repeat)			
					if (status == false) 
						status = this.foto_nature.query_letter(		arg, q , arr_letters ,pos , arg_lang, no_repeat)			
					if (status == false) 
						status = this.foto_sendas.query_letter(		arg, q , arr_letters ,pos , arg_lang, no_repeat)			
					if (status == false) 
						status = this.foto_cities.query_letter(		arg, q , arr_letters ,pos , arg_lang, no_repeat)						
					if (status == false) 
						status = this.foto_countries.query_letter(	arg, q , arr_letters , pos , arg_lang , no_repeat)			
					if (status == false) 
						status = this.foto_places.query_letter(		arg, q , arr_letters ,pos , arg_lang, no_repeat)			
					if (status == false)
					{
						this.incorrect_parms	= "true"				
					}
					else 
					{
						if (no_repeat)		
						{
							var str_aux = new url.replace( arg_lang , "/\r|\n/"  , ""	)
							this.arr['arg'].push( 	str_aux.result	)
						}
					}
				}
				else 
				{
				// QUERY_NORMAL - query especial para letras
							status 		= this.foto_resolutions.query(	arg, q , pos , arg_lang, no_repeat ,' foto_resulution')			
						 	pos			= this.foto_resolutions.pos
						 	arg_lang 	= this.foto_resolutions.arg_lang
							no_repeat  	= this.foto_resolutions.no_repeat 		
					if (status == false) 
					{
							status 		= this.foto_years.query(			arg, q , pos , arg_lang, no_repeat ,' foto_years')			
							pos			= this.cities.pos
							arg_lang 	= this.cities.arg_lang
							no_repeat  	= this.cities.no_repeat
					} 		
					if (status == false)
					{ 
							status 		= this.foto_codes.query(			arg, q , pos , arg_lang, no_repeat ,' foto_codes')			
							pos			= this.cities.pos
							arg_lang 	= this.cities.arg_lang
							no_repeat  	= this.cities.no_repeat
					} 		
					if (status == false)
					{ 
							status 		= this.foto_sendas.query(		arg, q , pos , arg_lang, no_repeat ,' foto_sendas')			
							pos			= this.cities.pos
							arg_lang 	= this.cities.arg_lang
							no_repeat  	= this.cities.no_repeat
					} 		
					if (status == false)
					{ 
						status 			= this.foto_nature.query(		arg, q , pos , arg_lang, no_repeat ,' foto_nature')			
						pos				= this.cities.pos
						arg_lang 		= this.cities.arg_lang
						no_repeat  		= this.cities.no_repeat
					} 		
					if (status == false)
					{ 
						status 			= this.foto_countries.query(		arg, q , pos , arg_lang , no_repeat ,' foto_countries')			
						pos				= this.cities.pos
						arg_lang 		= this.cities.arg_lang
						no_repeat  		= this.cities.no_repeat
					} 		
					if (status == false)
					{ 
						status 			= this.foto_cities.query(		arg, q , pos , arg_lang, no_repeat ,' foto_cities')						
						pos				= this.cities.pos
						arg_lang 		= this.cities.arg_lang
						no_repeat  		= this.cities.no_repeat
					} 		
					if (status == false)
					{ 
						status 			= this.foto_places.query(		arg, q , pos , arg_lang, no_repeat ,' foto_places')
						pos				= this.cities.pos
						arg_lang 		= this.cities.arg_lang
						no_repeat  		= this.cities.no_repeat 		
					}				
					if (status == false)
					{
//						echo "Incorrecto - " + arg + this.lf														
						// Activamos el flag de parametros incorrectos
						this.incorrect_parms	= "true"				
					}
					else 
					{
						// que pasa si se busca algo ya repetido
						if (no_repeat)		
						{
							var str_aux = new url.replace( arg_lang , "/\r|\n/" ,  ""	)
							this.arr['arg'].push( 	str_aux.result	)
						}
					}
				} // ENd query Normal
			} // ENd If arg
		} // ENd Foreach
		
	}

}

exports.foto_search 			= foto_search

