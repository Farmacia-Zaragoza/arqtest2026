// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Solr Main Class  [V.0.0.1]  (2017-01-02)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Search Multi Lang structure 
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-solr-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-generate_query-
// + d-run_query-
// - d-ping-   	  :  
// - d-run-       		:
  
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	Solr 				= require(	'/brqx/base/react/zcommon/node_modules/solr-node'								),
		echo 				= require(	'/brqx/base/react/zcommon/node_modules/node-echo'								),
		qry 				= require(	'/brqx/base/rcode/es6/com/libs/search/solr/queries.es6'							),						
		const { foto_search } 	= require(	'/brqx/base/rcode/es6/com/objects/search/solr/foto_search.es6'					);

class solr extends foto_search {

    constructor (		uri_to_process		=	''								,
						solr_path			=	'cica_dbrqx_com'			)
    {   

		super(uri_to_process)																	
		// foto_search::Generate foto entities

		this.n								= 	'solr::'
		this.m								=	'constructor'								

	// Results object
		this.res							=	''												
		this.foto_res						=	''													

	// Strings
	
	
	// Search properties
	
		this.query							=	''						
		this.query_or						=	''							// Query search all term pased
		
		this.query_sorted					=	''							// Used for cache
		this.query_sorted_lang				=	''							// Used for cache
		
		this.incorrect_parms				= 	"false"					 	// Flag de parametros incorrectos
		this.search_mode					=	'estrict'					// Modo de busqueda e interpretacion de parametros estricto

            

		this.solr_path						=	solr_path													


		this.solr			= 	new Solr({
									host: 'dbrqx.com'		, 
//									host: 'localhost'		, 
									port: '9983'			, 
									core: this.solr_path    ,
									protocol: 'http'
									})		
		
		//this.p('Before to process')															
		// fotosearch::process - 

		// Call to process
		if (uri_to_process != '' )	this.process(uri_to_process)
		//this.p('After to process')															
			
    }

	// ------------------------- GENERATE_QUERY ----------------------------------
	generate_query(method = 'OR')
	{
		this.m										=	'generate_query' 

		var odom 									= 	''
		// Solo necesita el array de queries

		// this.p('ARRRAY_QUERIES')
		// this.parr(this.arr['qrys'])

		odom = new qry.generate_query(	this.arr['qrys'] 							, 
						this.query									,
						'AND'										)

		this.query = odom.result

		odom = new qry.generate_query(	this.arr['fotoqrys'] 						, 
						this.foto_query								,
						'AND'										)

		this.foto_query = odom.result

		odom = new qry.generate_query(	this.arr['qrys'] 							, 
						this.query_or								,
						'OR'										)

		this.query_or = odom.result

		// this.p("Params incorrect status : "  + this.incorrect_parms		) 
		// this.p("Uri: " + this.url_path )		
		// this.p("Query Sorte Lang: " + this.query_sorted )				
		// this.p("Query ___ : " + this.query )
		// this.p("--------------------------------------------------------")				
		// this.p("Foto Query: " + this.foto_query)				
		
		//this.run(this.foto_query)
	}
	
	// ------------------------- PING ----------------------------------
	ping()
	{	
		if (!this.solr.ping()) {
    		exit('Solr service not responding.')
		}

	}

	// solr.addDocuments(
	// addDocument

	// ------------------------- RUN ----------------------------------
	run(	offset = 	0 			, 
			limit 	= 	5			)
	{
		if (offset == '') 	offset = 0  
		if (limit  == '') 	limit = 10  

		

		this.run_query( this.query		, this.res		, offset , limit)	 // Run query in res object
		this.run_query( this.foto_query	, this.foto_res	, offset , limit)	 // Run query in foto_res object
		
	}							
							
	// ------------------------- RUN_QUERY ----------------------------------
	run_query(					query 		= 	''			,
								res			=	''			, 
								offset 		= 	0 			, 
								limit 		= 	5			)			
	{
		// Prepara y ejecuta una query con and como parametro
		
		this.p('Q:' + query + ':--')

		var strQuery = this.solr.query().q(query)

		// how does he response look like?


		var res = this.solr.search(strQuery, function (err, result) 
		{
		   if (err) {      console.log(err); 		      return; 		   }
		   	// console.log('Response:', result.response);
		   console.log('Num Internal ' + result.response.numFound )	
		   global.num_found = result.response.numFound		   	

		   let ext = result.response.numFound
		   
		   return ext
		   // global.res = result		   	
		})		

		// this.res	=	global.res
		this.p("Num External " + res )   
				
//		if ( res.getHttpStatus() == 200 ) {
		      // print_r( response.getRawResponse() )
		
//		  if ( res.response.numFound > 0 ) 
//		  {
		
//		        foreach ( res.response.docs as doc ) 
//		        {
				  //"path": "node/3543"
//		          path_alias 	= doc.path_alias		 // Uri
//				  id			= doc.id				 // 52qkyg/node/36539
//				  path			= doc.path			 // node/36539

				  // node/36539@imagenes/personal/2008/francia/brqx_def08par/1024x0768/paris_36539
//		          echo path .'@' + path_alias +  this.lf
				  
//		        }
		
//		      }
//		    }
//		    else {
//		      echo res.getHttpStatusMessage()
//		    }
	}

}

exports.solr		=	solr


// var so = new solr('madrid')
//so.run()




