// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 04/12/16				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Obtiene una imagen/fichero aleatoriamente de una carpeta recursivamente
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- copy_full_filename
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

var recursive 			= 	require('/brqx/base/react/zcommon/node_modules/recursive-readdir-sync'					),
	echo 				= 	require('/brqx/base/react/zcommon/node_modules/node-echo'								),
	random 				= 	require('/brqx/base/react/zcommon/node_modules/random-js'								),	
	fs 					= 	require(	'fs'																		);

// Ok [17-10-21] - Based on recursive-readdir-sync
function get_random_image(folder_source , img_full_path)
{
	// Itera recursivamente
	br		= "\n\r" 				
    // Now we copy file - OJO ES PARA FICHEROS ASCII

	if ( fs.existsSync(folder_source) && fs.lstatSync(folder_source).isDirectory() )
	{
		// Itera solos los ficheros
		// Hay que comprobar la velocidad
		let files = recursive(folder_source) 
		for (var elemento of Object.values(files)) 
		{
			console.log('E: ' + elemento )
			// elemento es la ristra de ficheros separados con coma
			
			/*			
			if (fs.existsSync(elemento) && !fs.lstatSync(elemento).isDirectory()  )
			{
				echo ('File ' + elemento + br  )	
				// langfolder::Elem /brqx/base/lang/temp/en/a/ad/adq.word
				let rand = random.integer(0,10) 
				// if (rand(0,10) < 3 ) 
				// break
			}
			*/
			img_full_path	= elemento
		}	 
	} 
}


exports.get_random_image = get_random_image
