// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Search Structure Class [V.0.0.1]  (2017-01-02)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Search Multi Lang structure 
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class : c-search_structure-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-generate_structure_paths-   : Generate paths 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const		{ printlog } 		= require(	'/brqx/base/rcode/es6/com/objects/logs/printlog.es6'						);
			const empty = require(	'/brqx/base/react/zcommon/node_modules/is_empty'							);
			const echo = require(	'/brqx/base/react/zcommon/node_modules/node-echo'							);

class search_structure extends printlog {

    constructor (uri_to_process		=	''				)  
    {   
		super()
		this.n							= 	'search_structure::'								
		this.m							=	'constructor' 

	// Solr Class
		this.solr						=	''									

	// Results object
		this.res						=	''									
		this.foto_res					=	''									

		// Strings
	
		this.solr_path						=	''								 										

		// Enabled langs
		this.langs_str						= 'es:fr:en:it:de:hi:ru:ja' 		

		// Multi lang array
		this.langs_arr						=	Array()							

		// Files to use - Paths
		this.base_structure_path			=	'/brqz/zzinfo/fotos/entity/'	

		this.structure_path_arr				=	Array()

		//es:fr:en:it:de:hi:ru:ja
		this.structure_path_arr['es']		=	Array()
		this.structure_path_arr['fr']		=	Array()
		this.structure_path_arr['en']		=	Array()
		this.structure_path_arr['it']		=	Array()
		this.structure_path_arr['de']		=	Array()
		this.structure_path_arr['hi']		=	Array()
		this.structure_path_arr['ru']		=	Array()
		this.structure_path_arr['ja']		=	Array()

		this.arr							= 	Array()						// Arguments array

		this.arr['ini']						= 	Array()						
		this.arr['qrys']					=	Array()
		this.arr['fotoqrys']				=	Array()

		this.arr['arg']						= 	Array()						

		this.args_arr						= 	Array()						// Arguments array
	
		this.arr_qrys						=	Array()

		// Search properties
		
		this.query							=	''						
	
		// Solr Query
		this.q 								=	''								

		this.sep							=	'@'						
		this.lf								=	"\n\r" 					
		this.br								=	'</br>' 				
		
		if (!empty(uri_to_process) )  this.url_path =uri_to_process 
            
		this.generate_structure_paths()									
    }

	generate_structure_paths()
	{
		this.m										=	'generate_structure_paths' 

		// Generate arrays for langs structure
        // this.langs_arr       =   explode(":", this.langs_str)

		this.langs_arr = this.langs_str.split(":")

		// echo ('Langs ' + this.langs_str + ' - ' + this.langs_arr.length )

		// foreach (this.langs_arr as lang)
		for (let lang of Object.values(this.langs_arr))
		{ 
			// this.p( lang + ' - ' +  this.base_structure_path)
			this.structure_path_arr[lang]	=	this.base_structure_path + lang + '/'	
		}
	}
}

exports.search_structure	=	search_structure

//

