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
// - build_data   	  : Build html final code for object 
// - build_node       : Load all drupal node details 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//require_once 'sites/all/modules/base/bas/a/apachesolr/SolrPhpClient/Apache/Solr/Service.php'

class parques_search extends search_structure {

	constructor(path	=	'')

		super()
	
		// Same for all languages	
		this.codes_file					=	'codes.dat' 					
		this.resolutions_file				=	'resolutions.dat' 				
		this.years_file					=	'years.dat' 					
		this.dates_file					=	'dates.dat' 					
	
		// Possible Different for all languages	
	
		this.cities_file					=	'cities.dat' 				
		this.countries_file				=	'countries.dat' 			
		this.places_file					=	'places.dat' 					
		this.circunstances_file			=	'circunstances.dat' 		
		this.nature_file					=	'nature.dat' 				
		this.constructions_file			=	'constructions.dat' 				
		this.delight_file					=	'delight.dat' 				
	
		this.sendas_file					=	'sendas.dat' 				
		this.entities_file				=	'entities.dat' 				
		this.letters_file					=	'letters.dat'				
		
		this.url_path						=	'portugal/lisboa/recuerdo/1024/waterfall/bridge/2007/070101/escapada/l/mos08bos/portugal/cascada/l/l'	


		// Entity no lang
		this.places 			= new search_entity('es'	,this.places_file			, 	'sm_vid_Lugar'	,
									this.langs_arr, this.structure_path_arr )

		this.letters 			= new search_entity_letter('es'	,this.letters_file	, 	'sm_vid_Letra'	,
									this.langs_arr, this.structure_path_arr )

		this.countries 		= new search_entity('lang'	,this.countries_file		, 	'sm_vid_Pais'		,
									this.langs_arr, this.structure_path_arr )

		this.cities 			= new search_entity('es'	,this.cities_file			, 	'sm_vid_Ciudad'		,
									this.langs_arr, this.structure_path_arr )

		this.codes 			= new search_entity('es'	,this.codes_file			, 	'sm_vid_Code'			,
									this.langs_arr, this.structure_path_arr )

		this.circunstances 	= new search_entity('es'	,this.circunstances_file	, 	'sm_vid_Circunstancia'	,
									this.langs_arr, this.structure_path_arr )

		this.constructions 	= new search_entity('lang'	,this.constructions_file	, 	'sm_vid_Construccion',
									this.langs_arr, this.structure_path_arr )

		this.nature 			= new search_entity('lang'	,this.nature_file			, 	'sm_vid_Naturaleza',
									this.langs_arr, this.structure_path_arr )

		this.entities 		= new search_entity('es'	,this.entities_file		, 	'sm_vid_Entity',
									this.langs_arr, this.structure_path_arr )

		this.sendas 			= new search_entity('es'	,this.sendas_file			, 	'sm_vid_Senda',
									this.langs_arr, this.structure_path_arr )

		this.years 			= new search_entity('es'	,this.years_file			, 	'sm_vid_Date',
									this.langs_arr, this.structure_path_arr )

		this.dates 			= new search_entity('es'	,this.dates_file			, 	'sm_vid_Fecha',
									this.langs_arr, this.structure_path_arr )

		this.delight 			= new search_entity('es'	,this.delight_file		, 	'sm_vid_Encanto',
									this.langs_arr, this.structure_path_arr )

		this.resolutions 		= new search_entity('es'	,this.resolutions_file	, 	'sm_vid_FotoResolucion',
									this.langs_arr, this.structure_path_arr )


		this.process_path() 											

		// Hemos procesado. Los parametros pueden ser incorrectos pero la query esta formada
		// En una busqueda estricta en este caso no deberiamos hacer nada
		// Luego tenemos tambien query or generada. 
		// A su vez el array deberia estar ordenado y estar generada la cadena de busqueda 

