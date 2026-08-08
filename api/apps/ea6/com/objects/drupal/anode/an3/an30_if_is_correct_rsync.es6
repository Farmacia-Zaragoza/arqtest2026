// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Sync Class  [V.0.1.1]  (2017-03-29)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 04]
// *anode_if_is_correct_save_properties > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-if_is_correct_sync_code_to- 				: 	Save properties without check
// - d-if_is_correct_sync_properties_to-		:   Save code without check
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_check_only_if_sync } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an3/an31_check_only_if_sync.es6')))

class anode_if_is_correct_sync extends anode_check_only_if_sync {
            
    constructor()
    {        
		super()
		this.n	=	'anode_sync::'
	}											

	if_is_correct_sync_code_to()
	{
		this.m		= 	'if_is_correct_sync_code_to'				

		//this.p('Before_Out_Rsync_Code ' + this.type )															

		if (this.b.site_sync 	&&
			this.b.type_synced	&&
			this.b.type_human		)
		{
			// true == Existe fichero -- No hay que generarlo
			// true == No hay que generar

			// this.p('Before_In_Rsync_Code ' + this.type )															

			// Se trata de un fichero de propiedades importante para sincronizar
			if ((this.arr['nfo']['generate_disk_code'] )	||
				(this.arr['nfo']['sync_disk_code']	 )	)
			{
				// Rync A <===== B
				// this.p('Sync_CodeFile ' + this.load_from_disk_path_code + ' Server ' + this.u.sync_server_to)  

				this.current_file_to_use		=	this.load_from_disk_path_code					
				
				if (this.b.site_lang)
					this.current_file_to_use 	= this.load_from_disk_lang_code								
								
				sync_full_one_filename(this.current_file_to_use , this.u.sync_server_to)	
			}

		}
		
	}


	if_is_correct_sync_properties_to()
	{
		this.m		= 	'if_is_correct_sync_properties_to'				

		// this.p('Before_Out_Rsync_Properties')															

		if (this.b.site_sync 	&& 
			this.b.type_synced	&&
			this.b.type_human		)
		{
			// true == Existe fichero -- No hay que generarlo
			// true == No hay que generar

			// this.p('Before_In_Rsync_Pro' )															
			// Se trata de un fichero de propiedades importante para sincronizar
			if ((this.arr['nfo']['generate_disk_properties']	) ||
				(this.arr['nfo']['sync_disk_properties']	 	)	)
			{
				// Rync A =====> B
				// this.p('Sync_File_Properties ' + this.load_from_disk_path + ' Server ' + this.u.sync_server_to)  
				this.current_file_to_use		=	this.load_from_disk_path					
				
				if (this.b.site_lang)
					this.current_file_to_use 	= this.load_from_disk_lang								
				
				scp_full_one_filename(this.current_file_to_use 		, this.u.sync_server_to)	
			}

		}
		
	}


	  
}

exports.anode_if_is_correct_sync = anode_if_is_correct_sync