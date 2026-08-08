// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Drupal Class  [V.0.0.1]  (2017-03-31)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 01]
// *anode_get_current_properties_disk > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_get_current_properties_disk-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_current_properties_disk-				: Get properties generated from disk
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_get_current_properties_ssd } 	= require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an06_get_current_properties_ssd.es6'))


class anode_get_current_properties_disk extends anode_get_current_properties_ssd {

	constructor()
	{
        super()
		this.n	=	'anode_get_current_properties_disk::'											
    }
            
	// ------------------------------ GET_CURRENT_PROPERTIES_DISK ------------------------------ 
    get_current_properties_disk() {   

		this.m	= 'get_current_properties_disk'													
		this.n	=	'anode_get_current_properties_disk::'											
		// Get current properties - By the way drupal

		//  /brqx/pers/drupal/v50/fnode/peloncita/cica_image/brqx_azu11bra_pers_-_Brasil_-_Rio_de_Janeiro_-_Pan_de_Azucar_0002574.dat

		// this.p ('BEFORE_dISK_READ ' + this.arr['properties'].length )		
									        
        if ( this.if_exist_properties_disk_reload_contents() ) 
        {
		// IF_STA_01 [ EXIST PROPERTIES ]

			// Load current object properties
			this.load_dat_contents()
			// run_child - prepare_child - save_all
								
        } // End if
        else
		{
			// Igual es multi lenguaje- Habra tipos que se podran traducir y tipos que no una URI no tiene sentido traducirla
			
			if ((this.b.site_lang )  && 
				(this.b.type_translation )		) 
			{
			// IF_STA_02 [ EXIST TRANSLATION ]
			
				// this.p('Multilang_disk_translation ' + this.type +  '  ' + this.short_type +  '  ' + this.u.lang_site)		
				// Debe cargar el fichero normal y generar el nuevo traducido
				this.translate_contents()																
					
				// Intentamos obtenerlo de remoto - Falta revisar esto pues lo hace tanto si es cliente como si no
	
			
				// si no se ha traducido intentamos obtenerlo de forma remota, pero solo si es un nodo cliente y no server
				if (!this.b.contents_translated && this.b.sync)
				{
					// IF_STA_03 [ TRANSLATED ]
					if (this.arr['nfo']['sync_disk_properties'])
					{
						// IF_STA_04 [ SYNCING ]

						// this.p('Syncing - From ' + this.type + '  ' + this.short_type + '  ' + this.u.sync_server_from) 							
						// Se trata de un fichero de propiedades importante para sincronizar
						if (!this.arr['nfo']['generate_disk_properties'])
						{
							// IF_STA_05 [ SYNCING_PROPERTIES ]

							// true == Existe fichero -- No hay que generarlo
							// true == No hay que generar
		
							// this.p('Generating_properties_from ' + this.load_from_disk_path + ' S ' + this.u.sync_server_from)														
							// Rync A <===== B
		
							this.current_file_to_use		=	this.load_from_disk_path					
							
							if (this.b.site_lang)
								this.current_file_to_use 	= this.load_from_disk_lang								
							
							sync_full_one_filename_to_origin(this.this.current_file_to_use , this.u.sync_server_from)	
	
							// IF_END_05 [ SYNCING_PROPERTIES ]
						}
		
						if (!this.arr['nfo']['generate_disk_code'])
						{
							// Rync A <===== B
		
							this.current_file_to_use		=	this.load_from_disk_path_code					
							
							if (this.b.site_lang)
								this.current_file_to_use 	= this.load_from_disk_lang_code								
							
							sync_full_one_filename_to_origin(this.current_file_to_use , this.u.sync_server_from)	
						}
		
					} 	// IF_END_04 [ SYNCING ]
					
				}  	// IF_END_03 [ TRANSLATED ]	

			}	// IF_END_02 [ EXIST TRANSLATION ]


			// /ram/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/cache/cica.dbrqx.com/anonymous/peloncita/fnode/node/linea_menu/human/a/node
	
			// Call to save_node_properties (or disk or drupal)
			// Aqui regenera las propiedades
	
				
			if (this.s.load == 'drupal')
			{
				//this.p('BBB_save_node_ Saving a File Structure Node ')		
				this.save_node()
				// Load from Drupal - Save properties
			}
			else
			{ 
				// aqui habria que llamar a la promesa en lugar del metodo del objeto

				var data_and_error = ''

				var t = this

				// this.p('CALLING_PROMISE_No_puedo_controlar_e_retorno' )
				// Lanza grabar en paralelo pero no hace nada
				// el tema es que necesitamos continuar 

				this.save_node_disk()
				
			}

		}  // IF_STA_01 [ EXIST PROPERTIES ]			


		
	} // END METHOD
	  
} // END CLASS

exports.anode_get_current_properties_disk = anode_get_current_properties_disk
