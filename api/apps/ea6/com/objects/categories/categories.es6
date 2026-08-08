// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Html Div Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Categories Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ full_entities_search } 	= require(	'/brqx/base/rcode/es6/com/objects/search/solr/full_entities_search.es6'				);
		const { contents } = require(	'/brqx/base/rcode/es6/com/objects/categories/contents.es6'							);

class categories {

	constructor()
	{
		this.n						=	'cat::'					

   		// PATH ZONE
   		this.path					=	''								
	
		this.path_arr 				=	Array() 				

		// Array ZONE

		this.arr_qrys 				= 	Array()						// Solr Queries Array

	// Multi lang Array
		this.langs_arr				=	Array()							

		// Files to use - Paths
		this.base_structure_path			=	'/brqz/zzinfo/fotos/entity/'	

		this.img_structure_path			=	'/brqx/lnk/responsive_img/'		
		this.uri_structure_path			=	'responsive_img/'		
	
		this.img_categories_default		=	'default.svg'					
	
		this.structure_path_arr			=	Array()							
		
		// Files
		
		this.drupal_entities		=	''												
		
		this.ext					=	'.svg'					
		
		this.sep					=	'@'						
		
		this.lf						=	':</br>'				
		this.lr						=	"\n\r" 					
            
		// 
		this.q							= ''									 // query for solr
		
		this.c							=	 new full_entities_search()							

		this.categories_default_file	=  	this.uri_structure_path +  this.img_categories_default		
	
    }

	process_cat(path)
	{
		// Estoy viendo si es necesario ahora. Sin duda será para toda la pagina

		// Last file	
		let file_base_path	=	path.basename(path) 											
		let dir_path		=		path.dirname(path) 												

		// Second last file - penultimo
		let last_folder_base2_path	=	path.basename(dir_path) 											

		full_path_base = this.img_structure_path + dir_path  	
		uri_path_base  = this.uri_structure_path + dir_path		 

		full_path_file 	= full_path_base + '/' + last_folder_base2_path + '_' + file_base_path + this.ext	  
		full_path_default 	= full_path_base + '/' + last_folder_base2_path + '_default' + this.ext 	  

		uri_path_file 		= uri_path_base + '/' + last_folder_base2_path + '_' + file_base_path + this.ext	  
		uri_path_default 	= uri_path_base + '/' + last_folder_base2_path + '_default' + this.ext 	  

//		print this.n + 'File ' 	. full_path_file +  this.lf 						
//		print this.n + 'Default ' + full_path_default +  this.lf 						

		if ( fs.existsSync(full_path_file) &&   fs.lstatSync(full_path_file).isFile() ) 
			return uri_path_file					
		else if ( fs.existsSync(full_path_file) &&   fs.lstatSync(full_path_file).isFile() ) 
			return uri_path_default				 
		else
			return this.categories_default_file	
				
		//Target :: /brqx/lnk/responsive_img/categories/year/year_default.svg

		//cat::Query pasadacategorias/pais/brasil/taxonomyterm1740:
		//cat::Query pasadacategorias/codigo/brqx_azu11bra:

	}  
}

exports.categories = categories