		this.generate_query() 												
			
    }

	process_entities()
	{
		// Debemos saber que tipo de busqueda quiere el usuario
		// 1. Recuerdos y selecciones
		// 2. Fotos
		// 3. Fast images or fast photo
		// 4. Todo

			if 	(
				exist_in_array(this.args_arr , 'recuerdo' ) ||
				this.exist_in_array(this.args_arr , 'seleccion' )
				)
				// Tipo 1 de momento
				hay_recuerdos 	= true								

			if 	(
				exist_in_array(this.args_arr , 'image' ) || 
				exist_in_array_resolutions(this.args_arr , this.resolutions_arr)  
				)
				// Tipo 1 de momento
				hay_fotos		=	true							

			if ( hay_recuerdos && hay_fotos )
			{
				this.process_path() 									
				this.process_fotopath() 								
				// Llamarlos con un OR por defecto
			}
			else if ( hay_recuerdos )
				this.process_path() 									
			else if ( hay_fotos		)
				this.process_fotopath() 								
			else
			{
				// Ni hay recuerdos ni fotos pero pueden ser los dos
				this.process_path() 									
				this.process_fotopath() 								
			}	
	}

	process_path()
	{
		// Process path con objetos para generar el array de queries
        this.args_arr       =   this.url_path.split("/")			
		
		let args_arr_to_cache	  =	  Array()								
		let arr_letters 		  =   Array()								 // Repeat array for letters
	
		pos	=	-1 													
		

		let cont = 0  
		// foreach (this.args_arr as arg)
		for (var arg of Object.values(this.args)) 
		{

			if (arg != '')
			{
				let no_repeat 				= true	 // Necesario para comprobar es el elemento esta o no repetido  

				arg_lang 				= arg 	 // Pasamos otra variable para que devuelva el parametro en el idioma convertido
				
//				echo "Param: " + arg + this.lf 								

				if (strlen(arg) == 1) 
				{
					// query especial para letras
					status 				= 
						this.letters.query_letter(arg, this.arr['qrys'] , arr_letters , pos , arg_lang , no_repeat)		

					// En este caso es muy complejo comprobarlo pues la probabilidad de que se repita una letra es altisima
					// queda pendiente de implementar
					
					if (no_repeat)		
							args_arr_to_cache.push	( arg_lang.replace( "/\r|\n/" )	)		
					
				}
				else 
				{
					status = this.countries.query(	arg, this.arr['qrys'] , pos , arg_lang , no_repeat)			
					if (status == false) status = this.resolutions.query(	arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.entities.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.years.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.dates.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.circunstances.query(arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.constructions.query(arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.nature.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.codes.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.sendas.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.delight.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
					if (status == false) status = this.cities.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)						
					if (status == false) status = this.places.query(		arg, this.arr['qrys'] , pos , arg_lang, no_repeat)			
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
							args_arr_to_cache.push	( arg_lang.replace( "/\r|\n/" )	)		
					}
				}
			}
		}

		args_arr_to_cache.sort()				 // sort is a procedure - sort array		

		correct_elem_str='' // Cadena correcta de posiciones y elementos pasados
		// es lo mismo spain/madrid que madrid/spain

		arr_size = args_arr_to_cache.length

		//foreach (args_arr_to_cache as elem)
		for (var elem of Object.values(args_arr_to_cache)) 
		{
			// Generamos terminos nXX@madrid_
			// correct_cont		= 	str_pad(cont, 2, "0", STR_PAD_LEFT) // contador de dos posiciones

			correct_cont		= 	pad(cont, 2, "0", STR_PAD_LEFT) // contador de dos posiciones
			correct_elem_str 	+= 'n' + correct_cont + '@' + elem   
	
			if (cont < arr_size) correct_elem_str +=  '_'

			cont++
		}

		this.query_sorted	= correct_elem_str	


	}


	process_fotopath()
	{
		// Arr sort sort(arr)
		
        this.args_arr       =   explode("/", this.url_path)
		
		
	}


}

exports.parques_search 		= parques_search