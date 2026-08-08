//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
//Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
//---------------------------------------------------------------------------
//Brqx 2016 - 22/06/16				Depth:[03]
//Version : 0.0.1                  Type :[FUNCTION]
//---------------------------------------------------------------------------
//- Notas
//---------------------------------------------------------------------------
//+ Devuelve cadenas capitalizadas en base a utf8
//---------------------------------------------------------------------------
//- Funciones
//---------------------------------------------------------------------------
//-- utf32_encode
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//-- strtolower_utf8
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//codifica Unicode langs
//encode function for unicode // for php 5.3

function utf32_encode(str = "", lang_type = "01") 
//Encode latin langs to html entities acute && so on
//[PHP_56]
{
	var str_out = ""
	if (lang_type == "01") str_out = htmlentities(str)else str_out = encode(str)
	return str_out
}

function utf32_decode(str = "", lang_type = "01") 
//$LINE_LAN = iconv(mb_detect_encoding($text, mb_detect_order(), true), "UTF-8", $text)
//Encode latin langs to html entities acute && so on
{
	var str_out = ""
	str_out = html_entity_decode(str)
	return str_out
}

