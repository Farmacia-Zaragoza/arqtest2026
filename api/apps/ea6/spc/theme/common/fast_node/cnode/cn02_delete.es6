// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.7]  (2016-11-24)
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

const 	{ pcomp } 			= require(path.join(JS_BASE, 'com/objects/drupal/node/pcomp.es6'))


// Para poder extender debe haberse incluido antes
class cn02_delete extends pcomp {


    constructor (	u	 			= 	''				// 01. Url Object
								)
    {
		this.b						= 	new bool()

		this.u 				=	u
		this.s 				=	this.u.s
		this.c 				=	this.u.c


		this.b.copy (this.s.b)


		// ESta parte la tenemos pendiente

   		this.suffix_disk 	= 	this.suffix

   		this.suffix_code 			= 	this.suffix + '_code' + '.nosense'


		if (this.u.user_type != 'anonymous')
		{
	      	parent::constructor('left')					// Delete left

	      	this.delete_compo_paths_zone('right')		// Delete right
		   	this.delete_compo_paths_zone('top')		// Delete top

		   	// Delete folder contents
			// Pero las paginas ya generadas no se sienten afectadas - mal
			// hay que borrar todas las paginas

			delete_folder_content_if_exist(dirname(this.u.ssd_code_path_auth) )
			delete_folder_content_if_exist(dirname(this.u.ssd_code_path_anon) )
			delete_folder_content_if_exist(dirname(this.u.ram_code_path_anon) )
			delete_folder_content_if_exist(dirname(this.u.ram_code_path_auth) )
			delete_folder_content_if_exist(dirname(this.u.ssd_alias_code_path_auth) )
			delete_folder_content_if_exist(dirname(this.u.ssd_alias_code_path_anon) )
			delete_folder_content_if_exist(dirname(this.u.ram_alias_code_path_anon) )
			delete_folder_content_if_exist(dirname(this.u.ram_alias_code_path_auth) )
	   	}
    }


    delete_files_from_ssd_and_ram()
    {
//	  	print 'Pn04_Checking:  ' + 		this.u.user_type + '<br>'

		this.delete_files_from_ssd_and_ram_auth()						 // Remove blocks

	}



    get_current_properties()
    {
//	  	print 'Pn04_Checking:  ' + 		this.u.user_type + '<br>'

		if (this.u.user_type == 'anonymous')
		{
   			this.update_compo_paths_anon()
			this.delete_files_from_ssd_and_ram_anon()						 // Remove blocks
		}
		else
		{
   			this.update_compo_paths_auth()
			this.delete_files_from_ssd_and_ram_auth()						 // Remove blocks
		}
		// Pero las paginas ya generadas no se sienten afectadas - mal
		// hay que borrar todas las paginas
	}



}

exports.cn02_delete = cn02_delete
