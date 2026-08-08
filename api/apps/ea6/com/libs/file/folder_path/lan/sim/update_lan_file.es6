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
//-- update_lan_file
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- update_full_filename
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// PENDING TO REVIEW
function update_lan_file(folder_path = '', file_name='fichero' , DATA='datos')
{
	lf="\r\n"
	
	// Now we create file ruta / PROSPECTOS / es / 6334344 / fich
	sep="/"
	
    full_file_name=folder_path  + sep + file_name

	//echo "Actualizando " + full_file_name + lf	
	
    update_full_filename(full_file_name , DATA)
}


