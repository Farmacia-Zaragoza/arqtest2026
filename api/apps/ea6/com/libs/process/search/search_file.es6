<?php
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 23/06/16				Depth:[0N]
// Version : 0.0.3                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Busca una cadena en el fichero 
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- process_file
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

function search_file($lines_file, $new_line="Test")
{
// Debe buscar la cadena en el archivo - recibe ruta absoluta
$lf="\r\n";
$sw_search=false;

if (is_file($lines_file) && ( $new_line != "" ) )
{
// Solo tiene sentido buscar si existe el archivo y la linea a buscar no es vacia

$vlineas = file($lines_file); 

foreach ($vlineas as $sLinea)
{ 
// Reemplazamos los saltos de elinea
$LINE_UCASE = eregi_replace("[\n|\r|\n\r]", '', $sLinea); 
$LINE_ES=locale_str_tolower($LINE_UCASE);

// Son lineas con el formato esp@@idioma

if ( $LINE_ES === $new_line )
{
//echo "Linea Buscada" . $LINE_ES . "##" . $LINE_LAN . $lf;
$sw_search=true;
}

} // Enf Foreach

} // End If    

return $sw_search;    
}
