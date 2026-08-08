// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Node Js - Anode Img Class  [V.0.1.9]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_img > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_img-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_current_imgs- 					: Get current 2048 image
// - d-save_array_img_resolutions_in_ram- 	: Generate array resolution images
// - d-dont_exist_imgs- 					: Try to get current properties
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"												);

const 	{ anode_img_resolutions } 		= 	require(path.join(JS_BASE, 'com/objects/drupal/anode/an7/an75_img_resolutions.es6'))
		const echo = require(	'/brqx/base/react/zcommon/node_modules/node-echo'									);
		const fs = require(	'fs'																				);
		const { execSync } = require(	'child_process'																		);
		const creff = require(path.join(JS_BASE, 'com/libs/file/full_path/level_02/create_full_filename.es6'))
		const cff = require(path.join(JS_BASE, 'com/libs/file/full_path/level_02/copy_full_filename.es6'))

class anode_img extends anode_img_resolutions {

	constructor()
	{
		super()
		this.n			= 	'anode_img::'
	}							

	// ------------------------------ GET_CURRENT_IMGS ------------------------------ 
    get_current_imgs() 
    {   

		this.m	=	'get_current_imgs'												
		this.n			= 	'anode_img::'

		// Debe existir la imagen en ram de 2048

		//if (key_exists('rim', this.arr) )
		//	this.ram_alias_img_path	= this.arr['rim'][this.img_base_resolution]	

		// Si la imagen existe. Suponemos que todo esta bien
		// Si no existe como minimo dejamos la actual
		// O si no queremos regenerarlas
		
		// in01_path::Img path 2048
		// this.p('Img path 2048: '. this.ram_alias_img_path)  

		// Esto no tiene mucho sentido pues antes de generar la imagen nunca va a existir
		// O si		

		// if ( this.dont_exist_imgs() )
			// Se basa en image_name - Revisa en la ruta de las imagenes a ver si esta

		// this.p('GLOB METHOD ' + this.glob_method)

		if (	this.glob_method == 'noglob')
				this.create_resolution_img_no_glob() 					 
		else 
				this.create_resolution_img_glob() 					 

	}
	
	// ------------------------------ SAVE_ARRAY_IMG_RESOLUTIONS_IN_RAM ------------------------------ 
	save_array_img_resolutions_in_ram()
	{
		// Esta parte la debe hacer si la imagen no existe en ram. Por cada imagen por tanto igual necesito parametros

		this.m	=	'save_array_img_resolutions_in_ram'												
		this.n			= 	'anode_img::'
		
		// 17
		// this.p('NumFolders_Resolutions ' + this.arr['res'].length ) 			

		for (var pos in this.arr['res'] )
		{
			let resolution 		= this.arr['res'][pos]
			
			// 1. Creamos la carpeta donde guardar el fichero
	
			//folder_ssd = this.arr['sfo'][resolution] 				 // SSD Folders
			let folder_ram 		= this.arr['rko'][resolution]			 // RAM Folders

			let file_url_ssd   	= this.arr['sur'][resolution] 			

			let file_ssd   		= this.arr['sim'][resolution] 			

			let file_ram   		= this.arr['rim'][resolution] 			
			
			// this.p(' RAM ' + file_ram)		

			// in01_path::SSD photos/1024x0768/2011/Brasil/a01_Rio_de_Janeiro/110827_-_Rio_de_Janeiro_-_Pan_de_Azucar/brqx_azu11bra...
			//            RAM /ram/myr/1024x0768/2011/Brasil/a01_Rio_de_Janeiro/110827_-_Rio_de_Janeiro_-_Pan_de_Azucar/brqx_azu11bra...			
			// this.p('SSD ' + file_url_ssd + ' RAM ' + file_ram)		
	
			// Ojo que ya es una carpeta - no podemos usar create_folder_filename
			// create_folder(folder_ssd)		// Crea carpeta no tiene sentido pues se supone que en SSD tenemos las fotos

			// 2. Actulizamos en RAM (url_src , full_path_dst)

			// /ram/truck/0184x0245/transportes_lucas_rivera_gondolas_transport_truck_madrid_spain_2017_-_0139_1600x1200.jpg
			// this.p('FILE_RAM ' + file_ram)

			if ( fs.existsSync(file_ram) 					&&   
				 fs.lstatSync(file_ram).isFile() 			&&
			 	(creff.filesize(file_ram) != 0 )			&& 
				 ( !this.b.site_cache 							|| 
				   this.special_reload_ram('RAM_IMG') 	) )
			{
				// this.p('RELOAD_IMG34 ')										

				// Comprueba si ya existe

				// echo ('Folder ' + folder_ram)
				creff.create_folder(folder_ram)		// Crea ruta

				if ( fs.existsSync(folder_ram) 	&&   
					 fs.lstatSync(folder_ram).isDirectory() ) 

				{								
					// this.p('TYPE ' + this.img_type + ' QTY ' + this.quality) 

					// ESTA PARTE NO ES AUXILIAR. ES DECIR HAY QUE HACER LAS DOS
					// ESTA HEREDADO DE PELONA PERO AHORA CONVERTIMOS TODAS LAS FOTOS PREVIAMENTE
					if  ((this.img_type == 'JPG') && 
						 (this.quality != '85'	) )
					{
						let run = 'convert -strip  -interlace Plane -gaussian-blur 0.05 -quality 85% ' + file_ssd + ' ' +  file_ssd  + ' &&  chown apache:apache ' + file_ssd   
	
						// this.p('RUN_convert ' + run)
	
						let return_code = execSync(run)
	
						// print_r(run)
					}
					
					// this.p('RUN_copy ' + file_ram + ' SI ' + creff.filesize(file_ram) )
					
					if ( !fs.existsSync(file_ram) 					||
						(
			 			  fs.lstatSync(file_ram).isFile() 			&&
					     (creff.filesize(file_ram) ==  0  )			
					    )
					   )
					   {
							// echo( 'copy(' + file_ssd + ' ' + file_ram ) 		
							if (file_ssd === 'transportes_lucas_rivera_gondolas_transport_truck_madrid_spain_2017_-_0137_1600x1200.jpg' )				
								cff.copy_binary_full_filename(file_ssd,file_ram)
					   }
					
				} 

			} // End If
		} // End For

	}									

	save_img_general()
	{

		this.save_code_common()									

		// 6. Linking
			// Esta parte solo la va a hacer si se ha producido drupal bootstrap
		
		link_full_filename(	this.ram_img_path			, this.ram_alias_img_path			)
		link_full_filename(	this.ssd_img_path			, this.ssd_alias_img_path			)
	}									

	dont_exist_imgs()
	{
		// Esta pendiente pueds puede ser reload type ram or disk

		this.m	=	'dont_exist_imgs'												
		
		// Nos interesa actuar si no existe la imagen o si hacemos reload
        if ( ( this.ram_alias_img_path		!= '' 				) 	&& 
			 ( fs.existsSync(this.ram_alias_img_path)			)   &&
		     ( creff.filesize(file_ram)  != '0'  				)	&&
			 ( this.ramcache_generation	!= 'reload'				)   &&
			 ( this.url_method 			!= 'reload'				)   && 
			 ( this.is_not_reload_type()						)	)
		{
			return false																	
   		}
		return true    		  
	}   		  
	  
}

exports.anode_img = anode_img