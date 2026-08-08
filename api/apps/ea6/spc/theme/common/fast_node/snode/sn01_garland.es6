// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Pnode Garland Class  [V.0.1.8]  (2016-12-27)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - build_node       : Load all drupal node details 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"							);

const 	{ anode } 			= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6')));

class sn01_garland extends snode {

	// Esto estaria pendiente
    run_from_fnode (	fnode	 								)   // 04.Node Type
   {   
		
		stype					=	'cica_search'												
		// this.fnode			=	fnode 												
		this.u 				=	fnode.u											

		this.b						= 	new bool()

		this.u 				=	u 													
		this.s 				=	this.u.s 										
		this.c 				=	this.u.c 										
				
		
		this.b.copy (this.s.b)													
		
		this.stype 			=	stype												

		this.constructor()																		
    }

    run_from_u	   (u	 									)	// 01. Url Object
    {   

		stype					=	'cica_search'												
		this.u 				=	u											
		
		this.b						= 	new bool()

		this.u 				=	u 													
		this.s 				=	this.u.s 										
		this.c 				=	this.u.c 										
				
		
		this.b.copy (this.s.b)													
		

		this.stype 			=	stype												

		this.constructor()																		
    }


    constructor ()   // 04.Node Type
	{

		super()
		this.n			= 	'sn01_garland::'						

		this.type								=	'search'										 // Page type human bots			
		this.short_type						=	'SEA'						
		
				
		this.ptype							=	'human'											 // Page type human bots			
		this.type_name						=	this.stype 													
		
		
		this.b.type_common					=	true			
		this.b.type_have_taxonomy				=	false 			
		this.b.type_have_code					=	true			

		this.b.type_have_properties				=	true			
		this.b.type_have_specific_properties	=	true			

		this.b.type_have_results				=	true			
		this.b.type_have_foto_results			=	true			
		
		
		// search/human/cica_search
		this.change							=	'/' + this.type  + '/' + this.stype  + '/'		

		// /ram/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/cache/cica.dbrqx.com/
		//  anonymous/peloncita/search/human/cica_search/human/a/common/search_dubrovnik

   		this.suffix 							=  this.u.dash_uri + '.seadata'							

   		this.suffix_disk 						= 	this.suffix													

   		this.suffix_code 						= 	this.u.dash_uri + '_code' + '.sea'													


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()															

		// Results Foto Results Photos Recuerdos Selecciones Codigos
		arrays_line = 'rst frs pho rcd sel cod lug pai arg ini'   
		this.arr['types'] = arrays_line.split(' ') 		 

		
		if (this.s.load == 'drupal')
		{
			//fnode - Fast node load
			this.run_from_drupal()						
		}
		else 
		{
			//fdisk - Fast disk load
			this.run_from_disk()						
		}

		// this.p('01 - After Load1 ' +  ' Path ' + this.ram_alias_path)									
		
	}
	

    get_child_properties(prop, value) {   
	// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	// Luego cada tipo tendra un ajuste como este	

	            if 	   ( prop 		== "s_num_results"		)		this.num							=	value			
				else if ( prop 		== "s_num_foto_results"	)		this.foto_num						=	value			
				else if ( prop 		== "s_query"			)		this.query						=	value			
				else if ( prop 		== "s_foto_query"		)		this.foto_query					=	value			
    }
	

	load_child_details()
	{
		// RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD

		// Lanza la busqueda con la uri indicada (sr - solr)		
		this.sr 					= 	new solr(this.u.uri)
		this.code+= "Query:" + this.sr.query + '<br>'				
		
		// Hemos hecho la busqueda. Ahroa sabemos, por ejemplo cuantos resultados hay
	
		// vamos a obtener todos los resultados ( de recuerdos y fotos)
		this.sr.run(this.u.zero_pg,	this.u.full_pg)
		forcode = ''  

		if ( ( this.num = this.sr.res.response.numFound ) == 0 )
		{
			// No hay resultados. No se hace nada o si.... igual es mejor grabar un fichero vacio para evitar las consultas
			this.code= "No hay Resultados (recuerdos y selecciones):" + this.u.search_method + ' - ' + this.num + '<br>'			
		}
		else
		{
			// Hay resultados Results - Generar fichero
			this.code= "Resultados (recuerdos y selecciones):" + this.num + this.br 		
			// process_results_array(&this.s.res.response.docs , &this.arr['rst'] , &forcode) 
			process_generate_results_array(this.sr.res.response.docs , &this.arr , 'rst') 

			// this.p("Arr Results " + this.arr['rst'].length 	)								

			this.create_entity_arrays_from_search_results()												
			
	  		
	  		//  Habria que procesar arr para sacar los subarrays de cada tipo. Lo podemos hacer por node_id pero va a ser mas lento
			
		}			
		
		this.code+= "Query:" + this.sr.query + '<br>'			
		this.code+= "Uri to save " + this.ram_alias_results_path + '<br>'	 

		if ( ( this.foto_num = this.sr.foto_res.response.numFound ) == 0 )
			this.code+= "No hay Resultados (imagenes):" .this.foto_num + '<br>'			
		else 
		{
			this.code+= "FotoResultados (images):" + this.foto_num + '<br>'			
			// Hay resultados Foto Results - Generar fichero
			process_generate_results_array(this.sr.foto_res.response.docs , this.arr, 'frs') 
		}
//		this.code+= "FotoResultados:(start:" + this.u.beg_pg + " end:" + this.u.end_pg + ")" .this.foto_num + '<br>'			
		this.code+= "FotoQuery:" + this.sr.foto_query + '<br>'			


		this.code+=forcode			

	}
	create_entity_arrays_from_search_results()
	{
		for (var index in this.arr['rst']) 
		{
			var path_alias			=	this.arr['rst'][index] 


		{
			arr_line = path_alias.split("/")	
			type = arr_line[0]  

		switch (type) 
	    {
		    case "recuerdo":
					this.arr['rcd'][index] = path_alias		 break  
		    case "seleccion":
					this.arr['sel'][index] = path_alias		 break  
		    case "codigo":
					this.arr['cod'][index] = path_alias		 break  
		    case "lugar":
					this.arr['lug'][index] = path_alias		 break  
		    case "pais":
					this.arr['pai'][index] = path_alias		 break 
			default:
					this.p('Type ' + type + ' ' + br)		 break 					
		}
		
		
		}	
	}

	prepare_specific_child_properties()
	{
		this.arr['properties'].push( 			"s_num_foto_results" 		 + this.sep  + this.s.foto_res.response.numFound	)					

		this.arr['properties'].push( 			"s_query" 					 + this.sep  + this.s.query							)					
		this.arr['properties'].push( 			"s_foto_query" 				 + this.sep  + this.s.foto_query						)			

		// this.prepare_properties_dmode_recuerdo()																			
	}

  
}

exports.sn01_garland = sn01_garland