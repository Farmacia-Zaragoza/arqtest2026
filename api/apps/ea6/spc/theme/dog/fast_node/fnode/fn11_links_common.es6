// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Fast Node Links Class  [V.0.1.7]  (2017-05-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_child_properties-  				: Get specific child properties 
// - d-load_child_details-    				: Recover from drupal child properties
// - d-prepare_specific_child_properties- 	: Prepare properties to save in array
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ fnode } 			= require(	'/brqx/base/rcode/es6/com/objects/drupal/node/fnode.es6'						),
		{ cbool }			= require( 	'/brqx/base/rcode/es6/com/objects/drupal/bool/b01_bool.es6'						);

class fn11_links_common extends fnode {

           
    constructor (   u					=	''				, // 02. U object
					page_position		=	''				, // 07. Position id
					stype				=	'flat_links'	) // 08. Node Type  
    {   

		super()
		this.n 							=	'fn11_links_common::'			
		this.page_position				=	page_position 										

		this.u 							=	u 													
		
		this.s							=	this.u.s											
		this.c 							=	this.u.c 										

		this.b							= 	new cbool()
		this.b.copy (this.s.b)													
		

    	this.type						=	'links_common_structure'					 // Type for structures			
		this.short_type					=	'LCKS'						
    	
    	
		// String fnode / node / cica_recuerdo
		this.ftype 						=	'fnode'															// Fast node type
		this.stype 						=	stype															// Node subtype			
		this.type_name					=	this.stype 													
		

		this.b.type_user							=	false										 // Different content if is anonymous
		this.b.type_common							=	true										
		this.b.type_human							= 	true 										 // if is dat file never will be erased on disk
		this.b.type_translation						= 	false										 // Auto translate contents - Hay que revisarlo
		this.b.type_translated						= 	false										 // Different contents for different languages
		this.b.type_ssl								=	true										 // If have urls
		
		
		this.b.type_have_taxonomy					=	false 										
		this.b.type_have_code						=	false										
		this.b.type_have_properties					=	true										
		this.b.type_have_specific_properties		=	true										

		this.b.type_synced							= 	false 										 
	
		// this.p('Sync_servers ' + this.u.sync_server_to + ' F ' + this.u.sync_server_from)

		// Type path adjustment

		// fnode / file_structure
		this.change							=	
						'/' + this.ftype + '/' + this.type + '/' 	

		// LANG_INDEPENDENT - El contenido sera el mismo para cualquier URL o IDIOMA 

		this.suffix				=	'common' + '_' + this.stype					
		this.suffix_disk			=	this.suffix																
		this.suffix_lang			=	this.suffix 																


		// Special Tite : FotoCasa
		// Links information url - title - target - extended TeXt
		let arrays_line = 'url tit tar lines'   
		this.arr['types'] = arrays_line.split(' ') 	 


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()													

		// efile_lines@flat_details
		
		// No tiene codigo - Es un tipo humano
		
		// this.p('0L_Links_Common_LOAD ' + this.load_from_disk_path)								
		//this.p('0L_Links_Common_LANG ' + this.load_from_disk_lang)								
		
		// /brqx/pers/drupal/v50/fnode/flat/fnode/links_structure/common_flat_links


		// this.p('0L_Links_Common_Properties ' + this.arr['properties'].length)								


		if (this.s.load == 'drupal')
		{
			this.run_from_drupal()															
		}
		else 
		{
			this.run_from_disk()
			// create_paths - get_current_properties_from_disk

		}
		// this.p('SSD_Common_Links ' + this.ssd_alias_path			)										

		// this.p('RAM_Common_Links ' + this.ram_alias_path			)										

		
    }

    get_child_properties(prop, value) {   

		// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
		// Pendiente de revisar	

			if ( 	 prop 	== "ntype"					)		this.node_type					=	value			
			else if ( prop 	== "stype"					)		this.stype						=	value			
			else if ( prop 	== "num_links"				)		this.num_links					=	value			
			else if ( prop 	== "cookies_msg_uri"		)		this.cookies_msg_uri			=	value			

    }


	prepare_specific_child_properties()
	{
		this.arr['properties'].push(				"num_links" 		 + this.sep  + this.num_links			)			
		this.arr['properties'].push(				"cookies_msg_uri" 	 + this.sep  + this.cookies_msg_uri		)
		
	}
  
}

exports.fn11_links_common = fn11_links_common