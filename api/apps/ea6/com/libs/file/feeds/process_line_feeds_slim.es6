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
function process_line_feeds_slim(file_new, vlineas_int)
{
    
// Podemos mostrar / trabajar con todas las líneas: 

create_full_filename(file_new)
    
c=0

//echo "Size array : " . count(vlineas_int) . "\n"
    
foreach (vlineas_int as line_ext_b)
{
// Cambia los espacios     
line_ext_d = preg_replace('/\s+/', ' ', line_ext_b)
line_ext = str_replace(array("\n", "\r"), ' ', line_ext_d)

//hex_line=strToHex_show(line_ext)
//chr_line=hexToStr_show(hex_line)
//echo "HEX_LINE: " . hex_line ."\n"
//echo "CHR_LINE: " . chr_line ."\n"

// Formato obtenido : RHINOSPRAY 1#18 MG/ML NEBULIZADOR NASAL 12 ML
//Primera comprobacion de saltos en blanco
if ( strToHex(line_ext) != '20' )
{
    //echo "Linea ". c . ":" . line_ext . "\n"

    //echo "Actualizando con :". line_ext . "-final_linea" . "\n"
    //line_fixed = rtrim(line_ext, "\r\n") //. PHP_EOL
    line_b=str_replace(".", "#", line_ext)
        
//    file_put_contents(file_new,line_b)
    update_full_filename(file_new , line_b)    
    // No soy capaz de cambiar el punto separador de decimales cuando lo escribo en un archivo
    // Siempre genera una nueva linea
    //command='sed -i "s/#/./g" '  . file_new  
//    echo "Comando:" . command 
    //shell_exec(command)
}


c++    


} // End Foreach    
}


