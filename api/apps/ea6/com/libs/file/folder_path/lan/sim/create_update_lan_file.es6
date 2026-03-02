// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 22/06/16				Depth:[03]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Actualiza un fichero basandose en carpeta y ruta relativa
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- create_update_lan_file
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- create_update_full_filename
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// PENDING TO REVIEW
function create_update_lan_file(folder_path= '', file_name='fichero' , DATA='datos')
{
	lf="\r\n"

	sep="/"
    
	if (!is_dir(folder_path))
	    mkdir(folder_path,0775,true)
	
    full_file_name=folder_path  + sep + file_name

	//echo "Actualizando " + full_file_name + lf	
	
    create_update_full_filename(full_file_name, DATA)
}


