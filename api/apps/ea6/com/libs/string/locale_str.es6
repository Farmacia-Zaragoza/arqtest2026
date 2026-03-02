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
//-- locale_str_tolower - locale_str_ucase
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//-- strtolower_utf8
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Devuelve cadenas capitalizadas en base a utf8

function locale_str_tolower(str_in) {
  var str_out = strtolower_utf8(str_in);
  return str_out;
};

function locale_str_ucase(str_in) {
  var str_out = ucwords(strtolower_utf8(str_in));
  return str_out;
};

function strtolower_utf8_clean_for_file(string) {
  var str_aux = strtolower_utf8(string);
  return utf8_clean_for_file(str_aux);
};

function strtolower_utf8_clean_for_line(string) {
  var str_aux = strtolower_utf8(string);
  return utf8_clean_for_line(str_aux);
};

function strspecial_to_dash(string) {
  //1    2    3    4   5   6     7    8    9    10   11   12   13   14  15  	16
  //1    2    3    4    5     6    7    8    9    10   11   12   13   14  15  	16
  {
    var convert_to = ["?", "\xBF", "!", "\xA1", "-", "\\", "/", "[", "]", "(", ")", "*", "+", "{", "}", " "];
    var convert_from = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];
    return string.replace(convert_from, convert_to);
  }
};
