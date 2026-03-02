// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 22/06/16				Depth:[01]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Genera un fichero Sin saltos de linea addicionales ni lineas en blanco
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- process_line_feeds_slim
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- create_full_filename
//-- update_full_filename    
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=


// PENDING TO REVIEW

function process_line_feeds(full_file_name_feed)
{
vlineas = file(full_file_name_feed) 
//vlineas = file(full_file_name_feed,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) 

     
    // Podemos mostrar / trabajar con todas las líneas: 

full_file_name_new=full_file_name_feed . "_b"

create_full_filename(full_file_name_new)
    
foreach (vlineas as sLinea)
{ 
consalto= sLinea  
// Reemplazamos los saltos de elinea
LINE = eregi_replace("[\n|\r|\n\r]", '', sLinea) 

 //echo "Linea:" . LINE  . "FinLinea"  
if ( LINE != "" && LINE != " " )
        update_full_filename(full_file_name_new , LINE)    
}// End Foreach    

// Move file    
rename(full_file_name_new,full_file_name_feed)    
    
}

