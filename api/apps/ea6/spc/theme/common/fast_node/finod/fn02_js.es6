// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Finod File Structure Class  [V.0.1.8]  (2016-12-27)
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

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const 	{ anode } 			= require(	cons.JS_BASE + 'com/objects/drupal/anode/an0/an01_obj.es6'							);



// Para poder extender debe haberse incluido antes
class fn02_js_structure extends anode {


    constructor (u 												,
				 ftype 			= 	'jsfile'					)
	{

		super()
		this.n			= 	'fn01_file_structure::'						
	
    
    	this.type								=	'jsfile_structure'					 // Type for structures
		this.short_type						=	'JSFS'						
    	    				
    	this.ftype							=	'jsfile'								 // Type for structures			
    			
		this.ptype							=	'human'								 // Page type human bots			
		this.type_name						=	this.type 													

		this.u								=	u									
		
		this.b						= 	new cbool()

		this.u 				=	u 													
		this.s 				=	this.u.s 										
		this.c 				=	this.u.c 										
				
		
		this.b.copy (this.s.b)													
		

		this.b.type_human					= 	true 										 // if is dat file never will be erased on disk
		this.b.type_common					=	true			
		this.b.type_have_taxonomy			=	false 			
		this.b.type_have_code				=	true			
//		this.node_have_ascii_code				=	true			

		this.b.type_have_properties			=	true			
		this.b.type_have_specific_properties	=	true			
		
		
		
		// search/human/cica_search
		this.change							=	'/' + this.type  + '/' + this.ftype  + '/'		

   		this.suffix							= 	'common_type' + '.jscontent'								
   		this.suffix_disk 						= 	this.suffix													

   		this.suffix_code 						= 	'common_type' + '_code' + '.jscode'													


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()															


 		// /brqx/pers/drupal/v50/fnode/truck/jsfile_structure/jsfile/common_type.jscontent
		// this.p('JS_FILE-Path ' + this.load_from_disk_path)									

		
		if (this.s.load == 'drupal')
		{
			//fnode - Fast node load
			this.run_from_drupal()						
		}
		else 
		{
			//fdisk - Fast disk load
			// this.p('001_deb')								
			this.run_from_disk()							
		}
		// this.p('02_JS_CODE-Path ' + this.ram_alias_code_path)									
		
		// /ram/home/ser/zd/main/es/zdom/emp/truck/zd_main_truck/es/cache/ssl/truck.dbrqx.com/anonymous/truck/jsfile_structure/jsfile/human/common/common_type_code.jscode
		
	}
	

    get_child_properties(prop, value) {   
	// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	// Luego cada tipo tendra un ajuste como este	

	            if 	   ( prop 		== "s_num_files"		)		this.num_files							=	value			

    }

	run_child_action()
	{

		// this.p('Before get file in run')													
					
		this.current_file_to_use		=	this.load_from_disk_path					
		
		if (this.b.site_multilang)
			this.current_file_to_use 	= 	this.load_from_disk_lang							
					
										
		js_content = file_get_contents(this.current_file_to_use, true ) // READ_FILE
	
		js_content += "drift.load('" + this.s.drift_code + "')" 
		
		this.code = '<script>' + js_content + '</script>' 													
		
		
		
	}
	

	load_child_details()
	{
		// RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD
		// Con el nuevo reload_type entra sin drupal tambien

//		this.p('Before get file')													
					
	}

	prepare_specific_child_properties()
	{
		// Pendiente
		this.arr['properties'].push( 			"f_num_files" 		 + this.sep  + this.num_files	)			

	}

  
}

exports.fn02_js_structure = fn02_js_structure