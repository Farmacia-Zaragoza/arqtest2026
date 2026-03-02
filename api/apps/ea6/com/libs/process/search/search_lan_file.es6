<?php
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 23/06/16				Depth:[01]
// Version : 0.0.3                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Busca una cadena en el fichero con estructura para multi idioma 
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- search_lan_file
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

function search_lan_file($lines_file, $new_line="Test",&$trans_line="Prueba", $sep_int='@@')
{
// Debe buscar la cadena en el archivo - recibe ruta absoluta
// Hablamos de unos ficheros especiales con caracter divisor ARROBA ARROBA
$lf="\r\n";
$sw_search=false;

if (is_file($lines_file) && ( $new_line != "" ) )
{
// Solo tiene sentido buscar si existe el archivo y la linea a buscar no es vacia

$vlineas = file($lines_file); 

foreach ($vlineas as $sLinea)
{ 
// Reemplazamos los saltos de elinea
$LINE_UCASE = 	eregi_replace("[\n|\r|\n\r]", '', $sLinea); 
$LINE_DUAL	=	locale_str_tolower($LINE_UCASE);

// Son lineas con el formato esp@@idioma

$string_sep="/[" . $sep_int . "]+/";

$split_arr = preg_split($string_sep, $LINE_DUAL); 
$arr_len=count($split_arr)-1;

$LINE_ES=$split_arr[0];
$LINE_LAN="";

if ($arr_len > 0 )
	$LINE_LAN=$split_arr[1];


if ( $LINE_ES === $new_line )
{
//echo "Linea Buscada" . $LINE_ES . "##" . $LINE_LAN . $lf;
	
$sw_search=true;
$trans_line=$LINE_LAN;	
}

} // Enf Foreach

} // End If    

return $sw_search;    
}
