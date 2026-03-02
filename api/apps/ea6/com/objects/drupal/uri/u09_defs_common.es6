// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Uri Definition Common Class  [V.0.2.0]  (2017-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON_EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"		);

const 	{ strings } 		= 	require(	cons.JS_BASE + 'com/objects/drupal/strings/s01_strings.es6'	);

class uri_defs_common extends strings {


	constructor()
	{
		super()
		this.n 							= 	'uri_defs_common::'				

	// Objects
	
		this.b							= 	''							// Boolean object
		this.s							=	''							// Site object
	
		this.c							=	''							// Cache object

		this.ir							=	''							// Index Request

		this.sch						=	''							// Html scheme for Mongo

		this.dnode						=	''							// Delete node object

		this.cat						=	''							// Categories object
		this.cot						=	''							// Contents object

		// Multi domain - fast parallel load structure
		// En Javascript hay que declarar todos los que vayamos a usar
		this.arr					=	Array()
		this.arr['url']				=	Array()					
			
		this.domain					=	''						 // Domain with dots
		this.domainbar				=	''						 // Domain with dots

		this.dash_domain			=	''						 // Clean domain with slash
		this.http_domain			=	''						 // Clean domain with slash
		this.http_domainbar			=	''						 // Clean domain with slash
		
		this.port					= 	''						 // Server port

		this.server_protocol		=	''						 // For HTTPS - SSL will be HTTP/2
	
		this.ssl_page				=	'nnn'					 // By default is not ssl

	// M E T H O D  T O   L O A D		
				
	// Pagination - Search
		this.beg_pg					=	''						 // Beggining pagination
		this.end_pg					=	''						 // End pagination - Page size

		this.zero_pg				=  0						 // Asumimos 0 como inicio de las busquedas
		this.full_pg				=  100000					 // Asumimos 100000 como numero maximo de resultados en una busqueda
			
	
		this.drupal_node_url		=	''						
		this.drupal_user_uid		=	0						 // By default anonnymous

		this.drupal_real_uri		=	''						 

	// esta propiedad creo que no es de la url
		this.user_type				=	'anonymous'				
		
	
		this.sep					=	'@'						
	
		this.page_type				=	'public'				 // Paginas pueden ser publicas o privadas
	
	// Intelligent URI

		this.page_command			=	'n'						 // command for page (No command by default)
		this.page_args				=	''						 // passed args
		this.page_iargs				=	''						 // sorted intelligent args

		this.page_name				=	'blanc'					 // command for page args
		
	// Cadena UNICA que refleja la pagina a cargar. Debe ser unica por lo que puede ser un indice de mongo db
		this.page_string			=	''

		this.url_parameter_type		=	'simple'					

		this.url_method				=	''					
		this.search_method			=	''					
					
	// Public Start time
	
		this.start_time				=	''					  	 // start page loading
		this.stop_time				=	''					  	 // end page loading

		this.total_time				=	''					  	 // total time page loading

	}
  
}

exports.uri_defs_common = uri_defs_common