// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Page Node FastClass  [V.0.0.1]  (2017-07-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Checked themes
//-------------------------------------------------------------------------------------
// - Responcita (pending)
// - Garsintife (postponed)
// - 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"							);

const 	{ anode } 			= require(	cons.JS_BASE + 'com/objects/drupal/anode/an0/an01_obj.es6'								),
		{ cbool } 			= require(	cons.JS_BASE + 'com/objects/drupal/bool/b01_bool.es6'									),					
		creff 				= require( 	cons.JS_BASE + 'com/libs/file/full_path/level_02/create_full_filename.es6'				),
		scpf 				= require( 	cons.JS_BASE + 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'		),
		fs 					= require(	'fs'																					),
		StreamZip 			= require(	cons.NODE_MOD +  'node-stream-zip'									),
		empty 				= require(	cons.NODE_MOD +  'is_empty'										);


// Para poder extender debe haberse incluido antes
class pn02_fast extends anode {

    constructor (	u							= 	''			, 	// Url object
					stype						=	'page')  
    {   

		super()
		this.n									=	'pn02_fast::'			
		this.m									=	'constructor'			

		this.start_time							=   global.GLOBALS['start_time']		 

		this.u 									=	u 													
		
		this.s 									=	this.u.s								 // site
		this.c 									=	this.u.c 										
		
		this.b									=	new cbool()								
		this.b.copy(this.s.b )												 // boolean

		this.type								=	'page'					 // Page type human bots
		this.short_type							=	'FPC' 						
					
		this.ptype								=	'human'						 // Page type human bots
		this.stype 								=	stype 						 // Subtype
		
		this.type_name							=	this.stype 							

		// Esto esta pendiente
		this.b.type_cache						=	true					
		this.b.type_generated					=	false						// No se copia de momento

		this.b.type_user						=	false					
		this.b.type_common						=	false					
		this.b.type_url							= 	true 					 // 
		this.b.type_translation					= 	false					
		this.b.type_translated					= 	true					

		this.b.type_have_taxonomy				=	false 						
		this.b.type_have_code					=	true						
		this.b.type_have_properties				=	false						
		this.b.type_have_specific_properties	=	false						

		this.change_disk		=	'/' + this.type + '/' 										
		this.change			=	'/' + this.type + '/' 										

		let uri_to_use		= 	this.u.slash_ideal_uri			
		
		if (this.u.slash_ideal_uri.substr(0,1) == '/' )		
			uri_to_use = this.u.slash_ideal_uri.substr(1)   
		
		
		this.suffix					=	uri_to_use + '_' + this.stype	+ "_" + this.s.env	+ "_" + this.s.live_opt						
		this.suffix_disk			=	this.suffix													
		this.suffix_lang 			= 	this.suffix + '_' + this.s.slan + "_" + this.s.lang 

   		this.suffix_code 			= 	this.suffix_lang + '.' + this.u.ssl_page + 'page'	
	
		
		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()													

		this.p('pn01_Page_Path ' + this.load_from_disk_path_code)

		this.create_paths()													

		if (this.b.page_download 	== 'yes'  			)
		{
			// A. D O W N L O A D 
			this.run_down()													
		} 
		else
		{
			// this.p('Start_No_download ' + this.c.search)										
			// B. N O   D O W N L O A D
			if ( this.b.page_search 					&&
				 (this.c.search	== 'reload'		) 		)
			{
				// B2. S E A R C H 
				// this.p('Running_Search') 												
				this.b.type_generated	=	true													

				this.run_search()														 											
			}
			else if ( this.b.page_file 						)
			{
				// B3. F I L E   S T R U C T U R E 
				// this.p('Running_file') 												
				this.b.type_generated	=	true													

				this.run_file()														 											
			}
			// Cacheable for all users - anonymous and authenticated		
    		else 
			{
				// B1. F A S T    P A G E    L O A D 
				this.p('Pn02Fast_checking  ' + this.ram_alias_code_path			)
	
				// Vamos a insertar un nuevo nivel de busqueda

				this.current_file_to_use		=	this.ram_alias_code_path					
				
				if (this.b.site_multilang)
					this.current_file_to_use 	= 	this.ram_alias_code_lang							
				
					
		        if ( 	!empty(this.current_file_to_use)				 		&& 
					    fs.existsSync(this.current_file_to_use) 				&&   
		 				fs.lstatSync(this.current_file_to_use).isFile()			&& 
		        	 (	creff.filesize(this.current_file_to_use) > 0	)		)					  
		        {
					// this.p('Pn02Fast_FPC ' + this.current_file_to_use	)

		   		  	this.code = scpf.file_get_code(this.current_file_to_use) // READ_FILE 

					// this.p('Code_length ' + this.code.length)

		   		  	// this.code = scpf.file_get_code(this.current_file_to_use) // READ_FILE 
					// this.code = fs.readFileSync(this.current_file_to_use).toString()

					// Streams
					// var readStream = fs.createReadStream(this.current_file_to_use, 'utf8');
					
					// var data		= ''
					
					// readStream.on('data', function(chunk) {  
					//     data += chunk;
					// })

					// END Streams

		   		  	
		   		  	// this.code = 'FAST2_CODE'												
		   		  	// If comment allways will generate page

					this.b.type_generated	=	true													
		   		  									
		   		}
		   		else
		   		{
					// **********************************************************************************************************
					// OJO: COMO HEMOS PASADO U - DEBEMOS DEVOLVER U - TODO LO QUE NO SEA DEVOLVER U NO SERA EL MISMO PUNTERO
					// **********************************************************************************************************

		   			this.u.b.site_cache		=	false

					this.u.b.type_generated	=	false

					this.u.b.ready_to_load	=	false
		   		}
		   	}
		} // End if Download		
    }

  
}

exports.pn02_fast = pn02_fast