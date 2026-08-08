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


const 	{ anode } 			= require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'))

class fn01_file_structure extends anode {


    constructor (u 											,
				 base_folder_path	=	'/ssd/myr/2048x1536/'	,
				 num_max_files		=	1000					,
				 num_max_folders	=	100						,
				 ftype 			= 	'file'					)
	{

		super()
		this.n			= 	'fn01_file_structure::'

    	this.type								=	'file_structure'					 // Type for structures
		this.short_type						=	'FSN'

    	this.ftype							=	'file'								 // Type for structures

		this.ptype							=	'human'								 // Page type human bots
		this.type_name						=	this.type

		this.u								=	u

		this.b								= 	new cbool()

		this.u 								=	u
		this.s				 				=	this.u.s
		this.c 								=	this.u.c


		this.b.copy (this.s.b)

//		this.base_folder_path					=	base_folder_path
		this.max_files						=	num_max_files
		this.max_folders						=	num_max_folders


		this.b.type_common					=	true
		this.b.type_have_taxonomy				=	false
		this.b.type_have_code					=	false

		this.b.type_have_properties				=	true
		this.b.type_have_specific_properties	=	true



		// search/human/cica_search
		this.change							=	'/' + this.type  + '/' + this.ftype  + '/'

   		this.suffix							= 	this.u.dash_ideal_uri + '.str'
   		this.suffix_disk 						= 	this.suffix

   		this.suffix_code 						= 	this.u.dash_ideal_uri + '_code' + '.svg'


		// Method for disk load && to generate && save content
		this.generate_load_from_disk_path()

		//Setting array types for content type
		// IDEal elements - FILes FOLders - FIle Structure - FOlder Structure
		let arrays_line = 'ide fil fol fis fos'
		this.arr['types'] =  arrays_line.split (' ')

		// /brqx/pers/drupal/v50/fnode/peloncita/search/human/cica_search/common_search_madrid
		// this.p('01 - Before Load1 ' + ' Path ' + this.load_from_disk_path)


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
		// this.p('02 - After Load1 '  + ' Path ' + this.ram_alias_path)
		// /ram/../anonymous/peloncita/file_structure/human/file/human/a/common/common_image_la_estructura
		// ... /peloncita/file_structure/file/human/a/common/image_2013_lagos_portugal.str

	}


    get_child_properties(prop, value) {
	// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	// Luego cada tipo tendra un ajuste como este

	            if 	   ( prop 		== "s_num_files"		)		this.num_files							=	value
				else if ( prop 		== "f_num_files" 		)		this.num_files							=	value
				else if ( prop 		== "f_max_files"		)		this.max_files							=	value
				else if ( prop 		== "f_num_folders"		)		this.num_folders							=	value
				else if ( prop 		== "f_max_folders"		)		this.max_folders							=	value
				else if ( prop 		== "f_sub_query_real"	)		this.u.real_sub_query					=	value

    }


	load_child_details()
	{
		// RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD
		// Con el nuevo reload_type entra sin drupal tambien

		// Super funcion de carga inteligente- Analiza uris y gestiona repetidos y orden
		this.intelligent_url_load_any_pos()
		// 2013/Lisboa/portugal

		// this.p('Path ' + this.path)

		// Necesitamos una funcion de path adaptation
		// 2013/portugal/lisboa ==> 2013/Portugal/b02_Lisboa

		this.path_pointer		=	'photos/2048x1536'

		this.generate_one_level_directory()

	}

	prepare_specific_child_properties()
	{
		this.arr['properties'].push( 			"f_num_files" 		 + this.sep  + this.num_files			)
		this.arr['properties'].push( 			"f_max_files"		 + this.sep  + this.max_files			)
		this.arr['properties'].push( 			"f_num_folders"		 + this.sep  + this.num_folders			)
		this.arr['properties'].push( 			"f_max_folders"		 + this.sep  + this.max_folders			)

		// Real disk structure
		this.arr['properties'].push( 			"f_sub_query_real"	 + this.sep  + this.u.real_sub_query	)

	}


}

exports.fn01_file_structure = fn01_file_structure
